const canComment = (getPermission: Function) => {
  return async function get(httpRequest: any) {
    try {
      const { id_user, id_fixed } = httpRequest.query
      const got = await getPermission(id_user, id_fixed)
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

export default canComment
