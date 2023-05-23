const updateUnity = (updateUnity: Function) => {
  return async function put(httpRequest: any) {
    try {
      const { id_unity, publication_unity } = httpRequest.body
      const put = await updateUnity(id_unity, publication_unity)
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: put,
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

export default updateUnity
