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
import { UploadIcon, PlayCircleIcon, RefreshIcon, DeleteIcon } from '@shopify/polaris-icons';

export default function VideoPicker({
  label,
  value,
  onChange,
  files = [],
}) {
  const [active, setActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [localPreview, setLocalPreview] = useState(null);
  const [pendingFileId, setPendingFileId] = useState(null);
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

    setLocalPreview(URL.createObjectURL(file));

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
              { intent: "FINALIZE_UPLOAD", resourceUrl, contentType: "VIDEO" },
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
        if (finalizeFetcher.data.error === "processing" && finalizeFetcher.data.fileId) {
          setPendingFileId(finalizeFetcher.data.fileId);
          setUploadProgress(99);
        } else {
          console.error("Finalization error:", finalizeFetcher.data.error);
          alert("Finalization Error: " + (finalizeFetcher.data.error || "Unknown Error saving to Shopify"));
          setIsUploading(false);
          setUploadProgress(0);
          setLocalPreview(null);
        }
        return;
      }

      setUploadProgress(100);
      onChange(finalizeFetcher.data.uploadedUrl);
      setIsUploading(false);
      setUploadProgress(0);
      setLocalPreview(null);
      setPendingFileId(null);
    }
  }, [finalizeFetcher.data, finalizeFetcher.state, onChange]);

  // Polling for the pending file ID asynchronously without modal open
  useEffect(() => {
    if (pendingFileId) {
      const file = files.find(f => f.id === pendingFileId);
      if (file && (file.fileStatus === "READY" || (file.url && file.url.length > 0))) {
        setUploadProgress(100);
        onChange(file.url);
        setIsUploading(false);
        setUploadProgress(0);
        setPendingFileId(null);
        setLocalPreview(null);
      } else {
        const intervalId = setInterval(() => {
          if (revalidator.state === "idle") {
            revalidator.revalidate();
          }
        }, 3000);
        return () => clearInterval(intervalId);
      }
    }
  }, [pendingFileId, files, revalidator, onChange]);

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
              icon={PlayCircleIcon}
              onClick={toggleModal}
              accessibilityLabel="Open video library"
            />
          </InlineStack>
        }
      />

      {value && !isUploading && (
        <Box paddingBlockStart="200">
          <div style={{ width: '100px', height: '100px', borderRadius: '4px', overflow: 'hidden', background: '#f4f6f8', border: '1px solid #dfe3e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {value.endsWith('.mp4') || value.endsWith('.webm') || value.endsWith('.mov') ? (
              <video src={value} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
            ) : (
              <PolarisThumbnail source={value} alt="Preview" size="large" />
            )}
          </div>
        </Box>
      )}

      {isUploading && (
        <Box paddingBlockStart="200">
          {localPreview && (
            <div style={{ paddingBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: 100, height: 60, overflow: 'hidden', borderRadius: 4, background: '#f4f6f8', border: '1px solid #dfe3e8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <video src={localPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
              </div>
              <div style={{ flex: 1 }}>
                <ProgressBar progress={uploadProgress} size="small" color="primary" />
                <Box paddingBlockStart="100">
                  <Text variant="bodySm" tone="subdued">
                    {uploadProgress < 80 ? "Uploading to Shopify..." : (uploadProgress === 100 ? "Complete!" : "Video Process Wait... (~50s)")}
                  </Text>
                </Box>
              </div>
            </div>
          )}
          {!localPreview && (
            <>
              <ProgressBar progress={uploadProgress} size="small" color="primary" />
              <Box paddingBlockStart="100">
                <Text variant="bodySm" tone="subdued">
                  {uploadProgress < 80 ? "Uploading to Shopify..." : "Finalizing video..."}
                </Text>
              </Box>
            </>
          )}
        </Box>
      )}

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="video/mp4,video/webm"
        onChange={handleFileChange}
      />

      <Modal
        open={active}
        onClose={toggleModal}
        title="Select from Video Library"
        primaryAction={{
          content: 'Close',
          onAction: toggleModal,
        }}
      >
        <Modal.Section>
          {files.length === 0 ? (
            <Box padding="400" textAlign="center">
              <Text tone="subdued">No videos found in your Shopify Video Library.</Text>
            </Box>
          ) : (
            <ResourceList
              resourceName={{ singular: 'video', plural: 'videos' }}
              items={files}
              renderItem={(item) => {
                const { id, url, altText, preview, fileStatus, fileErrors } = item;
                const isFailed = fileStatus === "FAILED";
                const isReady = fileStatus === "READY" || (url && url.length > 0);
                const isProcessing = (!isReady && !isFailed) || (!url && !preview);

                const media = (isProcessing || isFailed) ? (
                  <div style={{ padding: '8px', background: isFailed ? '#fee2e2' : '#f4f6f8', borderRadius: '4px', border: `1px solid ${isFailed ? '#ef4444' : '#dfe3e8'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px' }}>
                    <Icon source={PlayCircleIcon} tone={isFailed ? "critical" : "subdued"} />
                  </div>
                ) : (
                  <Thumbnail source={preview || url} alt={altText || 'Video'} size="small" />
                );

                const fileNameFromUrl = url ? decodeURIComponent(url.split('/').pop().split('?')[0]) : null;
                const cleanAlt = altText === "Unknown" ? null : altText;
                const displayName = cleanAlt || fileNameFromUrl || "Shopify Video";

                const isDeleting = deleteFetcher.state !== "idle" && deleteFetcher.formData?.get("fileId") === id;

                return (
                  <ResourceItem
                    id={id}
                    media={media}
                    onClick={() => { if (isReady && !isDeleting && !isFailed) handleSelect(url); }}
                    accessibilityLabel={`Select video ${displayName}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <div style={{ flex: 1, paddingRight: '15px', overflow: 'hidden' }}>
                        <Text variant="bodyMd" fontWeight="bold" as="h3" tone={isFailed ? "critical" : (isProcessing ? "subdued" : "base")} truncate>
                          {isFailed ? "❌ Upload Failed" : (isProcessing ? "🔄 Video Processing..." : displayName)}
                        </Text>
                        {(isProcessing || isFailed) && (
                          <Text variant="bodySm" tone={isFailed ? "critical" : "subdued"}>
                            {isFailed ? (fileErrors?.[0]?.message || "Shopify failed to process this video format.") : "Please close & refresh this window in 5-10 seconds."}
                          </Text>
                        )}
                      </div>
                      <InlineStack gap="200" wrap={false} align="center">
                        <Button
                          icon={DeleteIcon}
                          tone="critical"
                          variant="tertiary"
                          loading={isDeleting}
                          disabled={isDeleting}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm("Permanently delete this file from Shopify?")) {
                              deleteFetcher.submit({ intent: "DELETE_FILE", fileId: id }, { method: "POST" });
                            }
                          }}
                          accessibilityLabel="Delete video"
                        />
                        {!isFailed && (
                          <Button
                            disabled={!isReady || isDeleting}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isReady) handleSelect(url);
                            }}
                          >
                            {!isReady ? "Wait" : "Select"}
                          </Button>
                        )}
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
