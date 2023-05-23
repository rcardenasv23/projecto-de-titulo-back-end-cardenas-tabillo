const updateUserAddress = (makeAddress: Function, userAddressDb: any) => {
  return async function put(info: Object) {
    let data = await makeAddress(info)

    data = {
      id_user: data.getID(),
      lat: data.getLat(),
      lng: data.getLng(),
      address: data.getAddress(),
      id_commune: data.getIdCommune(),
      id_region: data.getIdRegion(),
      description: data.getDescription(),
    }

    const { data: res, error: err } = await userAddressDb.updateAddress(data)

    if (res) {
      const msg = `User has been updated successfully.`
      return { status: 200, msg: msg, data: res }
    } else {
      throw new Error(err)
    }
  }
}

export default updateUserAddress
