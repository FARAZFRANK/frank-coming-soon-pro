import React from "react";
import { Card, BlockStack, InlineStack, Icon, Text, Divider, TextField, Box, Checkbox, Badge, Button, Select } from "@shopify/polaris";
import { TextIcon, LayoutBlockIcon, CalendarIcon, LockIcon, ClipboardIcon, EditIcon } from "@shopify/polaris-icons";
import styles from "../../styles/Dashboard.module.css";

const ContentSection = ({ formState, setFormState, isPro, onUpgrade, shop }) => {
  return (
    <BlockStack gap="400">
      {/* --- Content Section --- */}
      <Card>
        <BlockStack gap="400">
          <InlineStack gap="200" align="start" blockAlign="center">
            <div className={`${styles.sectionIconContainer} ${styles.contentIcon}`}>
              <Icon source={TextIcon} tone="success" />
            </div>
            <BlockStack gap="0">
              <Text as="h2" variant="headingSm">Page Content</Text>
              <Text variant="bodySm" tone="subdued">Customize your heading and description text</Text>
            </BlockStack>
          </InlineStack>
          <Divider />
          <TextField
            label="Heading"
            value={formState.title}
            onChange={(v) => setFormState({ ...formState, title: v })}
            autoComplete="off"
            helpText="The main title shown on your page"
          />
          {!["template_2", "template_3", "template_13", "template_14", "template_15", "template_16", "template_17", "template_18", "template_19"].includes(formState.templateId) && (
            <TextField
              label="Description"
              value={formState.description}
              onChange={(v) => setFormState({ ...formState, description: v })}
              multiline={3}
              autoComplete="off"
              helpText="A brief message for your visitors"
            />
          )}
        </BlockStack>
      </Card>

      {/* --- Display Options Section --- */}
      <Card>
        <BlockStack gap="400">
          <InlineStack gap="200" align="start" blockAlign="center">
            <div className={`${styles.sectionIconContainer} ${styles.displayIcon}`}>
              <Icon source={LayoutBlockIcon} tone="warning" />
            </div>
            <BlockStack gap="0">
              <InlineStack gap="200" blockAlign="center">
                <Text as="h2" variant="headingSm">Display Options</Text>
                {!isPro && <Badge tone="magic">Pro</Badge>}
              </InlineStack>
              <Text variant="bodySm" tone="subdued">Control how your page appears</Text>
            </BlockStack>
          </InlineStack>
          <Divider />
          <Box padding="100">
            <InlineStack gap="400" align="start" blockAlign="center" wrap={false}>
              <Checkbox
                label="Show Theme Header & Navigation"
                checked={formState.showHeader}
                onChange={(v) => {
                  if (!isPro) {
                    onUpgrade();
                  } else {
                    setFormState({ ...formState, showHeader: v });
                  }
                }}
                helpText="When enabled, your store's header and menu will appear above the maintenance overlay"
              />
              {formState.showHeader && <Badge tone="success">Active</Badge>}
            </InlineStack>
          </Box>
        </BlockStack>
      </Card>

      {/* --- Countdown Section --- */}
      {formState.mode !== "LIVE" && (
        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" align="start" blockAlign="center">
              <div className={`${styles.sectionIconContainer} ${styles.countdownIcon}`}>
                <Icon source={CalendarIcon} tone="critical" />
              </div>
              <BlockStack gap="0">
                <InlineStack gap="200" blockAlign="center">
                  <Text as="h2" variant="headingSm">Countdown Timer</Text>
                </InlineStack>
                <Text variant="bodySm" tone="subdued">Set your launch date and countdown text</Text>
              </BlockStack>
            </InlineStack>
            <Divider />
            <TextField
              label="Launch Date"
              type="datetime-local"
              value={formState.countdownDate || ""}
              onChange={(v) => setFormState({ ...formState, countdownDate: v })}
              helpText="When your store will go live"
            />
            <TextField
              label="Countdown Label"
              value={formState.countdownTitle || ""}
              onChange={(v) => setFormState({ ...formState, countdownTitle: v })}
              autoComplete="off"
              placeholder="e.g. Launching In..."
              helpText="Text shown above the countdown timer"
            />
          </BlockStack>
        </Card>
      )}

      {/* --- Secret Access Section --- */}
      {formState.mode !== "LIVE" && (
        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" align="start" blockAlign="center">
              <div className={styles.sectionIconContainer} style={{ background: "var(--p-color-bg-fill-success-secondary)" }}>
                <Icon source={LockIcon} tone="success" />
              </div>
              <BlockStack gap="0">
                <InlineStack gap="200" blockAlign="center">
                  <Text as="h2" variant="headingSm">Secret Bypass Link</Text>
                  {!isPro && <Badge tone="magic">Pro</Badge>}
                </InlineStack>
                <Text variant="bodySm" tone="subdued">Allow specific people to view your live store</Text>
              </BlockStack>
            </InlineStack>
            <Divider />
            <BlockStack gap="300">
              <TextField
                label="Bypass Password"
                value={formState.bypassPassword || ""}
                onChange={(v) => {
                  if (!isPro) {
                    onUpgrade();
                  } else {
                    setFormState({ ...formState, bypassPassword: v });
                  }
                }}
                autoComplete="off"
                placeholder="e.g. vip2026"
                helpText="Choose a secret password that allows bypassing the page."
                disabled={!isPro}
              />
              {formState.bypassPassword && isPro && (
                <InlineStack gap="200" align="start" blockAlign="center">
                  <Text variant="bodySm" fontWeight="medium">Shareable Link:</Text>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--p-color-bg-surface-secondary)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid var(--p-color-border)'
                  }}>
                    <Text variant="bodySm" tone="subdued">
                      {`/?bypass=${formState.bypassPassword}`}
                    </Text>
                  </div>
                  <Button
                    size="micro"
                    icon={ClipboardIcon}
                    onClick={() => {
                      // Construct full URL using shop domain
                      const fullUrl = `https://${shop}/?bypass=${formState.bypassPassword}`;
                      navigator.clipboard.writeText(fullUrl);
                      // Fallback if full url is not exactly shop
                      alert("Link copied to clipboard! Share it to grant access.");
                    }}
                  >
                    Copy
                  </Button>
                </InlineStack>
              )}
            </BlockStack>
          </BlockStack>
        </Card>
      )}

      {/* --- Advanced Design Section --- */}
      <Card>
        <BlockStack gap="400">
          <InlineStack gap="200" align="start" blockAlign="center">
            <div className={`${styles.sectionIconContainer}`} style={{ background: '#f4f6f8', color: '#2c6ecb' }}>
              <Icon source={EditIcon} tone="info" />
            </div>
            <BlockStack gap="0">
              <InlineStack gap="200" align="start" blockAlign="center">
                <Text as="h2" variant="headingSm">Advanced Design</Text>
                {!isPro && <Badge tone="magic">Pro</Badge>}
              </InlineStack>
              <Text variant="bodySm" tone="subdued">Match the template perfectly with your brand identity</Text>
            </BlockStack>
          </InlineStack>

          <Box paddingBlockStart="200">
            <Divider />
          </Box>

          <BlockStack gap="400">
            <Select
              label="Custom Google Font"
              options={[
                { label: 'Default (Inter)', value: 'Inter' },
                { label: 'Roboto', value: 'Roboto' },
                { label: 'Montserrat', value: 'Montserrat' },
                { label: 'Open Sans', value: 'Open Sans' },
                { label: 'Playfair Display', value: 'Playfair Display' },
                { label: 'Oswald', value: 'Oswald' },
                { label: 'Poppins', value: 'Poppins' },
                { label: 'Lato', value: 'Lato' },
                { label: 'Raleway', value: 'Raleway' },
                { label: 'Nunito', value: 'Nunito' },
                { label: 'Ubuntu', value: 'Ubuntu' },
                { label: 'Merriweather', value: 'Merriweather' },
                { label: 'PT Sans', value: 'PT Sans' },
                { label: 'Rubik', value: 'Rubik' },
                { label: 'Work Sans', value: 'Work Sans' },
                { label: 'Lora', value: 'Lora' },
                { label: 'Fira Sans', value: 'Fira Sans' },
                { label: 'Quicksand', value: 'Quicksand' },
                { label: 'Barlow', value: 'Barlow' },
                { label: 'Inconsolata', value: 'Inconsolata' },
                { label: 'Caveat', value: 'Caveat' },
                { label: 'Pacifico', value: 'Pacifico' },
                { label: 'Dancing Script', value: 'Dancing Script' },
                { label: 'Bebas Neue', value: 'Bebas Neue' },
              ]}
              value={formState.customFont || "Inter"}
              onChange={(val) => {
                if (!isPro) return onUpgrade();
                setFormState({ ...formState, customFont: val });
              }}
              helpText="Select a Google Font to apply to the Coming Soon page."
              disabled={!isPro}
            />

            <TextField
              label="Custom CSS"
              value={formState.customCss || ""}
              onChange={(val) => {
                if (!isPro) return onUpgrade();
                setFormState({ ...formState, customCss: val });
              }}
              multiline={4}
              helpText="Add custom CSS rules. Example: .csmm-title { color: red !important; }"
              monospaced
              disabled={!isPro}
            />
          </BlockStack>
        </BlockStack>
      </Card>
    </BlockStack>
  );
};

export default ContentSection;
