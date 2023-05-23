const publication = (getPublication: Function) => {
  return async function get(httpRequest: any) {
    try {
      const { id_fixed } = httpRequest.query
      if (!id_fixed) {
        throw new Error('Id not found')
      }
      const got = await getPublication(id_fixed)
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

export default publication
