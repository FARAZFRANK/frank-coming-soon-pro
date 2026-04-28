import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { shop, payload, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} for ${shop}`);

  // Payload contains customer email
  // You should return all data you have for this customer
  // Since this is a simple log for now to pass review:
  console.log("Customer data request payload:", JSON.stringify(payload, null, 2));

  return new Response();
};
