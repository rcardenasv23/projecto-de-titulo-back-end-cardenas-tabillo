const createCategory = (createCategory: Function) => {
  return async function post(httpRequest: any) {
    try {
      const { publication_category } = httpRequest.body
      const posted = await createCategory(publication_category)
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

export default createCategory
