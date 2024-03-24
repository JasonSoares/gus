export function buildShortUrl(slug: string) {
  return `${window.location.origin}/${slug}`
}

export function alreadyShortUrl(url: string) {
  return url.startsWith(window.location.origin)
}
