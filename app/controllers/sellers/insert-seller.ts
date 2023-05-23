const insert = (addSeller: Function) => {
  return async function post(httpRequest: any) {
    try {
      const info = httpRequest.body
      info['id_user'] = httpRequest.query.jwtData
      const posted = await addSeller({
        info,
      })
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

export default insert
