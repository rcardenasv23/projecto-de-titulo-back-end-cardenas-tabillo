const deleteField = (deleteField: Function) => {
  return async function destroy(httpRequest: any) {
    try {
      const info = httpRequest.query
      const updated = await deleteField({
        info,
      })
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { updated },
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

export default deleteField
