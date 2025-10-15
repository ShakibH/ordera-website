export async function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Sitemap: https://orderaconsulting.com/sitemap.xml",
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}



