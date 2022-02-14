const Axios = require("axios")
module.exports = async (req, res) => {
    const { q } = req.query
    
    let response = await Axios.get(`https://openweathermap.org/data/2.5/find?callback=jQuery19101128488685154474_1634660422582&q=${ q }&type=like&sort=population=30&appid=439d4b804bc8187953eb36d2a8c26a02&_=1634660422583`)

    let { data } = response
    
    data = data.split("(")[1].split(")")[0]

    data = JSON.parse(data)
    res.status(200).json({
        ok: true,
        ...data,
    })

}