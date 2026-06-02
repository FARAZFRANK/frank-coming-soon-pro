import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useLoaderData, useSubmit, useNavigation, useActionData, Await } from "@remix-run/react";
import { json, defer, redirect } from "@remix-run/server-runtime";
import {
  Page,
  Text,
  Card,
  BlockStack,
  TextField,
  ChoiceList,
  InlineGrid,
  Box,
  Banner,
  Checkbox,
  Tabs,
  Modal,
  ResourceList,
  ResourceItem,
  InlineStack,
  Divider,
  Badge,
  Icon,
  Button,
  SkeletonBodyText,
  SkeletonDisplayText,
  Popover,
  ActionList,
  CalloutCard,
  Frame,
  ContextualSaveBar,
} from "@shopify/polaris";
import {
  PaintBrushFlatIcon,
  LayoutBlockIcon,
  ViewIcon,
  PlusIcon,
  DeleteIcon,
} from "@shopify/polaris-icons";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { MONTHLY_PLAN } from "../constants";
import db from "../db.server";
import styles from "../styles/Dashboard.module.css";
import BrandingSection from "../components/dashboard/BrandingSection";
import ContentSection from "../components/dashboard/ContentSection";
import SocialLinksSection from "../components/dashboard/SocialLinksSection";
import NewsletterSection from "../components/dashboard/NewsletterSection";
import { getPlatformColor, getPlatformIcon } from "../components/socialMediaUtils.jsx";
import TemplateViewer from "../components/dashboard/TemplateViewer";

const get7DaysAheadDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  const pad = (num) => String(num).padStart(2, '0');
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};

