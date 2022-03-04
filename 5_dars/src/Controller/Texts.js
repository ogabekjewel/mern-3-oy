module.exports = class Texts {
    static reqCity(lang) {
        if(lang == "uz") {
            return {
                text: "Shaxarni tanlang",
                cities: ["Toshkent"]
            }
        } else if(lang == "ru") {
            return {
                text: "Выберите город",
                cities: [              
                    "Ташкент",
                ]
            }
        } else if(lang == "eng") {
            return {
                text: "Select a city",
                cities: [              
                    "Tashkent",
                ]
            }
        }
    }

    static reqPhone(lang) {
        if(lang == "uz") {
            return "Telefon raqamingizni quyidagicha jo'nating +9989xxxxxxxx uz"
        } else if(lang == "ru") {
            return "Telefon raqamingizni quyidagicha jo'nating +9989xxxxxxxx ru"
        } else if(lang == "eng") {
            return "Telefon raqamingizni quyidagicha jo'nating +9989xxxxxxxx eng"
        }
    }
}