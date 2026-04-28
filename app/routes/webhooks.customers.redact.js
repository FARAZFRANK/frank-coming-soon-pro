import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }) => {
  const { shop, payload, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} for ${shop}`);

  const customerEmail = payload.customer?.email;

  if (customerEmail) {
    // Delete subscriber if found
    await db.subscriber.deleteMany({
      where: {
        shop: shop,
        email: customerEmail,
      },
    });
    console.log(`Redacted data for customer ${customerEmail} in shop ${shop}`);
  }

  return new Response();
};
