const getCommunesRegions = (getCountryInfo: Function) => {
  return async function get() {
    try {
      const countryInfo = await getCountryInfo()
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { ...countryInfo },
      }
    } catch (e: any) {
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          error: e.message,
        },
      }
    }
  }
}

export default getCommunesRegions
