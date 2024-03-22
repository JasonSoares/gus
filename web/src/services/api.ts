type JSONResponse = {
  data?: {
    slug: string
    id: number
    url: string
  }
  errors?: Array<{ message: string }>
}

export async function createShortUrl(longUrl: string): Promise<JSONResponse> {
  const API_SERVER = import.meta.env.VITE_API_URL
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
