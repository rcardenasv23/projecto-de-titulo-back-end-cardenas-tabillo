const createUnity = (createUnity: Function) => {
  return async function post(httpRequest: any) {
    try {
      const { publication_unity } = httpRequest.body
      const posted = await createUnity(publication_unity)
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

export default createUnity
