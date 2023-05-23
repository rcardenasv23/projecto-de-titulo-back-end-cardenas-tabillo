const getContentStates = (getContentStates: Function) => {
  return async function get() {
    try {
      const contentStates = await getContentStates()
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { ...contentStates },
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

export default getContentStates
