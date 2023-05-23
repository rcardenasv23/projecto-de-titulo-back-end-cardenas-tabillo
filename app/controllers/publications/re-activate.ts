const reActivate = (reActivate: Function) => {
  return async function post(httpRequest: any) {
    try {
      const { id_fixed } = httpRequest.body
      if (!id_fixed) {
        throw new Error('Id not found')
      }
      const got = await reActivate(id_fixed)
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

export default reActivate
