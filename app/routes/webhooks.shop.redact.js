import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }) => {
  const { shop, payload, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} for ${shop}`);

  // Delete all data associated with this shop
  await Promise.all([
    db.settings.deleteMany({ where: { shop } }),
    db.subscriber.deleteMany({ where: { shop } }),
    db.session.deleteMany({ where: { shop } }),
  ]);

  console.log(`Successfully redacted all data for shop: ${shop}`);

  return new Response();
};
