const communesAndRegions = (infoDb: any) => {
  return async function get() {
    const { data: communes, error: errCommmunes } = await infoDb.getCommunes()
    if (errCommmunes) {
      throw errCommmunes
    }
    const { data: regions, error: errRegions } = await infoDb.getRegions()
    if (errRegions) {
      throw errRegions
    }

    return {
      status: 200,
      msg: 'Country information got',
      data: { regions, communes },
    }
  }
}

export default communesAndRegions
