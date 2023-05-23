const updateUnity = (attributes: any) => {
  return async function put(id_unity: string, publication_unity: string) {
    const { data: category, error } = await attributes.updateUnity(
      id_unity,
      publication_unity
    )
    if (error) {
      throw error
    }

    return {
      status: 200,
      msg: 'Updated unity successfully',
      data: category,
    }
  }
}

export default updateUnity
