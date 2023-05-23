const queryCountryData = (conn: any, models: any) => {
  return Object.freeze({
    getCommune,
    getRegion,
    getCommunes,
    getRegions,
  })

  async function getCommunes() {
    try {
      const Commune = models.commune
      const communes = await Commune.findAll({ raw: true })
      if (communes?.length <= 0) {
        throw new Error('Error while getting communes.')
      }
      return { data: communes, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }
  async function getRegions() {
    try {
      const Region = models.region
      const regions = await Region.findAll({ raw: true })
      if (regions?.length <= 0) {
        throw new Error('Error while getting regions.')
      }
      return { data: regions, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }
  async function getCommune(id: string) {
    try {
      const Commune = models.commune
      const communes = await Commune.findOne({
        where: { id_commune: id },
        raw: true,
      })
      if (communes?.length <= 0) {
        throw new Error('Error while getting commune.')
      }
      return { data: communes, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }
  async function getRegion(id: string) {
    try {
      const Region = models.region
      const regions = await Region.findOne({
        where: { id_region: id },
        raw: true,
      })
      if (regions?.length <= 0) {
        throw new Error('Error while getting region.')
      }
      return { data: regions, error: null }
    } catch (e: any) {
      return { data: null, error: e }
    }
  }
}

export default queryCountryData
