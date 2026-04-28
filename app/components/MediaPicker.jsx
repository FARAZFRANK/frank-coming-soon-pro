import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useFetcher, useRevalidator } from '@remix-run/react';
import { 
  Button, 
  Modal, 
  ResourceList, 
  ResourceItem, 
  Thumbnail, 
  Text, 
  Box, 
  InlineStack, 
  TextField,
  ProgressBar,
  Icon,
  Thumbnail as PolarisThumbnail
} from '@shopify/polaris';
import { UploadIcon, ImageIcon, RefreshIcon, DeleteIcon } from '@shopify/polaris-icons';

export default function MediaPicker({ 
  label, 
  value, 
  onChange, 
  files = [], 
}) {
  const [active, setActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  
  const uploadFetcher = useFetcher();
  const finalizeFetcher = useFetcher();
  const revalidator = useRevalidator();
  const deleteFetcher = useFetcher();
  const handledFinalizeRef = useRef(null);
  const handledUploadRef = useRef(null);

  const toggleModal = useCallback(() => {
    setActive((prev) => {
      const willOpen = !prev;
      if (willOpen && revalidator.state === "idle") {
        revalidator.revalidate();
      }
      return willOpen;
    });
  }, [revalidator]);

  // Auto-polling if any file is still processing while the modal is open
  useEffect(() => {
    const hasProcessingFiles = files.some(f => !f.url && !f.preview);
    if (active && hasProcessingFiles) {
      const intervalId = setInterval(() => {
        if (revalidator.state === "idle") {
          revalidator.revalidate();
        }
      }, 3000); // Check every 3 seconds
      return () => clearInterval(intervalId);
    }
  }, [files, active, revalidator]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file); // Save file to state safely
    event.target.value = null; // Reset DOM input value

    setIsUploading(true);
    setUploadProgress(10);

    // Step 1: Get Staged Target
    uploadFetcher.submit(
      {
        intent: "UPLOAD_IMAGE",
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      },
      { method: "POST" }
    );
  };

  // Step 2 & 3: Handle Upload and Finalize
  useEffect(() => {
    if (uploadFetcher.state === "idle" && uploadFetcher.data) {
      if (handledUploadRef.current === uploadFetcher.data) return;
      handledUploadRef.current = uploadFetcher.data;

      if (uploadFetcher.data.error || !uploadFetcher.data.uploadTarget) {
        console.error("Backend error staging upload:", uploadFetcher.data.error);
        alert("Upload Error: " + (uploadFetcher.data.error || "Unknown error connecting to Shopify."));
        setIsUploading(false);
        setUploadProgress(0);
        setSelectedFile(null);
        return;
      }

      const { url, resourceUrl, parameters } = uploadFetcher.data.uploadTarget;
      
      const file = selectedFile;
      if (!file) return;
      
      const performUpload = async () => {
        setUploadProgress(40);
        const formData = new FormData();
        // IMPORTANT: Shopify requires all parameters to be BEFORE the file
        parameters.forEach(({ name, value }) => formData.append(name, value));
        formData.append("file", file);

        try {
          const response = await fetch(url, {
            method: "POST",
            body: formData
          });

          if (response.ok) {
            setUploadProgress(80);
            // Step 3: Finalize
            finalizeFetcher.submit(
              { intent: "FINALIZE_UPLOAD", resourceUrl },
              { method: "POST" }
            );
          } else {
            const errorText = await response.text();
            console.error("Upload to staging failed:", errorText);
            alert("Upload failed. Shopify storage rejected the file.");
            setIsUploading(false);
            setUploadProgress(0);
          }
        } catch (e) {
          console.error("Upload error", e);
          alert("Network error while uploading file.");
          setIsUploading(false);
          setUploadProgress(0);
        }
      };

      performUpload();
    }
  }, [uploadFetcher.data, uploadFetcher.state, finalizeFetcher, selectedFile]);

  // Handle Finalization success
  useEffect(() => {
    if (finalizeFetcher.state === "idle" && finalizeFetcher.data) {
      if (handledFinalizeRef.current === finalizeFetcher.data) return;
      handledFinalizeRef.current = finalizeFetcher.data;

      if (finalizeFetcher.data.error || !finalizeFetcher.data.uploadedUrl) {
        // If Shopify is asynchronously processing the generic file, open the media gallery instead of failing.
        if (finalizeFetcher.data.error && finalizeFetcher.data.error.includes("processing")) {
           setActive(true);
        } else {
           console.error("Finalization error:", finalizeFetcher.data.error);
           alert("Finalization Error: " + (finalizeFetcher.data.error || "Unknown Error saving to Shopify"));
        }
        setIsUploading(false);
        setUploadProgress(0);
        return;
      }
      
      setUploadProgress(100);
      onChange(finalizeFetcher.data.uploadedUrl);
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [finalizeFetcher.data, finalizeFetcher.state, onChange]);

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSelect = (url) => {
    onChange(url);
    toggleModal();
  };

  return (
    <Box paddingBlockEnd="400">
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        autoComplete="off"
        placeholder="https://..."
        suffix={
          <InlineStack gap="200">
            <Button 
                icon={UploadIcon} 
                onClick={triggerUpload} 
                loading={isUploading}
                accessibilityLabel="Upload image"
            />
            <Button 
                icon={ImageIcon} 
                onClick={toggleModal}
                accessibilityLabel="Open media library"
            />
          </InlineStack>
        }
      />
      
      {value && !isUploading && (
        <Box paddingBlockStart="200">
           <PolarisThumbnail
                source={value}
                alt="Preview"
                size="large"
            />
        </Box>
      )}

      {isUploading && (
        <Box paddingBlockStart="200">
          <ProgressBar progress={uploadProgress} size="small" color="primary" />
          <Text variant="bodySm" tone="subdued">
            {uploadProgress < 80 ? "Uploading to Shopify..." : "Finalizing image..."}
          </Text>
        </Box>
      )}

      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept="image/*"
        onChange={handleFileChange}
      />

      <Modal
        open={active}
        onClose={toggleModal}
        title="Select from Media Library"
        primaryAction={{
          content: 'Close',
          onAction: toggleModal,
        }}
      >
        <Modal.Section>
          {files.length === 0 ? (
            <Box padding="400" textAlign="center">
                <Text tone="subdued">No images found in your Shopify Media Library.</Text>
            </Box>
          ) : (
            <ResourceList
              resourceName={{ singular: 'image', plural: 'images' }}
              items={files}
              renderItem={(item) => {
                const { id, url, altText, preview } = item;
                const isProcessing = !url && !preview;

                const media = isProcessing ? (
                  <div style={{ padding: '8px', background: '#f4f6f8', borderRadius: '4px', border: '1px solid #dfe3e8', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px' }}>
                    <Icon source={ImageIcon} tone="subdued" />
                  </div>
                ) : (
                  <Thumbnail source={preview || url} alt={altText || 'Media'} size="small" />
                );

                const fileNameFromUrl = url ? decodeURIComponent(url.split('/').pop().split('?')[0]) : null;
                const cleanAlt = altText === "Unknown" ? null : altText;
                const displayName = cleanAlt || fileNameFromUrl || "Shopify Media";
                
                const isDeleting = deleteFetcher.state !== "idle" && deleteFetcher.formData?.get("fileId") === id;

                return (
                  <ResourceItem
                    id={id}
                    media={media}
                    onClick={() => { if (!isProcessing && !isDeleting) handleSelect(url); }}
                    accessibilityLabel={`Select image ${displayName}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ flex: 1, paddingRight: '15px', overflow: 'hidden' }}>
                            <Text variant="bodyMd" fontWeight="bold" as="h3" tone={isProcessing ? "subdued" : "base"} truncate>
                                {isProcessing ? "🔄 Image Processing..." : displayName}
                            </Text>
                            {isProcessing && (
                              <Text variant="bodySm" tone="subdued">Please close & refresh this window in 5-10 seconds.</Text>
                            )}
                        </div>
                        <InlineStack gap="200" wrap={false} align="center">
                          <Button 
                            icon={DeleteIcon}
                            tone="critical"
                            variant="tertiary"
                            loading={isDeleting}
                            disabled={isProcessing || isDeleting}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm("Permanently delete this file from Shopify?")) {
                                deleteFetcher.submit({ intent: "DELETE_FILE", fileId: id }, { method: "POST" });
                              }
                            }}
                            accessibilityLabel="Delete image"
                          />
                          <Button 
                            disabled={isProcessing || isDeleting} 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              if (!isProcessing) handleSelect(url); 
                            }}
                          >
                            {isProcessing ? "Wait" : "Select"}
                          </Button>
                        </InlineStack>
                    </div>
                  </ResourceItem>
                );
              }}
            />
          )}
        </Modal.Section>
      </Modal>
    </Box>
  );
}
