export interface City {
  name: string
  region: string
  country: string
  value: string
  label: string
}

export const searchCities = async (query: string): Promise<City[]> => {
  if (query.length < 3) return []

  try {
    const response = await fetch(
      `https://api.geonames.org/searchJSON?q=${query}&maxRows=10&username=${process.env.NEXT_PUBLIC_GEONAMES_USERNAME}&style=FULL&featureClass=P`
    )
    const data = await response.json()

    return data.geonames.map((city) => ({
      name: city.name,
      region: city.adminName1,
      country: city.countryName,
      value: `${city.name}, ${city.countryName}`,
      label: `${city.name}, ${city.adminName1}, ${city.countryName}`,
    }))
  } catch (error) {
    console.error('Error fetching cities:', error)
    return []
  }
}
