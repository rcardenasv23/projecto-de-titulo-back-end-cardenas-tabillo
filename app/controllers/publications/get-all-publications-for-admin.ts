const publicationsForAdmin = (publicationsForAdmin: Function) => {
  return async function get(httpRequest: any) {
    try {
      const filters = httpRequest.query
      const got = await publicationsForAdmin(filters)
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

export default publicationsForAdmin
