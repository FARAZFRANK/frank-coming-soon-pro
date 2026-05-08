import { redirect } from "@remix-run/server-runtime";
import { authenticate } from "../shopify.server";
import { MONTHLY_PLAN } from "../constants";

export const loader = async ({ request }) => {
  const { billing, admin } = await authenticate.admin(request);
  
  // Check if it's a development store
  const shopResponse = await admin.graphql(`{ shop { name plan { partnerDevelopment } } }`);
  const shopData = await shopResponse.json();
  const isDevStore = shopData.data?.shop?.plan?.partnerDevelopment || shopData.data?.shop?.name?.includes("dev");
  const isTest = isDevStore;

  try {
    const billingCheck = await billing.check({
      plans: [MONTHLY_PLAN],
      isTest,
    });

    if (billingCheck.hasActivePayment) {
      const subscriptionId = billingCheck.appSubscriptions[0].id;
      await billing.cancel({
        subscriptionId,
        isTest,
        prorate: true,
      });
      console.log("Subscription cancelled successfully:", subscriptionId);
    }
  } catch (error) {
    console.error("Downgrade failed:", error);
  }

  return redirect(`/app/pricing`);
};
