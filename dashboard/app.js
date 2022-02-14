const { dash, dep, sell } = require("./commands")

const [, , command, product, count] = process.argv

if(!command) {
    dash()
} else {
    if(command === "dep") {
        dep(product, count)
    }
    if(command === "sell") {
        sell(product, count)
    }
}