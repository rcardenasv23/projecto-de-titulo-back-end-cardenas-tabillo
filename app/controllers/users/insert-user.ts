const insert = (addUsers: Function) => {
  return async function post(httpRequest: any) {
    try {
      const info = httpRequest.body
      const posted = await addUsers({
        info,
      })
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: { posted },
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

export default insert
