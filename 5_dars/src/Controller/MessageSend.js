const fetch = require("node-fetch")
const FormData = require("form-data")

async function login() {
    try {
        const formData = new FormData()

        let email = "test@eskiz.uz"
        let password = "j6DWtQjjpLDNjWEk74Sx"

        formData.append("email", email)
        formData.append("password", password)

        const response = await fetch("https://notify.eskiz.uz/api/auth/login", {
            method: "POST",
            body: formData,
        })

        let data = await response.json()

        if(response.status >= 200 && response.status < 300) {
            let token = await data.data.token
            return token 
        } else {
            return false
        }

    } catch(e) {
        console.log(e)
        return false
    }
}

async function sms(phone_number, message) {
    try {
        let token = await login()

        let formData = new FormData()

        formData.append("mobile_phone", phone_number)
        formData.append("message", message)
        formData.append("from", 4546)

        const response = await fetch("https://notify.eskiz.uz/api/message/sms/send", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        data = await response.json()

        if(response.status >= 200 && response.status < 300) {
           return true 
        } else {
            return false
        }


    } catch(e) {
        console.log(e)
    }
}

module.exports = sms