export const loader = async ({ request }) => {
  const { admin, session, billing } = await authenticate.admin(request);
  const shop = session.shop;


  // CRITICAL — block on settings + images + videos (Pickers need assets immediately for upload flow)
  const [settingsResult, allImages, allVideos] = await Promise.all([
    db.settings.findUnique({ where: { shop } }),
    admin.graphql(
      `#graphql
      query getImages {
        files(first: 50, sortKey: CREATED_AT, reverse: true) {
          edges {
            node {
              __typename
              ... on MediaImage { id image { url } alt fileStatus fileErrors { message } }
            }
          }
        }
      }`
    ).then(r => r.json()).then(json => {
      const allFiles = json.data?.files?.edges?.map(e => e.node) || [];
      return allFiles
        .filter(node => node.__typename === 'MediaImage')
        .map(node => ({
          id: node.id,
          fileStatus: node.fileStatus || "UNKNOWN",
          fileErrors: node.fileErrors || [],
          url: node.image?.url || "",
          preview: node.image?.url || null,
          altText: node.alt
        }));
    }),
    admin.graphql(
      `#graphql
      query getVideos {
        files(first: 50, sortKey: CREATED_AT, reverse: true) {
          edges {
            node {
              ... on Video { 
                id 
                originalSource { url }
                sources { format url } 
                preview { image { url } } 
                alt 
              }
              ... on GenericFile { id url alt }
            }
          }
        }
      }`
    ).then(r => r.json()).then(json => {
      if (json.errors) console.error("GraphQL getVideos Errors:", json.errors);

      const allFiles = json.data?.files?.edges?.map(e => e.node) || [];

      const videoFiles = allFiles.filter(node => {
        if (node.sources) return true; // Natively a Video object

        if (node.url) {
          const urlWithoutQuery = node.url.split('?')[0].toLowerCase();
          if (urlWithoutQuery.endsWith(".mp4") || urlWithoutQuery.endsWith(".webm") || urlWithoutQuery.endsWith(".mov")) {
            return true;
          }
        }
        return false;
      });

      // Debug data removal to prevent dev-server loop
      return videoFiles.map(node => {
        const mp4Source = node?.sources?.find(s => s.format === "mp4") || node?.sources?.[0];
        return {
          id: node.id,
          fileStatus: node.fileStatus || "UNKNOWN",
          fileErrors: node.fileErrors || [],
          url: node.url || mp4Source?.url || node.originalSource?.url || "",
          preview: node.preview?.image?.url || null,
          altText: node.alt || "Unknown",
        };
      });
    })
  ]);

  let settings = settingsResult;
  if (!settings) {
    settings = await db.settings.create({
      data: {
        shop,
        mode: "LIVE",
        templateId: "template_1",
        title: "Coming Soon",
        description: "Something big is coming! Please sign up for our newsletter to receive exclusive updates.",
        logoUrl: "",
        bgImageUrl: "",
        maintenanceScope: "ALL",
        socialLinks: JSON.stringify({ instagram: "@", facebook: "@", twitter: "@" }),
        showHeader: false,
        newsletterProvider: "NONE",
        countdownDate: get7DaysAheadDate(),
      },
    });
  } else {
    // If the saved date is empty, invalid, or already in the past/expired compared to the current date,
    // dynamically default it to current date + 7 days so it is always active and fresh.
    const isPastOrEmpty = !settings.countdownDate || new Date(settings.countdownDate) <= new Date();
    if (isPastOrEmpty) {
      settings.countdownDate = get7DaysAheadDate();
    }
  }

  // NON-CRITICAL — these stream in via defer (user sees skeleton while loading)
  const pagesPromise = admin.graphql(
    `#graphql
    query getPages {
      pages(first: 50) {
        edges { node { id title handle } }
      }
    }`
  ).then(r => r.json()).then(json =>
    json.data?.pages?.edges?.map(edge => edge.node) || []
  );

  const productsPromise = admin.graphql(
    `#graphql
    query getProducts {
      products(first: 50) {
        edges { node { id title handle } }
      }
    }`
  ).then(r => r.json()).then(json =>
    json.data?.products?.edges?.map(edge => edge.node) || []
  );

  // App Embed check — fully self-contained async pipeline (themes → theme settings)
  const appEmbedPromise = (async () => {
    try {
      const themesRes = await admin.graphql(
        `#graphql
        query getThemes {
          themes(first: 10) { edges { node { id role } } }
        }`
      );
      const themesJson = await themesRes.json();
      const mainTheme = themesJson.data?.themes?.edges?.find(e => e.node.role === 'MAIN')?.node;
      if (!mainTheme) return { appEmbedEnabled: false, themeId: "" };

      const themeId = mainTheme.id.split('/').pop();
      const assetRes = await admin.graphql(
        `#graphql
        query getThemeSettings($id: ID!) {
          theme(id: $id) {
            files(filenames: ["config/settings_data.json"]) {
              nodes {
                body { ... on OnlineStoreThemeFileBodyText { content } }
              }
            }
          }
        }`,
        { variables: { id: mainTheme.id } }
      );
      const assetJson = await assetRes.json();
      const settingsContent = assetJson.data?.theme?.files?.nodes?.[0]?.body?.content;

      let appEmbedEnabled = false;
      if (settingsContent) {
        const cleanSettings = settingsContent.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
        try {
          const parsed = JSON.parse(cleanSettings);
          const blocks = parsed.current?.blocks || {};
          appEmbedEnabled = Object.values(blocks).some(
            (block) => block.type && block.type.includes('coming-soon') && block.disabled === false
          );
        } catch (e) {
          console.error("JSON Parse Error for settings_data:", e);
        }
      }
      return { appEmbedEnabled, themeId };
    } catch (error) {
      console.error("Error checking app embed status:", error);
      return { appEmbedEnabled: false, themeId: "" };
    }
  })();

  // Check subscription status
  let isPro = false;
  try {
    const shopResponse = await admin.graphql(`{ shop { name plan { partnerDevelopment } } }`);
    const shopData = await shopResponse.json();
    const isDevStore = shopData.data?.shop?.plan?.partnerDevelopment || shopData.data?.shop?.name?.includes("dev");
    const isTest = isDevStore;

    const billingCheck = await billing.check({
      plans: [MONTHLY_PLAN],
      isTest,
    });
    isPro = billingCheck.hasActivePayment;

    if (!isPro) {
      const fallbackCheck = await billing.check({
        plans: [MONTHLY_PLAN],
        isTest: !isTest,
      });
      isPro = fallbackCheck.hasActivePayment;
    }
  } catch (error) {
    console.error("Billing API error in Index loader:", error.message);
    isPro = false;
  }

  // Return defer to stream data and avoid blocking the initial render
  return defer({
    initialSettings: settings,
    allImages,
    allVideos,
    shop: session.shop,
    apiKey: (typeof process !== "undefined" ? process.env.SHOPIFY_API_KEY : "") || "0955e12f5de833db49e2a6d2fd067a9e",
    allPages: pagesPromise,
    allProducts: productsPromise,
    appEmbedData: appEmbedPromise,
    isPro,
  });
};

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const shop = session.shop;
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  const intent = formData.get("intent");

  if (intent === "UPLOAD_IMAGE") {
    const file = formData.get("file");
    const fileName = formData.get("fileName");
    const fileSize = formData.get("fileSize");
    const fileType = formData.get("fileType");

    try {
      // 1. stagedUploadsCreate
      const stagedResponse = await admin.graphql(
        `#graphql
        mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
          stagedUploadsCreate(input: $input) {
            stagedTargets {
              url
              resourceUrl
              parameters { name value }
            }
          }
        }`,
        {
          variables: {
            input: [{
              filename: fileName,
              mimeType: fileType,
              resource: fileType.startsWith("video/") ? "VIDEO" : "IMAGE",
              fileSize: fileSize.toString(),
              httpMethod: "POST",
            }],
          },
        }
      );
      const stagedData = await stagedResponse.json();

      if (stagedData.data.stagedUploadsCreate.userErrors?.length > 0) {
        return { success: false, error: stagedData.data.stagedUploadsCreate.userErrors[0].message };
      }

      const target = stagedData.data.stagedUploadsCreate.stagedTargets[0];

      return {
        uploadTarget: target,
        success: true
      };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  if (intent === "FINALIZE_UPLOAD") {
    const resourceUrl = formData.get("resourceUrl");
    const contentType = formData.get("contentType") || "IMAGE";
    try {
      const finalizeResponse = await admin.graphql(
        `#graphql
        mutation fileCreate($files: [FileCreateInput!]!) {
          fileCreate(files: $files) {
            files {
              fileStatus
              ... on MediaImage {
                id
                image { url }
              }
              ... on GenericFile {
                id
                url
              }
              ... on Video {
                id
                originalSource { url }
                sources { format url }
              }
            }
            userErrors { message }
          }
        }`,
        {
          variables: {
            files: [{ originalSource: resourceUrl, contentType: contentType }],
          },
        }
      );
      const finalizeData = await finalizeResponse.json();

      if (finalizeData.data?.fileCreate?.userErrors?.length > 0) {
        return { success: false, error: finalizeData.data.fileCreate.userErrors[0].message };
      }

      const uploadedFile = finalizeData.data?.fileCreate?.files?.[0];
      if (!uploadedFile) {
        return { success: false, error: "File was uploaded but Shopify did not return a valid file instance." };
      }

      const mp4Source = uploadedFile.sources?.find(s => s.format === "mp4") || uploadedFile.sources?.[0];
      const fileUrl = uploadedFile.image?.url || uploadedFile.url || mp4Source?.url || uploadedFile.originalSource?.url;

      if (!fileUrl) {
        return { success: false, error: "processing", fileId: uploadedFile.id };
      }

      return { uploadedUrl: fileUrl, success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  if (intent === "DELETE_FILE") {
    const fileId = formData.get("fileId");
    try {
      const deleteResponse = await admin.graphql(
        `#graphql
        mutation fileDelete($fileIds: [ID!]!) {
          fileDelete(fileIds: $fileIds) {
            deletedFileIds
            userErrors { message }
          }
        }`,
        { variables: { fileIds: [fileId] } }
      );
      const deleteData = await deleteResponse.json();

      if (deleteData.data?.fileDelete?.userErrors?.length > 0) {
        return { success: false, error: deleteData.data.fileDelete.userErrors[0].message };
      }
      return { success: true, deletedId: fileId };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  const clean = (v) => (v === "null" || !v ? "" : v);

  if (intent === "RESET_DEFAULTS") {
    data = {
      mode: "LIVE",
      templateId: "template_1",
      title: "Coming Soon",
      description: "Something big is coming! Please sign up for our newsletter to receive exclusive updates.",
      logoUrl: "",
      bgImageUrl: "",
      videoUrl: "",
      countdownDate: get7DaysAheadDate(),
      maintenanceScope: "ALL",
      selectedResources: "[]",
      socialLinks: JSON.stringify({ instagram: "@", facebook: "@", twitter: "@" }),
      showSubscriberForm: "true",
      showHeader: "false",
      countdownTitle: "Coming Soon",
      newsletterProvider: "NONE",
      newsletterApiKey: "",
      newsletterListId: "",
      newsletterMailchimpDc: "",
      bypassPassword: "",
      customCss: "",
      customFont: "Inter",
    };
  }

  let updatedSettings;
  try {
    updatedSettings = await db.settings.upsert({
      where: { shop },
      update: {
        mode: data.mode || "LIVE",
        templateId: data.templateId || "template_1",
        title: (data.title === undefined || data.title === null) ? "Something Big is Brewing" : data.title,
        description: (data.description === undefined || data.description === null) ? "We are currently working hard to create a new and exciting experience for you. Please sign up for our newsletter to receive exclusive updates and offers." : data.description,
        logoUrl: clean(data.logoUrl),
        bgImageUrl: clean(data.bgImageUrl),
        videoUrl: clean(data.videoUrl),
        watchVideoUrl: clean(data.watchVideoUrl),
        countdownDate: data.countdownDate || null,
        maintenanceScope: data.maintenanceScope || "ALL",
        selectedResources: data.selectedResources || "[]",
        socialLinks: data.socialLinks || "{}",
        showSubscriberForm: data.showSubscriberForm === "true" || data.showSubscriberForm === true,
        showHeader: data.showHeader === "true" || data.showHeader === true,
        countdownTitle: (data.countdownTitle === undefined || data.countdownTitle === null) ? "Coming Soon" : data.countdownTitle,
        newsletterProvider: data.newsletterProvider || "NONE",
        newsletterApiKey: clean(data.newsletterApiKey),
        newsletterListId: clean(data.newsletterListId),
        newsletterMailchimpDc: clean(data.newsletterMailchimpDc),
        bypassPassword: clean(data.bypassPassword),
        customCss: clean(data.customCss),
        customFont: data.customFont || "Inter",
      },
      create: {
        shop,
        mode: data.mode || "LIVE",
        templateId: data.templateId || "template_1",
        title: (data.title === undefined || data.title === null) ? "Something Big is Brewing" : data.title,
        description: (data.description === undefined || data.description === null) ? "We are currently working hard to create a new and exciting experience for you. Please sign up for our newsletter to receive exclusive updates and offers." : data.description,
        logoUrl: clean(data.logoUrl),
        bgImageUrl: clean(data.bgImageUrl),
        videoUrl: clean(data.videoUrl),
        watchVideoUrl: clean(data.watchVideoUrl),
        countdownDate: data.countdownDate || null,
        socialLinks: data.socialLinks || "{}",
        showSubscriberForm: data.showSubscriberForm === "true" || data.showSubscriberForm === true,
        showHeader: data.showHeader === "true" || data.showHeader === true,
        countdownTitle: (data.countdownTitle === undefined || data.countdownTitle === null) ? "Coming Soon" : data.countdownTitle,
        maintenanceScope: data.maintenanceScope || "ALL",
        selectedResources: data.selectedResources || "[]",
        newsletterProvider: data.newsletterProvider || "NONE",
        newsletterApiKey: clean(data.newsletterApiKey),
        newsletterListId: clean(data.newsletterListId),
        newsletterMailchimpDc: clean(data.newsletterMailchimpDc),
        bypassPassword: clean(data.bypassPassword),
        customCss: clean(data.customCss),
        customFont: data.customFont || "Inter",
      },
    });

    // Sync to Metafields for Storefront Access
    const metafieldValue = {
      mode: updatedSettings.mode,
      templateId: updatedSettings.templateId,
      title: (updatedSettings.title === undefined || updatedSettings.title === null) ? "Something Big is Brewing" : updatedSettings.title,
      description: (updatedSettings.description === undefined || updatedSettings.description === null) ? "We are currently working hard to create a new and exciting experience for you. Please sign up for our newsletter to receive exclusive updates and offers." : updatedSettings.description,
      logoUrl: updatedSettings.logoUrl || null,
      bgImageUrl: updatedSettings.bgImageUrl || null,
      videoUrl: updatedSettings.videoUrl || null,
      watchVideoUrl: updatedSettings.watchVideoUrl || null,
      countdownDate: updatedSettings.countdownDate,
      maintenanceScope: updatedSettings.maintenanceScope,
      selectedResources: JSON.parse(updatedSettings.selectedResources || "[]"),
      socialLinks: JSON.parse(updatedSettings.socialLinks || "{}"),
      showSubscriberForm: updatedSettings.showSubscriberForm,
      showHeader: updatedSettings.showHeader,
      countdownTitle: (updatedSettings.countdownTitle === undefined || updatedSettings.countdownTitle === null) ? "Coming Soon" : updatedSettings.countdownTitle,
      newsletterProvider: updatedSettings.newsletterProvider,
      newsletterApiKey: updatedSettings.newsletterApiKey,
      newsletterListId: updatedSettings.newsletterListId,
      newsletterMailchimpDc: updatedSettings.newsletterMailchimpDc,
      bypassPassword: updatedSettings.bypassPassword,
      customCss: updatedSettings.customCss,
      customFont: updatedSettings.customFont,
      appUrl: "", // Hardcoded or handled elsewhere to avoid process.env in client bundle
    };

    // Fetch Shop ID for Metafield ownerId
    const shopResponse = await admin.graphql(`{ shop { id } }`);
    const shopJson = await shopResponse.json();
    const shopId = shopJson.data.shop.id;

    await admin.graphql(
      `#graphql
    mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          id
          namespace
          key
        }
        userErrors {
          field
          message
        }
      }
    }`,
      {
        variables: {
          metafields: [
            {
              namespace: "coming_soon_app",
              key: "settings",
              type: "json",
              value: JSON.stringify(metafieldValue),
              ownerId: shopId,
            },
          ],
        },
      }
    );

    // 3. Ensure Storefront Visibility by creating a Metafield Definition (Modern Shopify 2025-01 way)
    try {
      await admin.graphql(
        `#graphql
      mutation metafieldDefinitionCreate($definition: MetafieldDefinitionInput!) {
        metafieldDefinitionCreate(definition: $definition) {
          createdDefinition {
            id
          }
          userErrors {
            field
            message
          }
        }
      }`,
        {
          variables: {
            definition: {
              name: "Coming Soon Settings",
              namespace: "coming_soon_app",
              key: "settings",
              ownerType: "SHOP",
              type: "json",
              access: {
                storefront: "PUBLIC"
              }
            },
          },
        }
      );
    } catch (e) {
      // Error handled
    }

    return { settings: updatedSettings, success: true, intent };
  } catch (e) {
    console.error("Action error saving settings:", e);
    return { success: false, error: e.message };
  }
};

export default function AppIndex() {
  const {
    initialSettings,
    allImages,
    allVideos,
    shop,
    apiKey,
    allPages,
    allProducts,
    appEmbedData,
    isPro
  } = useLoaderData();

  // Polyfill process for browser if any library leaks it
  if (typeof window !== 'undefined' && typeof window.process === 'undefined') {
    window.process = { env: { NODE_ENV: 'development' } };
  }

  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData();
  const shopify = useAppBridge();
  const [formState, setFormState] = useState(() => {
    let socialLinks = { instagram: "", facebook: "", twitter: "" };
    let selectedResources = [];

    try {
      if (initialSettings.socialLinks && initialSettings.socialLinks !== "null") {
        socialLinks = JSON.parse(initialSettings.socialLinks);
      }
    } catch (e) {
      console.error("Error parsing socialLinks in initial state:", e);
    }

    try {
      if (initialSettings.selectedResources && initialSettings.selectedResources !== "null") {
        selectedResources = JSON.parse(initialSettings.selectedResources);
      }
    } catch (e) {
      console.error("Error parsing selectedResources in initial state:", e);
    }

    return {
      ...initialSettings,
      socialLinks,
      selectedResources,
      countdownDate: initialSettings.countdownDate || get7DaysAheadDate(),
      logoUrl: initialSettings.logoUrl || "",
      showHeader: initialSettings.showHeader || false,
      videoUrl: initialSettings.videoUrl || "",
      newsletterProvider: initialSettings.newsletterProvider || "NONE",
      newsletterApiKey: initialSettings.newsletterApiKey || "",
      newsletterListId: initialSettings.newsletterListId || "",
      newsletterMailchimpDc: initialSettings.newsletterMailchimpDc || "",
      bypassPassword: initialSettings.bypassPassword || "",
      customCss: initialSettings.customCss || "",
      customFont: initialSettings.customFont || "Inter",
    };
  });

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isUpgradeModalActive, setIsUpgradeModalActive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [socialPopoverActive, setSocialPopoverActive] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Track changes to determine dirty state
  useEffect(() => {
    if (!initialSettings || !formState) return;

    const isFieldDirty = (fieldName) => {
      // Get initial value from DB, handle potential nulls
      let initialVal = initialSettings[fieldName];

      // Get current value from form state
      let currentVal = formState[fieldName];

      // Handle simple text fields and default logic
      if (fieldName === "title") {
        const defaultTitle = "Something Big is Brewing";
        const baseInitial = (initialVal === null || initialVal === undefined) ? defaultTitle : initialVal;
        return currentVal !== baseInitial;
      }
      if (fieldName === "description") {
        const defaultDesc = "We are currently working hard to create a new and exciting experience for you. Please sign up for our newsletter to receive exclusive updates and offers.";
        const baseInitial = (initialVal === null || initialVal === undefined) ? defaultDesc : initialVal;
        return currentVal !== baseInitial;
      }
      if (fieldName === "countdownTitle") {
        const defaultCD = "Coming Soon";
        const baseInitial = (initialVal === null || initialVal === undefined) ? defaultCD : initialVal;
        return currentVal !== baseInitial;
      }

      // Handle boolean fields
      if (fieldName === "showHeader" || fieldName === "showSubscriberForm") {
        const baseInitial = initialVal === true || initialVal === "true";
        return currentVal !== baseInitial;
      }

      // Handle objects (socialLinks)
      if (fieldName === "socialLinks") {
        const initialObj = typeof initialVal === "string" ? JSON.parse(initialVal || "{}") : (initialVal || {});
        return JSON.stringify(currentVal) !== JSON.stringify(initialObj);
      }

      // Handle arrays (selectedResources)
      if (fieldName === "selectedResources") {
        const initialArr = typeof initialVal === "string" ? JSON.parse(initialVal || "[]") : (initialVal || []);
        return JSON.stringify(currentVal) !== JSON.stringify(initialArr);
      }

      // Default comparison for other fields
      const normInitial = initialVal ?? "";
      const normCurrent = currentVal ?? "";
      return String(normCurrent) !== String(normInitial);
    };

    const fieldsToWatch = [
      "mode", "templateId", "title", "description", "logoUrl", "bgImageUrl",
      "videoUrl", "watchVideoUrl", "countdownDate", "maintenanceScope",
      "showSubscriberForm", "showHeader", "countdownTitle", "socialLinks", "selectedResources",
      "newsletterProvider", "newsletterApiKey", "newsletterListId", "newsletterMailchimpDc", "bypassPassword", "customCss", "customFont"
    ];

    const changed = fieldsToWatch.some(field => isFieldDirty(field));
    setIsDirty(changed);
  }, [formState, initialSettings]);

  // The form state is now fully controlled locally until a full unmount. 
  // We no longer blindly sync initialSettings on every revalidation to prevent
  // loader fetchers (like media uploads) from erasing unsaved user inputs.  // Store resolved deferred data for use in callbacks
  const resolvedPagesRef = useRef([]);
  const resolvedProductsRef = useRef([]);

  // Sync isSaving with navigation state
  useEffect(() => {
    if (navigation.state === "submitting") {
      setIsSaving(true);
    } else if (navigation.state === "idle") {
      setIsSaving(false);
    }
  }, [navigation.state]);

  useEffect(() => {
    if (actionData?.success) {
      if (actionData.intent === "RESET_DEFAULTS") {
        shopify.toast.show("Settings reset to defaults!");

        let socialLinks = { instagram: "", facebook: "", twitter: "" };
        let selectedResources = [];
        try {
          if (actionData.settings.socialLinks && actionData.settings.socialLinks !== "null") {
            socialLinks = JSON.parse(actionData.settings.socialLinks);
          }
        } catch (e) { }

        try {
          if (actionData.settings.selectedResources && actionData.settings.selectedResources !== "null") {
            selectedResources = JSON.parse(actionData.settings.selectedResources);
          }
        } catch (e) { }

        setFormState({
          ...actionData.settings,
          socialLinks,
          selectedResources,
          countdownDate: actionData.settings.countdownDate || get7DaysAheadDate(),
          logoUrl: actionData.settings.logoUrl || "",
          showHeader: actionData.settings.showHeader || false,
          videoUrl: actionData.settings.videoUrl || "",
          newsletterProvider: actionData.settings.newsletterProvider || "NONE",
          newsletterApiKey: actionData.settings.newsletterApiKey || "",
          newsletterListId: actionData.settings.newsletterListId || "",
          newsletterMailchimpDc: actionData.settings.newsletterMailchimpDc || "",
          bypassPassword: actionData.settings.bypassPassword || "",
          customCss: actionData.settings.customCss || "",
          customFont: actionData.settings.customFont || "Inter",
        });
      } else {
        shopify.toast.show("Configuration updated successfully!");
        setIsDirty(false);
      }
    }
  }, [actionData, shopify]);

  // Social functions handled in modular component

  const handleSave = () => {
    const dataToSubmit = {
      ...formState,
      socialLinks: JSON.stringify(formState.socialLinks),
      selectedResources: JSON.stringify(formState.selectedResources),
    };
    submit(dataToSubmit, { method: "POST" });
  };

  const handleDiscard = () => {
    setFormState({
      ...initialSettings,
      socialLinks: JSON.parse(initialSettings.socialLinks || "{}"),
      selectedResources: JSON.parse(initialSettings.selectedResources || "[]"),
      countdownDate: initialSettings.countdownDate || get7DaysAheadDate(),
      logoUrl: initialSettings.logoUrl || "",
      showHeader: initialSettings.showHeader || false,
      videoUrl: initialSettings.videoUrl || "",
      newsletterProvider: initialSettings.newsletterProvider || "NONE",
      newsletterApiKey: initialSettings.newsletterApiKey || "",
      newsletterListId: initialSettings.newsletterListId || "",
      newsletterMailchimpDc: initialSettings.newsletterMailchimpDc || "",
      bypassPassword: initialSettings.bypassPassword || "",
      customCss: initialSettings.customCss || "",
      customFont: initialSettings.customFont || "Inter",
    });
    setIsDirty(false);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all settings to defaults? This cannot be undone.")) {
      submit({ intent: "RESET_DEFAULTS" }, { method: "POST" });
    }
  };

  const openResourcePicker = () => {
    setIsPickerOpen(true);
  };

  const handlePageSelection = (selectedIds) => {
    const selectedObjects = resolvedPagesRef.current
      .filter(p => selectedIds.includes(p.id))
      .map(p => ({ id: p.id, title: p.title }));

    setFormState({ ...formState, selectedResources: selectedObjects });
  };

  const handleProductSelection = (selectedIds) => {
    const selectedObjects = resolvedProductsRef.current
      .filter(p => selectedIds.includes(p.id))
      .map(p => ({ id: p.id, title: p.title }));

    setFormState({ ...formState, selectedResources: selectedObjects });
  };

  const freeTemplates = ["template_1", "template_4", "template_6", "template_10", "template_15"];

  const templates = [
    { id: "template_1", img: "/templates/1.png" },
    { id: "template_2", img: "/templates/2.png" },
    { id: "template_3", img: "/templates/3.png" },
    { id: "template_4", img: "/templates/4.png" },
    { id: "template_5", img: "/templates/5.png" },
    { id: "template_6", img: "/templates/6.png" },
    { id: "template_7", img: "/templates/7.png" },
    { id: "template_8", img: "/templates/8.png" },
    { id: "template_9", img: "/templates/9.png" },
    { id: "template_10", img: "/templates/10.png" },
    { id: "template_11", img: "/templates/11.png" },
    { id: "template_12", img: "/templates/12.png" },
    { id: "template_13", img: "/templates/13.png" },
    { id: "template_14", img: "/templates/14.png" },
    { id: "template_15", img: "/templates/15.png" },
    { id: "template_16", img: "/templates/16.png" },
    { id: "template_17", img: "/templates/17.png" },
    { id: "template_18", img: "/templates/18.png" },
    { id: "template_19", img: "/templates/19.png" },
    { id: "template_20", img: "/templates/20.png" },
    { id: "template_21", img: "/templates/21.png" },
    { id: "template_22", img: "/templates/22.png" },
    { id: "template_23", img: "/templates/23.png" },
    { id: "template_24", img: "/templates/24.png" },
    { id: "template_25", img: "/templates/25.png" },
    { id: "template_26", img: "/templates/26.png" },
    { id: "template_27", img: "/templates/27.png" },
    { id: "template_28", img: "/templates/28.png" },
    { id: "template_29", img: "/templates/29.png" },
    { id: "template_30", img: "/templates/30.png" },
    { id: "template_31", img: "/templates/31.png" },
    { id: "template_32", img: "/templates/32.png" },
  ].map((t) => ({
    ...t,
    name: t.id.split('_')[1],
    isPro: !isPro && !freeTemplates.includes(t.id)
  }));

  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = useCallback((selectedTabIndex) => setSelectedTab(selectedTabIndex), []);

  const tabs = [
    { id: "coming-soon", content: "Coming Soon", accessibilityLabel: "Coming Soon Settings", panelID: "coming-soon-panel" },
    { id: "settings", content: "Settings", accessibilityLabel: "General Settings", panelID: "settings-panel" },
    { id: "social", content: "Social Icons", accessibilityLabel: "Social Icon Settings", panelID: "social-panel" },
    { id: "newsletter", content: "Integrations", accessibilityLabel: "Integration Settings", panelID: "newsletter-panel" },
  ];

  return (
    <Frame>
      {isDirty && (
        <ContextualSaveBar
          message="Unsaved changes"
          saveAction={{
            label: "Save Settings",
            onAction: handleSave,
            loading: isSaving,
          }}
          discardAction={{
            label: "Discard",
            onAction: handleDiscard,
          }}
        />
      )}
      <Page fullWidth>
        <TitleBar title="Frank Coming Soon Pro">
          <button onClick={() => window.open(`https://${shop}`, '_blank')}>
            Live Store Preview
          </button>
          <button onClick={handleReset} disabled={isSaving}>
            Reset Defaults
          </button>
        </TitleBar>

        {!isPro && (
          <Box paddingBlockEnd="400">
            <CalloutCard
              title="Unlock All Premium Features - Start Your 15-Day Free Trial"
              illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customize-20-8cc26e8386a34ef26284646b08e235a9fba75dce1a2e737c374ca021469e71f4.svg"
              primaryAction={{
                content: 'Start 15-Day Free Trial',
                url: '/app/upgrade',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p>Upgrade to Pro and get 30+ premium templates, full newsletter sync (Klaviyo, Mailchimp), subscriber exports, and theme navigation menus.</p>
                <InlineStack gap="200">
                  <Badge tone="info">30+ Templates</Badge>
                  <Badge tone="info">Newsletter API</Badge>
                  <Badge tone="info">CSV Exports</Badge>
                  <Badge tone="info">Header Nav</Badge>
                  <Badge tone="success">15-Day Free Trial</Badge>
                </InlineStack>
              </div>
            </CalloutCard>
          </Box>
        )}

        <div style={{ paddingBottom: "1.5rem" }}>
          <Suspense fallback={
            <Box paddingBlockEnd="400">
              <Card>
                <BlockStack gap="200">
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText lines={2} />
                </BlockStack>
              </Card>
            </Box>
          }>
            <Await resolve={appEmbedData}>
              {({ appEmbedEnabled, themeId }) => (
                !appEmbedEnabled ? (
                  <Box paddingBlockEnd="400">
                    <Banner
                      title="App Embed is Disabled"
                      tone="warning"
                    >
                      <Box paddingBlockStart="200">
                        <BlockStack gap="200">
                          <p>The "Coming Soon" feature is currently disabled in your theme. You must enable it to show your maintenance page.</p>
                          <div style={{ display: 'flex' }}>
                            <a
                              href={`https://${shop}/admin/themes/${themeId}/editor?context=apps&activateAppId=${apiKey}/coming-soon`}
                              target="_top"
                              style={{
                                backgroundColor: '#000',
                                color: '#fff',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontSize: '13px',
                                fontWeight: '600'
                              }}
                            >
                              Enable in Theme Editor
                            </a>
                          </div>
                        </BlockStack>
                      </Box>
                    </Banner>
                  </Box>
                ) : (
                  <Box paddingBlockEnd="400">
                    <Banner title="App Embed is Active" tone="success">
                      <p>The "Coming Soon" App Embed is enabled. Your storefront is now being managed by the settings below.</p>
                    </Banner>
                  </Box>
                )
              )}
            </Await>
          </Suspense>
        </div>

        <InlineGrid columns={{ xs: 1, md: "1fr 1.5fr" }} gap="400">
          <BlockStack gap="400">
            <Card padding="0">
              <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange} />
            </Card>

            <Box>
              {selectedTab === 0 && (
                <BlockStack gap="400">
                  {/* --- Visibility Mode --- */}
                  <Card>
                    <BlockStack gap="400">
                      <InlineStack gap="200" align="start" blockAlign="center">
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, background: formState.mode === "LIVE" ? "var(--p-color-bg-fill-success-secondary, #e3f1df)" : formState.mode === "MAINTENANCE" ? "var(--p-color-bg-fill-warning-secondary, #fdf0d5)" : "var(--p-color-bg-fill-info-secondary, #e0f0ff)" }}>
                          <Icon source={ViewIcon} tone={formState.mode === "LIVE" ? "success" : formState.mode === "MAINTENANCE" ? "warning" : "info"} />
                        </div>
                        <BlockStack gap="0">
                          <InlineStack gap="200" blockAlign="center">
                            <Text as="h2" variant="headingSm">Visibility Mode</Text>
                            {formState.mode === "LIVE" && <Badge tone="success">Live</Badge>}
                            {formState.mode === "MAINTENANCE" && <Badge tone="warning">Maintenance</Badge>}
                            {formState.mode === "COMING_SOON" && <Badge tone="info">Coming Soon</Badge>}
                          </InlineStack>
                          <Text variant="bodySm" tone="subdued">Control your storefront visibility</Text>
                        </BlockStack>
                      </InlineStack>
                      <Divider />
                      <ChoiceList
                        choices={[
                          { label: "Live Storefront", value: "LIVE", helpText: "Your store is fully accessible to visitors" },
                          { label: "Maintenance Mode", value: "MAINTENANCE", helpText: "Show a maintenance page while you make changes" },
                          { label: "Coming Soon Mode", value: "COMING_SOON", helpText: "Display a countdown page before launch" },
                        ]}
                        selected={[formState.mode]}
                        onChange={(v) => setFormState({ ...formState, mode: v[0] })}
                      />
                    </BlockStack>
                  </Card>

                  {/* --- Scoping (Maintenance only) --- */}
                  {formState.mode === "MAINTENANCE" && (
                    <Card>
                      <BlockStack gap="400">
                        <InlineStack gap="200" align="start" blockAlign="center">
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, background: "var(--p-color-bg-fill-warning-secondary, #fdf0d5)" }}>
                            <Icon source={LayoutBlockIcon} tone="warning" />
                          </div>
                          <BlockStack gap="0">
                            <Text as="h2" variant="headingSm">Page Scope</Text>
                            <Text variant="bodySm" tone="subdued">Choose which pages show maintenance mode</Text>
                          </BlockStack>
                        </InlineStack>
                        <Divider />
                        <ChoiceList
                          choices={[
                            { label: "Entire Store", value: "ALL", helpText: "All pages will show the maintenance screen" },
                            { label: "Specific Pages", value: "PAGES", helpText: "Select specific pages to be affected" },
                            { label: "Specific Products", value: "PRODUCTS", helpText: "Select specific products to be affected" },
                          ]}
                          selected={[formState.maintenanceScope]}
                          onChange={(v) => {
                            setFormState({ ...formState, maintenanceScope: v[0] });
                            if (v[0] !== "ALL") openResourcePicker();
                          }}
                        />
                        {formState.maintenanceScope !== "ALL" && (
                          <Box paddingBlockStart="200" paddingBlockEnd="100">
                            <BlockStack gap="300">
                              <InlineStack align="space-between" blockAlign="center">
                                <Text variant="bodySm" fontWeight="semibold">Selected Items</Text>
                                <Button variant="plain" onClick={openResourcePicker} size="slim">Change Selection</Button>
                              </InlineStack>
                              {formState.selectedResources.length > 0 ? (
                                <InlineStack gap="200" wrap>
                                  {formState.selectedResources.map(res => (
                                    <div key={res.id} style={{
                                      background: "var(--p-color-bg-surface-secondary, #f6f6f7)",
                                      padding: "5px 14px",
                                      borderRadius: "16px",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                      color: "var(--p-color-text, #202223)",
                                      border: "1px solid var(--p-color-border, #e1e3e5)"
                                    }}>
                                      {res.title || res.id.split('/').pop()}
                                    </div>
                                  ))}
                                </InlineStack>
                              ) : (
                                <Banner tone="warning">
                                  <p>No {formState.maintenanceScope === "PAGES" ? "pages" : "products"} selected — maintenance mode won't apply to any specific {formState.maintenanceScope === "PAGES" ? "pages" : "products"}.</p>
                                </Banner>
                              )}
                            </BlockStack>
                          </Box>
                        )}
                      </BlockStack>
                    </Card>
                  )}

                  {/* --- Template Selector --- */}
                  {formState.mode !== "LIVE" && (
                    <Card>
                      <BlockStack gap="400">
                        <InlineStack gap="200" align="start" blockAlign="center">
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, background: "var(--p-color-bg-fill-info-secondary, #e0f0ff)" }}>
                            <Icon source={PaintBrushFlatIcon} tone="info" />
                          </div>
                          <BlockStack gap="0">
                            <InlineStack gap="200" blockAlign="center">
                              <Text as="h2" variant="headingSm">Template Design</Text>
                              <Badge>{templates.length} templates</Badge>
                            </InlineStack>
                            <Text variant="bodySm" tone="subdued">
                              {isPro 
                                ? "Choose a design for your page." 
                                : "Choose a design for your page. Templates 1, 4, 6, 10, and 15 (FREE)"}
                            </Text>
                          </BlockStack>
                        </InlineStack>
                        <Divider />
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: "10px",
                        }}>
                          {templates.map((t) => {
                            const isSelected = formState.templateId === t.id;
                            return (
                              <div
                                key={t.id}
                                onClick={() => {
                                  if (t.isPro && !isPro) {
                                    setIsUpgradeModalActive(true);
                                  } else {
                                    setFormState({ ...formState, templateId: t.id });
                                  }
                                }}
                                style={{
                                  cursor: "pointer",
                                  borderRadius: "12px",
                                  border: isSelected ? "2.5px solid var(--p-color-bg-fill-brand, #005bd3)" : "2px solid var(--p-color-border, #e1e3e5)",
                                  padding: "4px",
                                  background: isSelected ? "var(--p-color-bg-surface-active, #f1f1f1)" : "var(--p-color-bg-surface, #fff)",
                                  transition: "all 0.15s ease",
                                  position: "relative",
                                }}
                              >
                                {/* Selected Checkmark */}
                                {isSelected && (
                                  <div style={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    width: 22,
                                    height: 22,
                                    borderRadius: "50%",
                                    background: "var(--p-color-bg-fill-brand, #005bd3)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    zIndex: 2,
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                  }}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                )}
                                {t.isPro && (
                                  <div style={{
                                    position: "absolute",
                                    top: 8,
                                    left: 8,
                                    zIndex: 2,
                                  }}>
                                    <Badge tone="attention">PRO</Badge>
                                  </div>
                                )}
                                <div style={{
                                  width: "100%",
                                  height: "110px",
                                  borderRadius: "8px",
                                  overflow: "hidden",
                                  position: "relative",
                                }}>
                                  <img
                                    src={t.img}
                                    alt={`Template ${t.name}`}
                                    loading="lazy"
                                    decoding="async"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      display: "block",
                                      opacity: isSelected ? 1 : 0.85,
                                      transition: "opacity 0.15s ease",
                                    }}
                                  />
                                  {/* Hover overlay - subtle darkening for non-selected */}
                                  {!isSelected && (
                                    <div style={{
                                      position: "absolute",
                                      inset: 0,
                                      background: "rgba(0,0,0,0.03)",
                                      transition: "background 0.15s ease",
                                    }} />
                                  )}
                                </div>
                                <div style={{
                                  marginTop: "5px",
                                  textAlign: "center",
                                  paddingBottom: "3px",
                                }}>
                                  <Text variant="bodySm" fontWeight={isSelected ? "bold" : "medium"}>
                                    {isSelected ? `✓ Template ${t.name}` : t.name}
                                  </Text>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </BlockStack>
                    </Card>
                  )}

                  {/* Custom Design Callout Removed */}
                </BlockStack>
              )}

              {selectedTab === 1 && (
                <BlockStack gap="400">
                  {/* --- Media / Branding Section --- */}
                  <BrandingSection
                    formState={formState}
                    setFormState={setFormState}
                    allImages={allImages}
                    allVideos={allVideos}
                  />

                  <ContentSection
                    formState={formState}
                    setFormState={setFormState}
                    isPro={isPro}
                    onUpgrade={() => setIsUpgradeModalActive(true)}
                    shop={shop}
                  />
                </BlockStack>
              )}

              {selectedTab === 2 && (
                <BlockStack gap="400">
                  <SocialLinksSection
                    formState={formState}
                    setFormState={setFormState}
                    socialPopoverActive={socialPopoverActive}
                    setSocialPopoverActive={setSocialPopoverActive}
                  />
                </BlockStack>
              )}

              {selectedTab === 3 && (
                <BlockStack gap="400">
                  <NewsletterSection
                    formState={formState}
                    setFormState={setFormState}
                    isPro={isPro}
                    onUpgrade={() => setIsUpgradeModalActive(true)}
                  />
                </BlockStack>
              )}
            </Box>
          </BlockStack>

          <div className={styles.stickyPreview} style={{ position: 'sticky', top: '20px', alignSelf: 'start' }}>
            <div
              className={styles.previewContainer}
              style={{
                border: "12px solid #ffffff",
                boxShadow: "0 50px 100px -20px rgba(0,0,0,0.5), 0 30px 60px -30px rgba(0,0,0,0.3)",
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#000",
                aspectRatio: "16/9"
              }}
            >
              <TemplateViewer settings={formState} />
            </div>
            <Box padding="400">
              <Text variant="bodySm" tone="subdued" alignment="center">Live Interactive Preview</Text>
            </Box>
          </div>
        </InlineGrid>

        <Modal
          open={isPickerOpen}
          onClose={() => setIsPickerOpen(false)}
          title={formState.maintenanceScope === "PAGES" ? "Select Pages" : "Select Products"}
          primaryAction={{
            content: "Done",
            onAction: () => setIsPickerOpen(false),
          }}
        >
          <Modal.Section>
            <Suspense fallback={<SkeletonBodyText lines={5} />}>
              <Await resolve={formState.maintenanceScope === "PAGES" ? allPages : allProducts}>
                {(items) => {
                  if (formState.maintenanceScope === "PAGES") {
                    resolvedPagesRef.current = items;
                  } else {
                    resolvedProductsRef.current = items;
                  }
                  return (
                    <ResourceList
                      resourceName={formState.maintenanceScope === "PAGES" ? { singular: "page", plural: "pages" } : { singular: "product", plural: "products" }}
                      items={items}
                      selectedItems={formState.selectedResources.map(r => r.id)}
                      onSelectionChange={formState.maintenanceScope === "PAGES" ? handlePageSelection : handleProductSelection}
                      selectable
                      renderItem={(item) => {
                        const { id, title, handle } = item;
                        return (
                          <ResourceItem id={id} accessibilityLabel={`Select ${title}`}>
                            <Text variant="bodyMd" fontWeight="bold" as="h3">
                              {title}
                            </Text>
                            <Text variant="bodySm" tone="subdued">
                              {handle}
                            </Text>
                          </ResourceItem>
                        );
                      }}
                    />
                  );
                }}
              </Await>
            </Suspense>
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
    </Frame>
  );
}
