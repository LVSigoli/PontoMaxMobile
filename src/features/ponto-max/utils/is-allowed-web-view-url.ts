export function isAllowedWebViewUrl(url: string) {
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url === "about:blank"
  );
}
