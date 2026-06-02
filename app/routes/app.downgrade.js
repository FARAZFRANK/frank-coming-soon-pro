import { redirect } from "@remix-run/server-runtime";
import { authenticate } from "../shopify.server";
import { MONTHLY_PLAN } from "../constants";

const handleDowngrade = async (request) => {
  const { billing, admin } = await authenticate.admin(request);
  
  // Check if it's a development store
  const shopResponse = await admin.graphql(`{ shop { name plan { partnerDevelopment } } }`);
  const shopData = await shopResponse.json();
  const isDevStore = shopData.data?.shop?.plan?.partnerDevelopment || shopData.data?.shop?.name?.includes("dev");
  const isTest = isDevStore;

  try {
    let billingCheck = await billing.check({
      plans: [MONTHLY_PLAN],
      isTest,
    });

    // Fallback: if isTest didn't match, try the other one just in case
    if (!billingCheck.hasActivePayment) {
      const fallbackCheck = await billing.check({
        plans: [MONTHLY_PLAN],
        isTest: !isTest,
      });
      if (fallbackCheck.hasActivePayment) {
        billingCheck = fallbackCheck;
      }
    }

    if (billingCheck.hasActivePayment && billingCheck.appSubscriptions?.length > 0) {
      const subscriptionId = billingCheck.appSubscriptions[0].id;
      await billing.cancel({
        subscriptionId,
        isTest: billingCheck.appSubscriptions[0].test, // Use the test status from the actual subscription
        prorate: true,
      });
      console.log("Subscription cancelled successfully:", subscriptionId);
    } else {
      console.log("No active subscription found to cancel during downgrade.");
    }
  } catch (error) {
    console.error("Downgrade failed:", error);
  }

  const url = new URL(request.url);
  return redirect(`/app/pricing${url.search}`);
};

export const loader = async ({ request }) => {
  return handleDowngrade(request);
};

export const action = async ({ request }) => {
  return handleDowngrade(request);
};
