const getCategories = (getCategories: Function) => {
  return async function get() {
    try {
      const categories = await getCategories()
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { ...categories },
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

export default getCategories
