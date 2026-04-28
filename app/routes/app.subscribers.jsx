import { useState, useCallback, useMemo, useEffect } from "react";
import { json } from "@remix-run/server-runtime";
import { useLoaderData, useSubmit, useActionData, useNavigation } from "@remix-run/react";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  Page,
  Layout,
  Card,
  IndexTable,
  Text,
  EmptyState,
  useIndexResourceState,
  Badge,
  Button,
  InlineStack,
  InlineGrid,
  Box,
  Avatar,
  BlockStack,
  TextField,
  CalloutCard,
  Divider,
  Icon,
  Modal,
} from "@shopify/polaris";
import { ExportIcon, SearchIcon, CalendarIcon, PersonIcon, DeleteIcon, PlusIcon } from "@shopify/polaris-icons";
import { authenticate } from "../shopify.server";
import { MONTHLY_PLAN } from "../constants";
import db from "../db.server";

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "DELETE_SELECTED") {
    const selectedIdsStr = formData.get("ids");
    const selectedIds = JSON.parse(selectedIdsStr).map(id => Number(id));

    await db.subscriber.deleteMany({
      where: {
        id: { in: selectedIds },
        shop: session.shop,
      },
    });
    return json({ success: true, message: `${selectedIds.length} subscribers deleted.` });
  }

  if (intent === "DELETE_ALL") {
    await db.subscriber.deleteMany({
      where: { shop: session.shop },
    });
    return json({ success: true, message: "All subscribers cleared." });
  }

  if (intent === "DELETE_SINGLE") {
    const id = formData.get("id");
    await db.subscriber.delete({
      where: { id: Number(id), shop: session.shop },
    });
    return json({ success: true, message: "Subscriber deleted." });
  }

  return json({ success: false });
};

export const loader = async ({ request }) => {
  const { admin, session, billing } = await authenticate.admin(request);
  const subscribers = await db.subscriber.findMany({
    where: { shop: session.shop },
    orderBy: { createdAt: "desc" },
  });

  const billingCheck = await billing.check({
    plans: [MONTHLY_PLAN],
    isTest: true,
  });
  const isPro = billingCheck.hasActivePayment;

  return json({ subscribers, isPro });
};

