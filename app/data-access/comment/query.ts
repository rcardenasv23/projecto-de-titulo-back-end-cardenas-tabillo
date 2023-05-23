const uuid = require('uuid')

const queryComment = (conn: any, models: any) => {
  return Object.freeze({
    getComments,
    createComment,
    canComment,
  })
  async function getComments(id_fixed: string) {
    try {
      const Comment = models.comment
      const User = models.user
      const comments = await Comment.findAll({
        where: { id_fixed: id_fixed },
        raw: true,
      })
      for (let comment of comments) {
        comment.user = await User.findOne({
          attributes: ['first_name', 'last_name'],
          where: { id_user: comment.id_user },
        })
      }
      return { data: comments, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function createComment(values: any) {
    try {
      console.log('dentro', values)
      const Comment = models.comment
      const comment = await Comment.create(
        { ...values, id_comment: uuid.v4() },
        {
          raw: true,
          nest: true,
        }
      )
      return { data: comment, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function canComment(id_user: string, id_fixed: string) {
    try {
      const Stock = models.stock
      const ContentState = models.content_state
      const Sale = models.sale
      const state = await ContentState.findOne({
        where: { content_state: 'completado' },
        raw: true,
        nest: true,
      })
      const sales = await Sale.findAll({
        attributes: ['id_sale'],
        where: { sale_state: state.id_state, id_user: id_user },
        raw: true,
        nest: true,
      })
      const stocks = await Stock.findAll({
        where: {
          id_fixed: id_fixed,
          id_sale: sales.map((id: any) => id.id_sale),
          stock_state: state.id_state,
        },
        raw: true,
        nest: true,
      })
      return { data: stocks.length > 0, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }
}

export default queryComment
