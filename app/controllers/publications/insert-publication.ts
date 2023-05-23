const insert = (postPublicaction: Function) => {
  return async function post(httpRequest: any) {
    try {
      const info = httpRequest.body
      info['id_user'] = httpRequest.query.jwtData.id_user
      const posted = await postPublicaction({
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
