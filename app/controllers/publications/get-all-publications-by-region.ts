const regionPublications = (getPublicationsByRegion: Function) => {
  return async function get(httpRequest: any) {
    try {
      const { id_region } = httpRequest.query
      if (!id_region) {
        throw new Error('Id not found')
      }
      const got = await getPublicationsByRegion(id_region)
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: got,
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

export default regionPublications
