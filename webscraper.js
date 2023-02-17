const axios = require('axios')
const cheerio = require('cheerio')
const require = require('fs')

axios.get('https://cdn.adimo.co/clients/Adimo/test/index.html')
    .then(function (response) {
        let $ = cheerio.load(response.data)
        let products = []
        let totalPrice = 0
        let totalItems = 0

        $('div.item').each(function (i, elem) {
            let product = {}
            product.title = $(this).find('h2').text()
            product.imageUrl = $(this).find('img').attr('src')
            product.price = parseFloat($(this).find('span.price').text().replace(/[^0-9.-]+/g, ""))
            product.discount = parseFloat($(this).find('span.discount').text().replace(/[^0-9.-]+/g, ""))

            products.push(product)
            totalItems++
            totalPrice += product.price

        })
    })