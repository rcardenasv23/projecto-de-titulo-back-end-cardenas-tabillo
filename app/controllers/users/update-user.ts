const update = (updateUser: Function) => {
  return async function put(httpRequest: any) {
    try {
      const info = httpRequest.body
      info['id_user'] = httpRequest.query.jwtData.id_user
      const updated = await updateUser({
        info,
      })
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { updated },
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

export default update
