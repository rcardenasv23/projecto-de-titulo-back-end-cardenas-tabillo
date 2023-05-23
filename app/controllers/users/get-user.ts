const jwtGet = (getUser: Function) => {
  return async function get(httpRequest: any) {
    try {
      const info = httpRequest.query
      const got = await getUser({
        ...info,
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

export default jwtGet
