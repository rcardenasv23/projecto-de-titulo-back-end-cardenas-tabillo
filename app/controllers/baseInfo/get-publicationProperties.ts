const getPublicactionAttributes = (getProductStates: Function) => {
  return async function get() {
    try {
      const productStates = await getProductStates()
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { ...productStates },
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

export default getPublicactionAttributes