export default function Subscribers() {
  const { subscribers, isPro } = useLoaderData();
  const shopify = useAppBridge();
  const actionData = useActionData();
  const submit = useSubmit();
  const navigation = useNavigation();
  const [queryValue, setQueryValue] = useState("");

  // Modal states
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [isUpgradeModalActive, setIsUpgradeModalActive] = useState(false);
  const [deleteType, setDeleteType] = useState(null); // 'single', 'bulk', 'all'
  const [targetId, setTargetId] = useState(null);

  const isDeleting = navigation.state === "submitting" &&
    (navigation.formData?.get("intent")?.includes("DELETE"));

  useEffect(() => {
    if (actionData?.success) {
      shopify.toast.show(actionData.message);
      setIsDeleteModalActive(false);
      setDeleteType(null);
      setTargetId(null);
    }
  }, [actionData]);

  const resourceName = {
    singular: "subscriber",
    plural: "subscribers",
  };

  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    [],
  );

  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);

  // Filter subscribers based on search query
  const filteredSubscribers = useMemo(() => {
    if (!queryValue) return subscribers;
    return subscribers.filter((s) =>
      s.email.toLowerCase().includes(queryValue.toLowerCase())
    );
  }, [subscribers, queryValue]);

  const { selectedResources, allResourcesSelected, handleSelectionChange, clearSelection } =
    useIndexResourceState(filteredSubscribers);

  // Stats calculation
  const totalSubscribers = subscribers.length;
  const joinedThisMonth = subscribers.filter(s => {
    const date = new Date(s.createdAt);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;

  const exportToCSV = () => {
    if (!isPro) return;
    if (subscribers.length === 0) return;
    const headers = ["Email", "Subscription Date"];
    const rows = subscribers.map(s => [s.email, new Date(s.createdAt).toLocaleString()]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "subscribers.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmDelete = (type, id = null) => {
    setDeleteType(type);
    setTargetId(id);
    setIsDeleteModalActive(true);
  };

  const executeDelete = () => {
    if (deleteType === "single") {
      submit({ intent: "DELETE_SINGLE", id: targetId }, { method: "POST" });
    } else if (deleteType === "bulk") {
      submit({ intent: "DELETE_SELECTED", ids: JSON.stringify(selectedResources) }, { method: "POST" });
      clearSelection();
    } else if (deleteType === "all") {
      submit({ intent: "DELETE_ALL" }, { method: "POST" });
    }
  };

  const rowMarkup = filteredSubscribers.map(
    ({ id, email, createdAt }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <InlineStack gap="300" align="start" blockAlign="center">
            <Avatar size="small" name={email} initials={email.substring(0, 1).toUpperCase()} />
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {isPro ? email : email.split('@')[0].slice(0, 3) + '***@' + email.split('@')[1]}
            </Text>
            {!isPro && <Badge tone="attention" size="small">Pro Only</Badge>}
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <InlineStack gap="200" align="start" blockAlign="center">
            <Text variant="bodyMd" as="span" tone="subdued">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </InlineStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone="info">Active Lead</Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div style={{ textAlign: 'right' }}>
            <Button
              variant="tertiary"
              icon={DeleteIcon}
              tone="critical"
              onClick={(e) => {
                e.stopPropagation();
                confirmDelete("single", id);
              }}
            />
          </div>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Page
      fullWidth
      title="Subscribers Hub"
      subtitle="Track your upcoming storefront audience growth."
      primaryAction={{
        content: isPro ? "Export CSV" : "Export CSV (Pro)",
        icon: ExportIcon,
        onAction: () => {
          if (isPro) {
            exportToCSV();
          } else {
            setIsUpgradeModalActive(true);
          }
        },
        disabled: subscribers.length === 0
      }}
      secondaryActions={[
        {
          content: "Clear All List",
          icon: DeleteIcon,
          onAction: () => confirmDelete("all"),
          destructive: true,
          disabled: subscribers.length === 0
        }
      ]}
    >
      <BlockStack gap="500">

        {/* TOP STATS SECTION */}
        <InlineGrid columns={{ xs: 1, sm: 2, md: 3 }} gap="400">
          <Card>
            <BlockStack gap="100">
              <InlineStack align="space-between">
                <Text variant="headingSm" as="h3" tone="subdued">Total Captured</Text>
                <Icon source={PersonIcon} tone="base" />
              </InlineStack>
              <Text variant="headingXl" as="p">{totalSubscribers}</Text>
              <Text variant="bodyXs" tone="success">Lifetime audience</Text>
            </BlockStack>
          </Card>
          <Card>
            <BlockStack gap="100">
              <InlineStack align="space-between">
                <Text variant="headingSm" as="h3" tone="subdued">Joined This Month</Text>
                <Icon source={CalendarIcon} tone="base" />
              </InlineStack>
              <Text variant="headingXl" as="p">{joinedThisMonth}</Text>
              <Text variant="bodyXs" tone="info">New potential customers</Text>
            </BlockStack>
          </Card>
          <Card background="bg-surface-secondary">
            <BlockStack gap="100">
              <Text variant="headingSm" as="h3" tone="subdued">Status</Text>
              <Box paddingBlockStart="100">
                <Badge tone="success" size="large">Campaign Active</Badge>
              </Box>
              <Box paddingBlockStart="200">
                <Text variant="bodyXs" tone="subdued">Receiving live updates</Text>
              </Box>
            </BlockStack>
          </Card>
        </InlineGrid>

        <Layout>
          <Layout.Section>
            {subscribers.length === 0 ? (
              <Card>
                <EmptyState
                  heading="Your audience is waiting!"
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                  action={{ content: 'Go to Preview', url: '/app' }}
                >
                  <p>Enable the subscriber form on your coming soon templates to start building your list.</p>
                </EmptyState>
              </Card>
            ) : (
              <Card padding="0">
                <Box padding="300">
                  <TextField
                    label="Search subscribers"
                    labelHidden
                    value={queryValue}
                    onChange={handleFiltersQueryChange}
                    prefix={<Icon source={SearchIcon} />}
                    placeholder="Filter by email address..."
                    autoComplete="off"
                    clearButton
                    onClearButtonClick={handleQueryValueRemove}
                  />
                </Box>
                <Divider />
                <IndexTable
                  resourceName={resourceName}
                  itemCount={filteredSubscribers.length}
                  selectedItemsCount={
                    allResourcesSelected ? "All" : selectedResources.length
                  }
                  onSelectionChange={handleSelectionChange}
                  headings={[
                    { title: "Subscriber" },
                    { title: "Subscription Date" },
                    { title: "Status" },
                    { title: "", alignment: "end" },
                  ]}
                  promotedBulkActions={[
                    {
                      content: 'Delete selected subscribers',
                      onAction: () => confirmDelete("bulk"),
                    },
                  ]}
                >
                  {rowMarkup}
                </IndexTable>
                {filteredSubscribers.length === 0 && (
                  <Box padding="600" textAlign="center">
                    <Text tone="subdued">No subscribers match your search.</Text>
                  </Box>
                )}
              </Card>
            )}
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <BlockStack gap="400">
              <CalloutCard
                title="Grow your list"
                illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customize-20-8cc26e8386a34ef26284646b08e235a9fba75dce1a2e737c374ca021469e71f4.svg"
                primaryAction={{
                  content: 'Check Templates',
                  url: '/app',
                }}
              >
                <p>Try different templates to see which one converts better for your brand.</p>
              </CalloutCard>

              <Card>
                <BlockStack gap="300">
                  <Text variant="headingMd" as="h2">Data Security</Text>
                  <Text variant="bodyMd" tone="subdued">
                    Subscriber data is encrypted and stored according to Shopify's privacy guidelines. You can export this data anytime for your email marketing tools.
                  </Text>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
      <Box paddingBlockStart="800" />

      <Modal
        open={isDeleteModalActive}
        onClose={() => setIsDeleteModalActive(false)}
        title={deleteType === "all" ? "Clear all subscribers?" : "Delete subscriber?"}
        primaryAction={{
          content: isDeleting ? "Deleting..." : "Delete",
          onAction: executeDelete,
          destructive: true,
          disabled: isDeleting
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => setIsDeleteModalActive(false),
            disabled: isDeleting
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            <Text>
              {deleteType === "all"
                ? "This will permanently remove all subscribers from your database. This action cannot be undone."
                : deleteType === "bulk"
                  ? `Are you sure you want to delete ${selectedResources.length} selected subscribers? This action cannot be undone.`
                  : "Are you sure you want to delete this subscriber? This action cannot be undone."
              }
            </Text>
          </BlockStack>
        </Modal.Section>
      </Modal>
      <Modal
        open={isUpgradeModalActive}
        onClose={() => setIsUpgradeModalActive(false)}
        title="Upgrade to Pro Plan - 15 Day Free Trial"
        primaryAction={{
          content: "Start 15-Day Free Trial",
          url: "/app/upgrade",
        }}
        secondaryActions={[
          {
            content: "Maybe Later",
            onAction: () => setIsUpgradeModalActive(false),
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            <Box padding="400" background="bg-surface-secondary" borderRadius="200">
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">What's included in Pro?</Text>
                <InlineStack gap="400" wrap>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon source={PlusIcon} tone="info" />
                    <Text variant="bodyMd">30+ Premium Templates</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon source={PlusIcon} tone="info" />
                    <Text variant="bodyMd">Newsletter API Sync</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon source={PlusIcon} tone="info" />
                    <Text variant="bodyMd">Export Subscriber Emails</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon source={PlusIcon} tone="info" />
                    <Text variant="bodyMd">Header Navigation</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon source={PlusIcon} tone="info" />
                    <Text variant="bodyMd">Secret Bypass Link</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon source={PlusIcon} tone="info" />
                    <Text variant="bodyMd">Custom Fonts & CSS</Text>
                  </div>
                </InlineStack>
              </BlockStack>
            </Box>
            <Text tone="subdued">
              Start your 15-day free trial today. You won't be charged until the trial ends, and you can cancel anytime.
            </Text>
          </BlockStack>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
