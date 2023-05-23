const insertFile = (addFile: Function) => {
  return async function post(httpRequest: any) {
    try {
      const { file, id_sale } = httpRequest.body
      const posted = await addFile(file, id_sale)
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

export default insertFile
