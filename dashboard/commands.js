const Fs = require("fs/promises")

class commands {
    static async dep(name, count) {
        count = Number(count)
        let db = await Fs.readFile("./db.json", "utf-8")
        db = await JSON.parse(db)

        if(count < 0) {
            console.log("manfiy maxsulot qo'shib bo'lmaydi")
            return
        }

        let product = db.products.find((product) => product.name === name)

        if(!product) {
            let newProduct = {
                name: name,
                count: count,
            }
            db.products.push(newProduct)
            await Fs.writeFile("./db.json", JSON.stringify(db))
            console.log(`${name} maxsulotdan ${count} ta qo'shildi`)
            let index = db.products.findIndex(product => product.name === name.toLowerCase())
            console.table(db.products[index])

        } else {
            product.count = product.count + count
            await Fs.writeFile("./db.json", JSON.stringify(db))
            console.log(`${count} ta ${name} qo'shildi`)
            let index = db.products.findIndex(product => product.name === name.toLowerCase())
            console.table(db.products[index])
        }
    }
    static async sell(name, count) {
        count = Number(count)
        let db = await Fs.readFile("./db.json", "utf-8")
        db = await JSON.parse(db)
    
        let product = db.products.find((product) => product.name === name.toLowerCase())
        if(!product) {
            console.log(`${name} maxsuloti bazada mavjud emas`)
            return
        }
        if(count < 0) {
            console.log("manfiy maxsulot sotib bo'lmaydi")
            return
        }
        if(product.count - count < 0) {
            console.log(`Bazada ${count} ta maxsulot yo'q`)
            let index = db.products.findIndex(product => product.name === name.toLowerCase())
            console.table(db.products[index])
            return
        }
        product.count = product.count - count
        await Fs.writeFile("./db.json", JSON.stringify(db))
        let index = db.products.findIndex(product => product.name === name.toLowerCase())
        console.log(`${count} ta ${name} sotildi`)
        console.table(db.products[index])
        
    }
    static async dash() {
        let db = await Fs.readFile("./db.json", "utf-8")
        db = await JSON.parse(db)
        console.log("Bazadagi barcha maxsulotlar")
        console.table(db.products)
    }
}
module.exports = {
    dash: commands.dash,
    sell: commands.sell,
    dep: commands.dep
}