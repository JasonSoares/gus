type JSONResponse = {
  data?: {
    slug?: string
    url?: string
  }
  errors?: Array<{ message: string }>
}

const API_SERVER = import.meta.env.VITE_API_URL

export async function createShortUrl(longUrl: string): Promise<JSONResponse> {
  const response = await fetch(`${API_SERVER}/links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      link: {
        url: longUrl,
      }
    })
  }).catch(() => {
    throw new Error('Failed to create short URL')
  })

  return response.json()
}

export async function createVisit(shortSlug: string) : Promise<JSONResponse> {
  const response = await fetch(`${API_SERVER}/links/${shortSlug}/visits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch(() => {
    throw new Error('Failed to create visit')
  })

  return response.json()
}
