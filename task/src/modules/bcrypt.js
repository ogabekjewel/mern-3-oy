const Bcrypt = require("bcrypt")


module.exports.generateHash = async function (data) {
    let salt = await Bcrypt.genSalt(10)
    return Bcrypt.hash(data, salt)
}

module.exports.compareHash = async function (data, hash) {
    return await Bcrypt.compare(data, hash)
}