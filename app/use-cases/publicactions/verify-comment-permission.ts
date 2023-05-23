const verifyCommentPermission = (commentDb: any) => {
  return async function get(id_user: string, id_fixed: string) {
    const { data: res, error: err } = await commentDb.canComment(
      id_user,
      id_fixed
    )

    if (res) {
      const msg = `Permission has been found.`
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

export default verifyCommentPermission
