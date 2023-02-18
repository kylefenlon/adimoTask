const cheerio = require('cheerio')
const fetch = require('node-fetch');
const fs = require('fs')

// fetch("https://www.thewhiskyexchange.com/search?q=cider", {
//     "headers": {
//         "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//         "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
//         "cache-control": "max-age=0",
//         "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "document",
//         "sec-fetch-mode": "navigate",
//         "sec-fetch-site": "cross-site",
//         "sec-fetch-user": "?1",
//         "upgrade-insecure-requests": "1",
//         "cookie": "ASP.NET_SessionId=iwwsoiiwliwrlebqelhqsoxe; __tweuid=da7ba4e80e56470e9ec6e8c928ca9b9d; startedat=15/02/2023 18:58:07; _gcl_au=1.1.1032512778.1676487500; _fbp=fb.1.1676487503812.602597054; rbuid=rbos-195b3d56-8c62-4701-b834-842864f45a3a; __zlcmid=1ERlbY7DqINurI7; __cf_bm=eHvk9HZRfmUjUGzSObPBeAB1wKnAvRBkhlg1XR7Cwmk-1676738789-0-AdPoWg+7Bk0OtQCKVDt9wPRKom7tkexqIFwxaHNmvUDs/hutWkgwZiuJY3ne/i7pVcp/LTZEhESF1PyyNNRkYdU=; _cfuvid=b1fgRx65lCENFb_10cnWmRNawyGorVQZw8MsOjHxjeA-1676738789013-0-604800000; _gid=GA1.2.1946146293.1676738790; _ga=GA1.2.2080737082.1676487500; ometria=2_cid%3DXLbEqCrZmKICIC7q%26nses%3D2%26osts%3D1676487499%26sid%3Df15e3b111gZ3AHWJn4ddi%26npv%3D2%26tids%3D%26ecamp%3D%26src%3Dcdn.adimo.co%257C%257C%257C%257C%257C%257C19406%26osrc%3Dcdn.adimo.co%257C%257C%257C%257C%257C%257C19403%26slt%3D1676739429; _uetsid=cafb5c10afab11edaabdc9c493746616; _uetvid=b69ef0c0ad6211edac4ad9275a2121b0; _ga_53RV91M60Z=GS1.1.1676738789.2.1.1676739575.0.0.0",
//         "Referer": "https://cdn.adimo.co/",
//         "Referrer-Policy": "strict-origin-when-cross-origin",
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
//     },
//     "body": null,
//     "method": "GET"
// }).then(response => {
//     // if (!response.ok) {
//     //     throw new Error(response.status);
//     // }
//     return response;
// }).then(response => response.text())

const html = fs.readFileSync("./whiskey.html").toString()


let $ = cheerio.load(html)
let products = []
let totalPrice = 0
let totalItems = 0


$('.product-grid__item').each(function (i, elem) {
    let product = {}
    product.title = $(elem).find('.product-card__name').text()
    product.imageUrl = $(elem).find('img.product-card__image').attr('src')
    product.price = parseFloat($(elem).find('.product-card__price').text().replace(/[^0-9.-]+/g, ""))


    products.push(product)
    totalItems++
    totalPrice += product.price
})


let averagePrice = totalPrice / totalItems
let output = {
    products,
    totalItems,
    averagePrice
}

fs.writeFile('outputWhiskey.json', JSON.stringify(output, null, 2), function (err) {
    if (err) throw err
    console.log('Scraping is done, saved the results to output  Whiskey.json')
})


    // Copied fetch request from network tab in chrome so that
    // the headers are also included to try and get around
    // CloudFlare's security but still didn't work. Still getting
    // 403 error.