import { json } from "@remix-run/server-runtime";
import db from "../db.server";

export const action = async ({ request }) => {
  const header = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: header });
  }

  const formData = await request.formData();
  const email = formData.get("email");
  const shop = formData.get("shop");

  if (!email || !shop) {
    return json({ error: "Email and Shop are required" }, { status: 400, headers: header });
  }

  try {
    // 1. Save locally first
    await db.subscriber.create({
      data: { email, shop },
    });

    // 2. Fetch newsletter settings
    const settings = await db.settings.findUnique({
      where: { shop },
    });


    if (settings && settings.newsletterProvider !== "NONE" && settings.newsletterApiKey) {
      const { newsletterProvider, newsletterApiKey, newsletterListId, newsletterMailchimpDc } = settings;

      // 3. Sync to external provider asynchronously (don't block the main thread too much)
      try {
        if (newsletterProvider === "KLAVIYO" && newsletterListId) {
          const response = await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
            method: "POST",
            headers: {
              "Authorization": `Klaviyo-API-Key ${newsletterApiKey}`,
              "accept": "application/json",
              "content-type": "application/json",
              "revision": "2024-10-15"
            },
            body: JSON.stringify({
              data: {
                type: "profile-subscription-bulk-create-job",
                attributes: {
                  profiles: {
                    data: [
                      {
                        type: "profile",
                        attributes: {
                          email: email,
                          subscriptions: {
                            email: {
                              marketing: {
                                consent: "SUBSCRIBED"
                              }
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                relationships: {
                  list: {
                    data: {
                      type: "list",
                      id: newsletterListId
                    }
                  }
                }
              }
            }),
          });
        } else if (newsletterProvider === "MAILCHIMP" && newsletterListId) {
          const dc = newsletterMailchimpDc || newsletterApiKey.split("-")[1] || "us1";
          const response = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${newsletterListId}/members`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `apikey ${newsletterApiKey}`,
            },
            body: JSON.stringify({ email_address: email, status: "subscribed" }),
          });
        } else if (newsletterProvider === "OMNISEND") {
          const response = await fetch("https://api.omnisend.com/v3/contacts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": newsletterApiKey,
            },
            body: JSON.stringify({
              identifiers: [{
                type: "email",
                id: email,
                channels: {
                  email: {
                    status: "subscribed",
                    statusDate: new Date().toISOString()
                  }
                }
              }]
            }),
          });
        }
      } catch (apiError) {
        console.error("External Newsletter API Error:", apiError);
      }
    }

    return json({ success: true, message: "Subscribed successfully!" }, { headers: header });
  } catch (error) {
    console.error("Subscription Error:", error);
    return json({ error: "Failed to subscribe" }, { status: 500, headers: header });
  }
};
