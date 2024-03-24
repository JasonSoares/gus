import type { JSONResponse } from '../types/JSONResponse'

const API_SERVER = import.meta.env.VITE_API_URL

export async function createShortUrl(longUrl: string): Promise<JSONResponse> {
  try {
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
    })

    return response.json()
  } catch (error) {
    return Promise.reject('Failed to create short URL')
  }
}

export async function createVisit(shortSlug: string): Promise<JSONResponse> {
  try {
    const response = await fetch(`${API_SERVER}/links/${shortSlug}/visits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.json()
  } catch (error) {
    return Promise.reject('Failed to create visit')
  }
}

export async function getStats(): Promise<JSONResponse> {
  try {
    const response = await fetch(`${API_SERVER}/links`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.json()
  } catch (error) {
    return Promise.reject('Failed to get stats')
  }
}
