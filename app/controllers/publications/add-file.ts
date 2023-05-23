const addPublicationFile = (addFile: Function) => {
  return async function get(httpRequest: any) {
    try {
      const { id_fixed, files } = httpRequest.body
      const got = await addFile(files, { id_fixed: id_fixed })
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: got,
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

export default addPublicationFile
