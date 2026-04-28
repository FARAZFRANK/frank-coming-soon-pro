import { redirect } from "@remix-run/server-runtime";
import { authenticate } from "../shopify.server";
import { MONTHLY_PLAN } from "../constants";

export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);

  try {
    const billingCheck = await billing.check({
      plans: [MONTHLY_PLAN],
      isTest: true,
    });

    if (billingCheck.hasActivePayment) {
      const subscriptionId = billingCheck.appSubscriptions[0].id;
      await billing.cancel({
        subscriptionId,
        isTest: true,
        prorate: true,
      });
      console.log("Subscription cancelled successfully:", subscriptionId);
    }
  } catch (error) {
    console.error("Downgrade failed:", error);
  }

  const { session, admin } = await authenticate.admin(request);
  const shop = session.shop;
  const shopName = shop.replace(".myshopify.com", "");
  const appHandle = "coming-soon-maintenance-page";

  return redirect(`https://admin.shopify.com/store/${shopName}/apps/${appHandle}/app/pricing`);
};
