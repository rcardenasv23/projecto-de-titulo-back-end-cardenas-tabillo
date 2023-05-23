const updateCategory = (updateCategory: Function) => {
  return async function put(httpRequest: any) {
    try {
      const { id_pubc, publication_category } = httpRequest.body
      const put = await updateCategory(id_pubc, publication_category)
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

export default updateCategory
