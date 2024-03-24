export interface Visit {
  url: string
}

export function isVisit(data: object): data is Visit {
  return data &&
    Object.prototype.hasOwnProperty.call(data, 'url')
}
