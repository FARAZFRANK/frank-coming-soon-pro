import { json } from "@remix-run/server-runtime";
import { useLoaderData, useSubmit, useNavigation, useLocation } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Banner,
  Text,
  BlockStack,
  Box,
  Button,
  InlineStack,
  Divider,
  Badge,
  Icon,
  InlineGrid,
  List,
} from "@shopify/polaris";
import { CheckIcon, StarFilledIcon } from "@shopify/polaris-icons";
import { authenticate } from "../shopify.server";
import { MONTHLY_PLAN } from "../constants";

export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);

  try {
    const billingCheck = await billing.check({
      plans: [MONTHLY_PLAN],
      isTest: true,
    });

    let isPro = billingCheck.hasActivePayment;

    // Double check real payments if test payment is not found
    if (!isPro) {
      const realCheck = await billing.check({
        plans: [MONTHLY_PLAN],
        isTest: false,
      });
      isPro = realCheck.hasActivePayment;
    }


    return json({
      isPro: isPro,
      billingError: null,
    });
  } catch (error) {
    console.error("Billing API error in Pricing loader:", error.message);
    return json({
      isPro: false,
      billingError: "Billing API is unavailable. Ensure your app has 'Public distribution' in the Partner Dashboard.",
    });
  }
};

export default function Pricing() {
  const { isPro, billingError } = useLoaderData();
  const location = useLocation();
  const navigation = useNavigation();
  const isUpgrading = navigation.state === "loading" && navigation.location.pathname === "/app/upgrade";

  const plans = [
    {
      title: "Free",
      price: "0",
      description: "Basic features for early stage",
      features: [
        "5 Pre-Build Templates",
        "Coming Soon Mode",
        "Maintenance Mode",
        "Store Brand Logo",
        "Store Title and Brief Intro",
        "Subscriber Form (Masked)",
        "Social Media Profile Links",
        "Count Down Timer",
        "Modern Setting Dashboard",
        "Real Time Preview",
      ],
      isCurrent: !isPro,
      action: {
        content: isPro ? "Downgrade to Free" : "Current Plan",
        url: isPro ? `/app/downgrade${location.search}` : null,
        disabled: !isPro || isUpgrading,
      },
    },
    {
      title: "Pro",
      price: "2.99",
      description: "All-in-one professional toolkit",
      features: [
        "All Pre-Build Templates (30+)",
        "Newsletter API Integration",
        "Klaviyo, Mailchimp, and Omnisend",
        "AI Email Marketing Tools",
        "Export Subscriber List (CSV)",
        "Header Navigation Menu",
        "Automatic Website Launch",
        "Priority 24/7 Support",
        "Everything in Free Plan",
        "Bypass Link live store",
        "Custom Google Font",
        "Custom CSS",
      ],
      isCurrent: isPro,
      highlight: true,
      trialDays: 15,
      action: {
        content: isPro ? "Current Plan" : "Start 15-Day Free Trial",
        url: isPro ? null : `/app/upgrade${location.search}`,
        disabled: isPro || isUpgrading,
        loading: isUpgrading,
      },
    },
  ];

  return (
    <Page title="Plans & Pricing">
      <Layout>
        {billingError && (
          <Layout.Section>
            <Banner tone="warning" title="Billing API Restricted">
              <p>{billingError}</p>
            </Banner>
          </Layout.Section>
        )}
        <Layout.Section>
          <Box paddingBlockEnd="800">
            <BlockStack gap="400" align="center">
              <Text variant="headingLg" as="h2" alignment="center">
                Choose the perfect plan for your store
              </Text>
              <Text variant="bodyMd" tone="subdued" alignment="center">
                Whether you're just starting out or ready to launch, we have a plan for you.
              </Text>
            </BlockStack>
          </Box>

          <InlineGrid columns={{ xs: 1, md: 2 }} gap="600">
            {plans.map((plan) => (
              <Card key={plan.title} roundedAbove="sm">
                <BlockStack gap="500">
                  <BlockStack gap="200">
                    <InlineStack align="space-between" blockAlign="center">
                      <Text variant="headingMd" as="h3">
                        {plan.title}
                      </Text>
                      {plan.isCurrent && (
                        <Badge tone="success">Current Plan</Badge>
                      )}
                      {plan.highlight && !plan.isCurrent && (
                        <Badge tone="attention" icon={StarFilledIcon}>Best Value</Badge>
                      )}
                    </InlineStack>
                    <InlineStack align="start" blockAlign="baseline" gap="100">
                      <Text variant="heading2xl" as="p">
                        ${plan.price}
                      </Text>
                      <Text variant="bodySm" tone="subdued">
                        / month
                      </Text>
                    </InlineStack>
                    <Text variant="bodyMd" tone="subdued">
                      {plan.description}
                    </Text>
                  </BlockStack>

                  <Divider />

                  <BlockStack gap="300">
                    <Text variant="headingSm" as="h4">
                      Features:
                    </Text>
                    <BlockStack gap="200">
                      {plan.features.map((feature) => (
                        <InlineStack gap="200" align="start" blockAlign="start" key={feature}>
                          <Box paddingBlockStart="050">
                            <Icon source={CheckIcon} tone="success" />
                          </Box>
                          <Text variant="bodyMd">{feature}</Text>
                        </InlineStack>
                      ))}
                    </BlockStack>
                  </BlockStack>

                  <Box paddingBlockStart="400">
                    <Button
                      size="large"
                      variant={plan.highlight ? "primary" : "secondary"}
                      fullWidth
                      url={plan.action.url}
                      disabled={plan.action.disabled}
                      loading={plan.action.loading}
                    >
                      {plan.action.content}
                    </Button>
                  </Box>
                </BlockStack>
              </Card>
            ))}
          </InlineGrid>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd" as="h2">Why go Pro?</Text>
                <Text variant="bodyMd" tone="subdued">
                  Our Pro plan is designed to help you capture more leads and maintain a professional look while your store is under construction.
                </Text>
                <Divider />
                <BlockStack gap="200">
                  <Text variant="headingSm" as="h3">30+ Premium Templates</Text>
                  <Text variant="bodySm" tone="subdued">Get access to all our high-converting designs tailored for different industries.</Text>
                </BlockStack>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd" as="h2">Billing Support</Text>
                <Text variant="bodyMd" tone="subdued">
                  Subscription charges will appear on your Shopify invoice. You can cancel at any time.
                </Text>
                <Button variant="plain">Learn more about billing</Button>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
