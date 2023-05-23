const updatePublication = (updatePublicationInfo: Function) => {
  return async function put(httpRequest: any) {
    try {
      const values = httpRequest.body
      const put = await updatePublicationInfo(values)
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

export default updatePublication
