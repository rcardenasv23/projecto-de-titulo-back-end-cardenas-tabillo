const makeSale = () => {
  return function update(info: Object) {
    const {
      user,
      sellers,
    }: {
      user: { email: string; id_user: string }
      sellers: any
    } = Object.values(info)[0]

    if (!user) {
      throw new Error('Please enter user.')
    } else {
      if (!user.email) {
        throw new Error('Please enter user email.')
      }
      if (!user.id_user) {
        throw new Error('Please enter user email.')
      }
    }
    if (!sellers || Object.keys(sellers).length === 0) {
      throw new Error('Please enter sellers ids.')
    } else {
      for (let seller of Object.keys(sellers)) {
        if (Object.keys(sellers[seller]).length === 0) {
          throw new Error('Please enter user buys.')
        }
      }
    }

    return Object.freeze({
      getSellerInfo: () => sellers,
      getUserInfo: () => user,
    })
  }
}

export default makeSale
