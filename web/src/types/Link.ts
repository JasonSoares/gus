export interface Link {
  url: string
  slug: string
  visit_count: number
}

export function isLink(data: object): data is Link {
  return data &&
    Object.prototype.hasOwnProperty.call(data, 'slug') &&
    Object.prototype.hasOwnProperty.call(data, 'url') &&
    Object.prototype.hasOwnProperty.call(data, 'visit_count')
}
