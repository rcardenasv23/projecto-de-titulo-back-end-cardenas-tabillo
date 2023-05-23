const patchPublication = () => {
  return function create(info: Object) {
    console.log(info)
    const {
      id_fixed,
      title,
      description,
      category,
      product_state,
      unity,
      dimentions,
      weight,
      price,
      current_stock,
    } = Object.values(info)[0]

    if (!id_fixed) {
      throw new Error('Please enter seller id_fixed.')
    }
    if (!title) {
      throw new Error('Please enter seller title.')
    }
    if (!description) {
      throw new Error('Please enter seller description.')
    }
    if (!category) {
      throw new Error('Please enter seller category.')
    }
    if (!product_state) {
      throw new Error('Please enter seller product_state.')
    }
    if (!unity) {
      throw new Error('Please enter seller unity.')
    }
    if (!dimentions) {
      throw new Error('Please enter seller dimentions.')
    }
    if (!weight) {
      throw new Error('Please enter seller weight.')
    }
    if (price === null || price === undefined || price < 0) {
      throw new Error('Please enter seller price.')
    }
    if (!current_stock) {
      throw new Error('Please enter seller stock.')
    }

    return Object.freeze({
      getIdFixed: () => id_fixed,
      getTitle: () => title,
      getDescription: () => description,
      getCategory: () => category,
      getProduct_state: () => product_state,
      getUnity: () => unity,
      getDimentions: () => dimentions,
      getWeight: () => weight,
      getPrice: () => price,
      getCurrentStock: () => current_stock,
    })
  }
}

export default patchPublication
