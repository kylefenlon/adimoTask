const axios = require('axios')
const cheerio = require('cheerio')
const require = require('fs')

axios.get('https://cdn.adimo.co/clients/Adimo/test/index.html')
    .then(function (response) {
        let $ = cheerio.load(response.data)
        let products = []
        let totalPrice = 0
        let totalItems = 0
        let discount = 0

        $('div.item').each(function (i, elem) {
            let product = {}
            product.title = $(elem).find('h1').text()
            product.imageUrl = $(elem).find('img').attr('src')
            product.price = parseFloat($(elem).find('span.price').text().replace(/[^0-9.-]+/g, ""))
            product.oldPrice = parseFloat($(elem).find('span.oldPrice').text().replace(/[^0-9.-]+/g, ""))

            products.push(product)
            totalItems++
            totalPrice += product.price
            discount = oldPrice - price;
        })


        let averagePrice = totalPrice / totalItems
        let output = {
            products: products,
            totalItems: totalItems,
            averagePrice: averagePrice,
            discount: discount
        }

        fs.writeFile('output.json', JSON.stringify(output, null, 2), function (err) {
            if (err) throw err
            console.log('Scraping is done, saved the results to output.json')
        })
    })
    .catch(function (error) {
        console.error('Error!: ', error.message)
    })
