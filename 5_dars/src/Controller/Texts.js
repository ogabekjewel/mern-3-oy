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

    static MenuMsg(lang) {
        if(lang == "uz") {
            return {
                text: "Quyidagilardan birini tanlang",
                keyboard: {
                    order: "🛒 Buyurtma qilish",
                    orders: "🛍 Buyurtmalarim",
                    family: "👪 EVOS Oilasi",
                    comment: "✍️ Fikr bildirish",
                    settings: "⚙️ Sozlamalar",
                }
            }
        } else if(lang == "eng") {
            return {
                text: "Choose one of the following",
                keyboard: {
                    order: "🛒 To order",
                    orders: "🛍 My orders",
                    family: "👪 EVOS family",
                    comment: "✍️ Give feedback",
                    settings: "⚙️ Settings",
                }
            }
        } else if(lang == "ru") {
            return {
                text: "Выберите один из следующих",
                keyboard: {
                    order: "🛒 Заказать",
                    orders: "🛍 Мои заказы",
                    family: "👪 Cемья ЭВОС",
                    comment: "✍️ Дать обратную связь",
                    settings: "⚙️ Настройки",
                }
            }
        }
    }

    static CommentStart(lang) {
        if(lang == "uz") {
            return {
                text: "Fikr va mulohazalaringizni yuboring",
                btn: "⬅️ Ortga",
            }
        } else  if(lang == "ru") {
            return {
                text: "Присылайте свои мысли и отзывы",
                btn: "⬅️ Назад",
            }
        }else  if(lang == "eng") {
            return {
                text: "Leave your comments",
                btn: "⬅️ Back",
            }
        }
    }

    static CommentFinish(lang) {
        if(lang == "uz") {
            return "Fikr va mulohazalaringiz uchun rahmat"
        } else if(lang == "ru") {
            return "Спасибо за ваш отзыв и обратную связь"
        } else if(lang == "eng") {
            return "Thank you for your feedback and feedback"
        }
    }

    static SettingsMsg(user) {
        if(user.lang == "uz") {
            return {
                text: `<b>Muloqot tili:</b> 🇺🇿 O'zbekcha \n<b>Shaxar:</b>  ${user.city} \n<b>Telefon:</b> +${user.phone_number} \n\n Quyidagilardan birini tanlang`,
                keyboard: {
                    lang: "Muloqot tili",
                    city: "Shahar",
                    phone: "Telefon",
                }
            }
        } else if(user.lang == "ru") {
            return {
                text: `<b>Язык общения:</b> 🇷🇺 Pусский \n<b>Город:</b> ${user.city} \n<b>Телефон:</b> +${user.phone_number} \n\n Выберите один из следующих`,
                keyboard: {
                    lang: "Язык общения",
                    city: "Город",
                    phone: "Телефон",
                }
            }
        } else if(user.lang == "eng") {
            return {
                text: `<b>Communication language:</b> 🇬🇧 English \n<b>City:</b> ${user.city} \n<b>Phone:</b>  +${user.phone_number} \n\n Choose one of the following`,
                keyboard: {
                    lang: "Language",
                    city: "City",
                    phone: "Phone", 
                }
            }
        }
    }

    static ChangeLang(lang) {
        if(lang == "uz") {
            return "Muloqot tili o'zgardi"
        } else if(lang == "ru") {
            return "Изменился язык общения"
        } else if(lang == "eng") {
            return "The language of communication has changed"
        }
    }
    
    static Citylist(lang) {
        if(lang == "uz") {
            return {
                cities: ["Toshkent"]
            }
        } else if(lang == "ru") {
            return {
                cities: [              
                    "Ташкент",
                ]
            }
        } else if(lang == "eng") {
            return {
                cities: [              
                    "Tashkent",
                ]
            }
        }
    }

    static CityText(lang) {
        if(lang == "uz") {
            return "Shahar o'zgardi"
        } else if(lang == "ru") {
            return "Город изменился"
        } else if(lang == "eng") {
            return "The city has changed"
        }
    }

    static exchangePhone(lang) {
        if(lang == "uz") {
            return {
                text: "Telefon raqamingizni quyidagicha jo'nating +9989xxxxxxxx uz",
                btn: "⬅️ Ortga",
            }
        } else  if(lang == "ru") {
            return {
                text: "Отправьте свой номер телефона следующим образом +9989xxxxxxxx ru",
                btn: "⬅️ Назад",
            }
        } else  if(lang == "eng") {
            return {
                text: "Send your phone number as follows + 9989xxxxxxxx ru",
                btn: "⬅️ Back",
            }
        }       
    }

    static reqLocation(lang) {
        if(lang == "uz") {
            return {
                text: "Eltib berish uchun manzilni jo'nating",
                btns: {
                    back: "⬅️ Ortga",
                    location: "📍 Geo joylashuvni jo'natish",
                }
            }
        } else if(lang == "ru") {
            return {
                text: "Eltib berish uchun manzilni jo'nating",
                btns: {
                    back: "⬅️ Ortga",
                    location: "📍 Geo joylashuvni jo'natish",
                }
            }
        } else if(lang == "eng") {
            return {
                text: "Eltib berish uchun manzilni jo'nating",
                btns: {
                    back: "⬅️ Ortga",
                    location: "📍 Geo joylashuvni jo'natish",
                }
            }
        }
    }

    static verLocation(lang) {
        if(lang == "uz") {
            return {
                text: "Manzilni tasdiqlaaysizmi?",
                btns: {
                    yes: "✅ yes",
                    no: "❎ no"
                }
            }
        } else if(lang == "ru") {
            return {
                btns: {
                    text: "Manzilni tasdiqlaaysizmi?",
                    yes: "✅ yes",
                    no: "❎ no"
                }
            }
        } else if(lang == "eng") {
            return {
                btns: {
                    text: "Manzilni tasdiqlaaysizmi?",
                    yes: "✅ yes",
                    no: "❎ no"
                }
            }
        }
    }

    static startOrderMenu(lang) {
        if(lang == "uz") {
            return {
                text: "Quyidagilardan birini tanlang",
                keyboard: {
                    location: "📍 Manzilni o'zgartirish",
                    menu: "🍴 Menu",
                    orders: "🛍 Buyurtmalarim",
                    family: "👪 EVOS Oilasi",
                    comment: "✍️ Fikr bildirish",
                    settings: "⚙️ Sozlamalar",
                }
            }
        } else if(lang == "eng") {
            return {
                text: "Choose one of the following",
                keyboard: {
                    location: "📍 Manzilni o'zgartirish",
                    menu: "🍴 Menu",
                    orders: "🛍 My orders",
                    family: "👪 EVOS family",
                    comment: "✍️ Give feedback",
                    settings: "⚙️ Settings",
                }
            }
        } else if(lang == "ru") {
            return {
                text: "Выберите один из следующих",
                keyboard: {
                    location: "📍 Manzilni o'zgartirish",
                    menu: "🍴 Menu",
                    orders: "🛍 Мои заказы",
                    family: "👪 Cемья ЭВОС",
                    comment: "✍️ Дать обратную связь",
                    settings: "⚙️ Настройки",
                }
            }
        }
    }
} 