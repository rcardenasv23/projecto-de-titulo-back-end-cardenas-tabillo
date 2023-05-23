const insertComment = (postComment: Function) => {
  return async function post(httpRequest: any) {
    try {
      const info = httpRequest.body
      const posted = await postComment(info)
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

export default insertComment
