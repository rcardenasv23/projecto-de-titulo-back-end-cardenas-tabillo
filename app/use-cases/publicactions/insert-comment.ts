const insertComment = (commentDB: any) => {
  return async function post({ id_user, id_fixed, comment }: any) {
    const { data: res, error: err } = await commentDB.createComment({
      id_user,
      id_fixed,
      comment,
    })
    if (res) {
      const msg = `Publication has been created.`
      return {
        status: 200,
        msg: msg,
        data: res,
      }
    } else {
      throw err
    }
  }
}

export default insertComment
