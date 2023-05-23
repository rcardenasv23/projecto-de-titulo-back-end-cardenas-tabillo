const updatePublicationInfo = (patchInfo: Function, publicationDB: any) => {
  return async function put(values: any) {
    let data = patchInfo(values)

    data = {
      id_fixed: data.getIdFixed(),
      title: data.getTitle(),
      description: data.getDescription(),
      category: data.getCategory(),
      product_state: data.getProduct_state(),
      unity: data.getUnity(),
      dimentions: data.getDimentions(),
      weight: data.getWeight(),
      price: data.getPrice(),
      current_stock: data.getCurrentStock(),
    }

    const { data: res, error: err } = await publicationDB.updatePublicationInfo(
      data
    )

    if (res) {
      const msg = `Publication has been found.`
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

export default updatePublicationInfo
