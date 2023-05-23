const bcrypt = require("bcrypt")
const salt = 10

const hashings = () => {
    return Object.freeze({
        encryptString,
        compareString,
    })

    async function encryptString(target:String):Promise<String>{
        const saltGenerated = await bcrypt.genSalt(salt);
        return await bcrypt.hash(target,saltGenerated)
    }

    async function compareString(target:String, original:String):Promise<Boolean>{
        const equals = await bcrypt.compare(target, original)
        return equals
    }

}

export default hashings