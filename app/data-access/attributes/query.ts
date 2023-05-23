const queryAttributes = (conn: any, models: any) => {
  return Object.freeze({
    getCategories,
    getContentStates,
    getUnities,
    getProductStates,
    updateCategory,
    updateProductState,
    updateUnity,
    createCategory,
    createUnity,
    createProductState,
  })

  async function getCategories() {
    try {
      const Categorie = models.publication_category
      const categories = await Categorie.findAll({ raw: true })
      if (categories?.length <= 0) {
        throw new Error('Error while getting categories.')
      }
      return { data: categories, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }
  async function getContentStates() {
    try {
      const ContentState = models.content_state
      const contentStates = await ContentState.findAll({ raw: true })
      if (contentStates?.length <= 0) {
        throw new Error('Error while getting contentStates.')
      }
      return { data: contentStates, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }
  async function getUnities() {
    try {
      const Unity = models.publication_unity
      const unities = await Unity.findAll({ raw: true })
      if (unities?.length <= 0) {
        throw new Error('Error while getting unities.')
      }
      return { data: unities, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }
  async function getProductStates() {
    try {
      const PublicationProductState = models.publication_product_state
      const publicationProductStates = await PublicationProductState.findAll({
        raw: true,
      })
      if (publicationProductStates?.length <= 0) {
        throw new Error('Error while getting productStates.')
      }
      return { data: publicationProductStates, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function updateCategory(id_pubc: string, publication_category: string) {
    try {
      const Category = models.publication_category
      const category = await Category.findOne({
        where: { id_pubc: id_pubc },
        raw: true,
        nest: true,
      })
      const updatedCategory = await Category.update(
        { ...category, publication_category: publication_category },
        { where: { id_pubc: id_pubc }, raw: true, nest: true }
      )
      return { data: updatedCategory, error: null }
    } catch (e) {
      return { data: null, error: e }
    }
  }

  async function updateProductState(id_pubs: string, product_state: string) {
    try {
      const ProductState = models.publication_product_state
      const productState = await ProductState.findOne({
        where: { id_pubs: id_pubs },
        raw: true,
        nest: true,
      })
      const updatedProductState = await ProductState.update(
        { ...productState, product_state: product_state },
        { where: { id_pubs: id_pubs }, raw: true, nest: true }
      )
      return { data: updatedProductState, error: null }
    } catch (e) {
      return { data: null, error: e }
    }
  }

  async function updateUnity(id_unity: string, publication_unity: string) {
    try {
      const Unity = models.publication_unity
      const unity = await Unity.findOne({
        where: { id_unity: id_unity },
        raw: true,
        nest: true,
      })
      console.log(id_unity, publication_unity)
      const updatedUnity = await Unity.update(
        { ...unity, publication_unity: publication_unity },
        { where: { id_unity: id_unity }, raw: true, nest: true }
      )
      return { data: updatedUnity, error: null }
    } catch (e) {
      return { data: null, error: e }
    }
  }

  async function createCategory(publication_category: string) {
    try {
      const Category = models.publication_category
      const newCategory = await Category.create({
        publication_category: publication_category,
      })
      return { data: newCategory, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function createUnity(publication_unity: string) {
    try {
      const Unity = models.publication_unity
      const newUnity = await Unity.create({
        publication_unity: publication_unity,
      })
      return { data: newUnity, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }

  async function createProductState(product_state: string) {
    try {
      const ProductState = models.publication_product_state
      const newProductState = await ProductState.create({
        product_state: product_state,
      })
      return { data: newProductState, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }
}

export default queryAttributes
