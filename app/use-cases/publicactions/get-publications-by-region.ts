const getPublicationsByRegion = (publicationDB: any) => {
  return async function get(id_region: string) {
    const { data: res, error: err } = await publicationDB.getRegionPublications(
      id_region
    )
    if (res) {
      const msg = `Publications has been found.`
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

export default getPublicationsByRegion
