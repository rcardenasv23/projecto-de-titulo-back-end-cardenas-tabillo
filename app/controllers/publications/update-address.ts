const updateAddress = (updatePublicationAddress: Function) => {
  return async function put(httpRequest: any) {
    try {
      const { address } = httpRequest.body
      console.log(address, httpRequest.body)
      const put = await updatePublicationAddress(address)
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

export default updateAddress
