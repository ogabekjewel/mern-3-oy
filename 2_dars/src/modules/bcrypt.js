const Bcrypt = require("bcrypt")

// passwordni hashlab beradi
module.exports.generateHash = async function (data) {
    let salt = await Bcrypt.genSalt(10)
    return Bcrypt.hash(data, salt)
}

// passwordni yechish imkonsiz Bcrypt faqat qayta kiritilgan passwordni ham hashlab oldingi hashlangan bilan solishtirib beradi 
module.exports.compareHash = async function (data, hash) {
    return await Bcrypt.compare(data, hash)
}