const users = require("../Model/UserModel")
const sms = require("./MessageSend")
const { reqCity, reqPhone } = require("./Texts")

module.exports = async function (message, bot, user) {
    const userId = message.from.id
    const text = message.text

    try {
        if(!user) {
            let newUser = await users.create({
                user_id: userId,
                step: 1,
            })
            
            await bot.sendMessage(userId, 
                `Assalomu alaykum, muloqot tilini tanlang`
            ) 
            
            let langs_key = {
                resize_keyboard: true,
                keyboard: [
                    [
                        {
                            text: "🇺🇿 O'zbekcha",
                        },
                    ],
                    [
                        {
                            text: "🇷🇺 Ruscha",
                        },
                    ],
                    [
                        {
                            text: "🇬🇧 Inglizcha",
                        },
                    ],
                    
                ],
            }

            await bot.sendMessage(userId, 
                `🇬🇧 Tilni tanlang \n\n🇷🇺 Tilni tanlang \n\n🇬🇧 Tilni talang`,
                {
                    reply_markup: langs_key,
                }
            )
        } else if(user.step == 1) {
           
            if(text == "🇺🇿 O'zbekcha") {
                user = await users.findOneAndUpdate(
                {
                    user_id: userId,
                },
                {
                    step: 2,
                    lang: "uz",
                }
                )

                let data = reqCity("uz")
               
                let keyboard = []
                for(let i = 0; i < data.cities.length; i += 2) {
                    let newRow = [
                        {
                            text: data.cities[i],
                        }
                    ]
                    if(data.cities[i+1]) {
                        newRow.push({
                            text: data.cities[i+1]
                        })
                    }
                    keyboard.push(newRow)
                }
                console.log(keyboard)
                await bot.sendMessage(userId, data.text, {
                        reply_markup: {
                            resize_keyboard: true,
                            keyboard,
                        },
                    }
                )

            } else if(text == "🇷🇺 Ruscha") {
                user = await users.findOneAndUpdate(
                    {
                        user_id: userId,
                    },
                    {
                        lang: "ru",
                        step: 2,
                    }
                )

                let data = reqCity("ru")
                let citiesKey = []
                for(let i = 0; i < data.cities.length; i += 2) {
                    let newRow = [
                        {
                            text: data.cities[1],
                        }
                    ]
                    if(data.cities[i+1]) {
                        newRow.push({
                            text: data.cities[i+1]
                        })
                    }
                    citiesKey.push(newRow)
                }

                await bot.sendMessage(
                    userId,
                    data.text, 
                    {
                        reply_markup: {
                            resize_keyboard: true,
                            citiesKey,
                        },
                    }
                )

            } else if(text == "🇬🇧 Inglizcha") {
                user = await users.findOneAndUpdate(
                    {
                        user_id: userId,
                    },
                    {
                        lang: "eng",
                        step: 2,
                    }
                )
                let data = reqCity("eng")
                let citiesKey = []
                for(let i = 0; i < data.cities.length; i += 2) {
                    let newRow = [
                        {
                            text: data.cities[1],
                        }
                    ]
                    if(data.cities[i+1]) {
                        newRow.push({
                            text: data.cities[i+1]
                        })
                    }
                    citiesKey.push(newRow)
                }

                await bot.sendMessage(
                    userId,
                    data.text, 
                    {
                        reply_markup: {
                            resize_keyboard: true,
                            citiesKey,
                        },
                    }
                )  
            }

        } else if(user.step == 2) {

            await users.findOneAndUpdate(
                { 
                    user_id: userId 
                },
                { 
                    step: 3,
                    city: text,
                }
            )

            let msg = reqPhone(user.lang)

            await bot.sendMessage(userId, msg)
        } else if(user.step == 3) {
            let code = (""+ Math.random()).substring(2, 7)
            if(!Number(text) || !(Number(text) >= 9980000000) || !(Number(text) < 998999999999)) {
                let msg = reqPhone(user.lang)

                await bot.sendMessage(userId, msg)
                return
            }

            await sms(Number(text), `Registratsiya kodi ${code}`)

            await users.findOneAndUpdate(
                {
                    user_id: userId,
                },
                {
                    step: 4,
                    phone_number: Number(text),
                    code: code,
                }
            )

            let keyboard = {
                inline_keyboard: [
                    [
                        {
                            text: "Qayta kod so'rash",
                            callback_data: "code again"
                        }
                    ]
                ]
            } 
            await bot.sendMessage(userId, "Telefon raqamizngizga tasdiqlash kodi yuborildi", {
                reply_markup: keyboard,
            })
           


        } else if(user.step == 4) {
            if(text == user.code) {
                await users.findOneAndUpdate({
                    user_id: userId,
                }, {
                    step: 5,
                })
                await bot.sendMessage(userId, "Tabriklaymiz registratsiyadan muvaffaqqiyatli o'tdingiz")
            } else {
                await bot.sendMessage(userId, "Kod xato")
            }
        }

    } catch(e) {
        console.log(e) 
    } 
}