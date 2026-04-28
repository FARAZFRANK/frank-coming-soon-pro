import { redirect } from "@remix-run/node";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  
  // If it's a weird URL like /& or empty, redirect to /app
  if (url.pathname === "/&" || url.pathname === "/") {
    return redirect("/app" + url.search);
  }

  // Otherwise, let it be a 404 or redirect to /app
  return redirect("/app" + url.search);
};
