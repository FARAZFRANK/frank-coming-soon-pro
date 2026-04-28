import { redirect } from "@remix-run/server-runtime";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    return redirect("/app" + url.search);
  }
  return null;
};

export default function Index() {
  return null;
}
