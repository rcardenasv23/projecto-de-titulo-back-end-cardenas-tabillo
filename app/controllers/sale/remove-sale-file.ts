const removeFile = (removeFile: Function) => {
  return async function destroy(httpRequest: any) {
    try {
      const { id_file } = httpRequest.query
      console.log(id_file)
      if (!id_file) {
        throw 'Error: No file id'
      }
      const posted = await removeFile(id_file)
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

export default removeFile
