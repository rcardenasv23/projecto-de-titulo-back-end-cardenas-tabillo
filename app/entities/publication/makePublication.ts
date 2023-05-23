const makePublicaction = (createAddress: Function, createFiles: Function) => {
  return function create(info: Object) {
    const {
      id_user,
      id_seller,
      address,
      files,
      title,
      description,
      category,
      product_state,
      unity,
      dimentions,
      weight,
      price,
      stock,
    } = Object.values(info)[0]

    if (!id_user) {
      throw new Error('Please enter seller id.')
    }
    if (!id_seller) {
      throw new Error('Please enter seller id.')
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
    if (!stock) {
      throw new Error('Please enter seller stock.')
    }
    if (!address) {
      throw new Error('Please enter seller address')
    } else {
      try {
        createAddress(address)
      } catch (e) {
        throw e
      }
    }
    if (!files) {
      throw new Error('Please up files for publication')
    } else {
      try {
        createFiles(files)
      } catch (e) {
        throw e
      }
    }

    return Object.freeze({
      getID: () => id_seller,
      getTitle: () => title,
      getDescription: () => description,
      getCategory: () => category,
      getProduct_state: () => product_state,
      getUnity: () => unity,
      getDimentions: () => dimentions,
      getWeight: () => weight,
      getPrice: () => price,
      getStock: () => stock,
      getAddress: () => address,
      getFiles: () => files,
    })
  }
}

export default makePublicaction
