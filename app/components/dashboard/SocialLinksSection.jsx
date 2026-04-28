import React from "react";
import { Card, BlockStack, InlineStack, Icon, Text, Divider, Box, Button, Popover, ActionList, EmptyState, TextField } from "@shopify/polaris";
import { PlusIcon, DeleteIcon, GlobeIcon } from "@shopify/polaris-icons";
import { 
  InstagramIcon, 
  FacebookIcon, 
  TwitterIcon, 
  YoutubeIcon, 
  TikTokIcon, 
  LinkedInIcon, 
  PinterestIcon, 
  WhatsappIcon 
} from "../SocialIcons";
import { getPlatformIcon, getPlatformColor } from "../socialMediaUtils.jsx";
import styles from "../../styles/Dashboard.module.css";

const SocialLinksSection = ({ 
  formState, 
  setFormState, 
  socialPopoverActive, 
  setSocialPopoverActive
}) => {

  const addSocialPlatform = (platform) => {
    if (!formState.socialLinks[platform]) {
      setFormState({
        ...formState,
        socialLinks: { ...formState.socialLinks, [platform]: "" }
      });
    }
    setSocialPopoverActive(false);
  };

  const updateSocialLink = (platform, url) => {
    setFormState({
      ...formState,
      socialLinks: { ...formState.socialLinks, [platform]: url }
    });
  };

  const removeSocialLink = (platform) => {
    const newLinks = { ...formState.socialLinks };
    delete newLinks[platform];
    setFormState({ ...formState, socialLinks: newLinks });
  };

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
          <InlineStack gap="200" align="start" blockAlign="center">
            <div className={`${styles.sectionIconContainer} ${styles.socialIcon}`}>
              <Icon source={GlobeIcon} tone="info" />
            </div>
            <BlockStack gap="0">
              <Text as="h2" variant="headingSm">Social Media Links</Text>
              <Text variant="bodySm" tone="subdued">Add your social handles to display icons on the page</Text>
            </BlockStack>
          </InlineStack>
          <Popover
            active={socialPopoverActive}
            activator={
              <Button
                icon={PlusIcon}
                onClick={() => setSocialPopoverActive(!socialPopoverActive)}
                variant="primary"
              >
                Add Social Link
              </Button>
            }
            onClose={() => setSocialPopoverActive(false)}
          >
            <ActionList
              items={[
                { content: 'Instagram', icon: InstagramIcon, onAction: () => addSocialPlatform('instagram') },
                { content: 'Facebook', icon: FacebookIcon, onAction: () => addSocialPlatform('facebook') },
                { content: 'X (Twitter)', icon: TwitterIcon, onAction: () => addSocialPlatform('twitter') },
                { content: 'YouTube', icon: YoutubeIcon, onAction: () => addSocialPlatform('youtube') },
                { content: 'TikTok', icon: TikTokIcon, onAction: () => addSocialPlatform('tiktok') },
                { content: 'LinkedIn', icon: LinkedInIcon, onAction: () => addSocialPlatform('linkedin') },
                { content: 'Pinterest', icon: PinterestIcon, onAction: () => addSocialPlatform('pinterest') },
                { content: 'WhatsApp', icon: WhatsappIcon, onAction: () => addSocialPlatform('whatsapp') },
              ]}
            />
          </Popover>
        </InlineStack>
        <Divider />

        {Object.keys(formState.socialLinks).length === 0 ? (
          <Box padding="600">
            <EmptyState
              heading="No links added yet"
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>Select a platform above to add your first social media link.</p>
            </EmptyState>
          </Box>
        ) : (
          <BlockStack gap="400">
            {Object.entries(formState.socialLinks).map(([platform, url]) => (
              <Card key={platform} padding="300" background="bg-surface-secondary">
                <InlineStack gap="300" align="space-between" blockAlign="center">
                  <InlineStack gap="300" blockAlign="center">
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: getPlatformColor(platform),
                      color: "white"
                    }}>
                      {getPlatformIcon(platform)}
                    </div>
                    <Box minWidth="200px">
                      <TextField
                        label={platform.charAt(0) ? platform.charAt(0).toUpperCase() + platform.slice(1) : platform}
                        labelHidden
                        value={url}
                        onChange={(v) => updateSocialLink(platform, v)}
                        autoComplete="off"
                        placeholder={`https://${platform}.com/yourstore`}
                      />
                    </Box>
                  </InlineStack>
                  <Button
                    icon={DeleteIcon}
                    tone="critical"
                    variant="tertiary"
                    onClick={() => removeSocialLink(platform)}
                  />
                </InlineStack>
              </Card>
            ))}
          </BlockStack>
        )}
      </BlockStack>
    </Card>
  );
};

export default SocialLinksSection;
