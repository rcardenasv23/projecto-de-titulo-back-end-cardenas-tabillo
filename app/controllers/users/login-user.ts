const login = (loginUser: Function) => {
  return async function get(httpRequest: any) {
    try {
      const info = httpRequest.query
      const got = await loginUser({
        info,
      })
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { ...got },
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

export default login
