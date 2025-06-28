import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    // Add the username parameter to the URL if it doesn't already have it
    const finalUrl = new URL(url)
    if (!finalUrl.searchParams.has('username') && process.env.GEONAMES_USERNAME) {
      finalUrl.searchParams.set('username', process.env.GEONAMES_USERNAME)
    }

    const response = await fetch(finalUrl.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    console.log(data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json({ error: 'Failed to fetch from external API' }, { status: 500 })
  }
}
