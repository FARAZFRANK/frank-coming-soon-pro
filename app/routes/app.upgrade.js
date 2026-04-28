import { redirect } from "@remix-run/server-runtime";
import { authenticate } from "../shopify.server";
import { MONTHLY_PLAN } from "../constants";

export const loader = async ({ request }) => {
  const { billing, session, admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  
  const shop = session.shop;
  const shopName = shop.replace(".myshopify.com", "");
  const appHandle = "coming-soon-maintenance-page";

  // Check if it's a development store
  const shopResponse = await admin.graphql(`{ shop { name plan { partnerDevelopment } } }`);
  const shopData = await shopResponse.json();
  const isDevStore = shopData.data?.shop?.plan?.partnerDevelopment || shopData.data?.shop?.name?.includes("dev");

  const returnUrl = `https://admin.shopify.com/store/${shopName}/apps/${appHandle}/app/pricing`;

  try {
    await billing.require({
      plans: [MONTHLY_PLAN],
      onFailure: async () => {
        console.log("Billing failed, requesting plan:", MONTHLY_PLAN, "isTest:", isDevStore || true);
        return billing.request({
          plan: MONTHLY_PLAN,
          isTest: true, // Always true for development/testing
          returnUrl,
        });
      },
    });
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    console.error("Upgrade logic failed details:", error);
    return redirect(`/app?error=${encodeURIComponent(error.message || "Unknown error")}`);
  }

  return redirect(`https://admin.shopify.com/store/${shopName}/apps/${appHandle}/app/pricing`);
};
