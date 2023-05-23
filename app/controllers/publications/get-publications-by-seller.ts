const sellerPublications = (getPublicationsBySeller: Function) => {
  return async function get(httpRequest: any) {
    try {
      const { id_seller } = httpRequest.query
      if (!id_seller) {
        throw new Error('Id not found')
      }
      const posted = await getPublicationsBySeller(id_seller)
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: posted,
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

export default sellerPublications
