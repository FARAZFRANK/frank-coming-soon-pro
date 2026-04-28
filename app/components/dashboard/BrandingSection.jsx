import React from "react";
import { Card, BlockStack, InlineStack, Icon, Text, Divider, TextField } from "@shopify/polaris";
import { ImageIcon } from "@shopify/polaris-icons";
import MediaPicker from "../MediaPicker";
import VideoPicker from "../VideoPicker";
import styles from "../../styles/Dashboard.module.css";

const BrandingSection = ({ formState, setFormState, allImages, allVideos }) => {
  // Exclude certain templates from media settings if they don't support it
  const isMediaExcluded = ["template_4", "template_7", "template_8", "template_9", "template_10", "template_19", "template_22"].includes(formState.templateId);
  const isBgImageExcluded = ["template_13", "template_14", "template_15", "template_16", "template_17", "template_18"].includes(formState.templateId);

  if (isMediaExcluded) return null;

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack gap="200" align="start" blockAlign="center">
          <div className={`${styles.sectionIconContainer} ${styles.brandingIcon}`}>
            <Icon source={ImageIcon} tone="info" />
          </div>
          <BlockStack gap="0">
            <Text as="h2" variant="headingSm">Media & Branding</Text>
            <Text variant="bodySm" tone="subdued">Upload your logo and background image</Text>
          </BlockStack>
        </InlineStack>
        <Divider />
        
        <MediaPicker
          label="Logo"
          value={formState.logoUrl || ""}
          onChange={(v) => setFormState({ ...formState, logoUrl: v })}
          files={allImages}
        />

        {!isBgImageExcluded && (
          <MediaPicker
            label="Background Image"
            value={formState.bgImageUrl || ""}
            onChange={(v) => setFormState({ ...formState, bgImageUrl: v })}
            files={allImages}
          />
        )}

        {formState.templateId === "template_3" && (
          <TextField
              label="YouTube / Vimeo Video URL (Watch Button)"
              value={formState.watchVideoUrl || ""}
              onChange={(v) => setFormState({ ...formState, watchVideoUrl: v })}
              autoComplete="off"
              helpText="Enter a YouTube or Vimeo URL to play in a popup when the visitor clicks the watch button"
          />
        )}

        {isBgImageExcluded ? (
          <VideoPicker
            label="Background Video URL (Direct Video File / .mp4)"
            value={formState.videoUrl || ""}
            onChange={(v) => setFormState({ ...formState, videoUrl: v })}
            files={allVideos}
          />
        ) : null}
      </BlockStack>
    </Card>
  );
};

export default BrandingSection;
