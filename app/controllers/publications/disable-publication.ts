const disablePublication = (disablePublication: Function) => {
  return async function put(httpRequest: any) {
    try {
      const { id_fixed } = httpRequest.body
      if (!id_fixed) {
        throw new Error('Id not found')
      }
      const got = await disablePublication(id_fixed)
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

export default disablePublication
