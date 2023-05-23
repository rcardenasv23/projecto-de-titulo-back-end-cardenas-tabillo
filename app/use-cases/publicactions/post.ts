const post = (publicationDB: any, makePublication: Function) => {
  return async function get(info: Object) {
    let data = makePublication(info)

    data = {
      id_seller: data.getID(),
      title: data.getTitle(),
      description: data.getDescription(),
      category: data.getCategory(),
      product_state: data.getProduct_state(),
      unity: data.getUnity(),
      dimentions: data.getDimentions(),
      weight: data.getWeight(),
      price: data.getPrice(),
      stock: data.getStock(),
      address: data.getAddress(),
      files: data.getFiles(),
    }

    const { data: res, error: err } = await publicationDB.post(data)
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

export default post
