import React from "react";
import {
  Card,
  BlockStack,
  InlineStack,
  Text,
  Icon,
  Divider,
  ChoiceList,
  TextField,
  Banner,
  Box,
  Link,
} from "@shopify/polaris";
import { EmailIcon } from "@shopify/polaris-icons";

export default function NewsletterSection({ formState, setFormState, isPro, onUpgrade }) {
  const providers = [
    { label: "None (Local Only)", value: "NONE" },
    { label: "Klaviyo", value: "KLAVIYO" },
    { label: "Mailchimp", value: "MAILCHIMP" },
    { label: "Omnisend", value: "OMNISEND" },
  ];

  const handleProviderChange = (value) => {
    const selectedProvider = value[0];
    if (selectedProvider !== "NONE" && !isPro) {
      onUpgrade();
    } else {
      setFormState({ ...formState, newsletterProvider: selectedProvider });
    }
  };

  const renderProviderFields = () => {
    if (formState.newsletterProvider !== "NONE" && !isPro) {
      return (
        <Banner tone="warning" title="Pro Feature">
          <p>Newsletter integrations are only available on the Pro plan. <Link onClick={onUpgrade}>Upgrade now</Link> to sync your subscribers.</p>
        </Banner>
      );
    }
    switch (formState.newsletterProvider) {
      case "KLAVIYO":
        return (
          <BlockStack gap="400">
            <Banner title="Klaviyo Integration" tone="info">
              <p>
                To find your Private API Key, go to Klaviyo <strong>Settings → API Keys</strong>. 
                You also need a <strong>List ID</strong> (found in the URL of your chosen list).
              </p>
            </Banner>
            <TextField
              label="Klaviyo Private API Key"
              value={formState.newsletterApiKey}
              onChange={(v) => setFormState({ ...formState, newsletterApiKey: v })}
              autoComplete="off"
              type="password"
              placeholder="pk_xxxxxxxxxxxxxxxxxxxxxxxx"
            />
            <TextField
              label="Klaviyo List ID"
              value={formState.newsletterListId}
              onChange={(v) => setFormState({ ...formState, newsletterListId: v })}
              autoComplete="off"
              placeholder="e.g. XyZ123"
            />
          </BlockStack>
        );
      case "MAILCHIMP":
        return (
          <BlockStack gap="400">
            <Banner title="Mailchimp Integration" tone="info">
              <p>
                Your API Key is in <strong>Account → Extras → API keys</strong>. 
                The Audience ID (List ID) is in <strong>Audience → Settings → Audience name and defaults</strong>.
              </p>
            </Banner>
            <TextField
              label="Mailchimp API Key"
              value={formState.newsletterApiKey}
              onChange={(v) => setFormState({ ...formState, newsletterApiKey: v })}
              autoComplete="off"
              type="password"
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxx-usX"
            />
            <TextField
              label="Mailchimp Audience ID (List ID)"
              value={formState.newsletterListId}
              onChange={(v) => setFormState({ ...formState, newsletterListId: v })}
              autoComplete="off"
              placeholder="e.g. 1a2b3c4d5e"
            />
            <TextField
              label="Mailchimp Datacenter (Optional)"
              value={formState.newsletterMailchimpDc}
              onChange={(v) => setFormState({ ...formState, newsletterMailchimpDc: v })}
              autoComplete="off"
              helpText="e.g. us1, us20. Usually found at the end of your API key."
              placeholder="us21"
            />
          </BlockStack>
        );
      case "OMNISEND":
        return (
          <BlockStack gap="400">
            <Banner title="Omnisend Integration" tone="info">
              <p>
                Create an API Key in <strong>Store Settings → Integrations & API → API Keys</strong>.
              </p>
            </Banner>
            <TextField
              label="Omnisend API Key"
              value={formState.newsletterApiKey}
              onChange={(v) => setFormState({ ...formState, newsletterApiKey: v })}
              autoComplete="off"
              type="password"
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
            />
          </BlockStack>
        );
      default:
        return (
          <Banner tone="info">
            <p>Emails will be saved locally in your subscribers list. Select a provider above to sync them automatically.</p>
          </Banner>
        );
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack gap="200" align="start" blockAlign="center">
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            width: 32, 
            height: 32, 
            borderRadius: 8, 
            background: "var(--p-color-bg-fill-info-secondary, #e0f0ff)" 
          }}>
            <Icon source={EmailIcon} tone="info" />
          </div>
          <BlockStack gap="0">
            <Text as="h2" variant="headingSm">Newsletter Integration</Text>
            <Text variant="bodySm" tone="subdued">Sync your subscribers with external tools</Text>
          </BlockStack>
        </InlineStack>
        <Divider />
        
        <ChoiceList
          title="Select Service Provider"
          choices={providers}
          selected={[formState.newsletterProvider || "NONE"]}
          onChange={handleProviderChange}
        />
        
        <Box paddingBlockStart="200">
          {renderProviderFields()}
        </Box>
      </BlockStack>
    </Card>
  );
}
