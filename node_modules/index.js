const PORT = 8000
const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")
const { response } = require("express")

const app = express()

const newspapers =[
    {
        name: 'Al Jazira',
        address: 'https://www.aljazeera.com/sports/',
        https: 'https://www.aljazeera.com',
    },
    {
        name: 'Marca',
        address: 'https://www.marca.com/en/',
        https: '',
    },
    {
        name: 'CNN',
        address: 'https://edition.cnn.com/sport',
        https: 'https://edition.cnn.com',
    },
    {
        name: 'Guardian',
        address: 'https://www.theguardian.com/football',
        https: '',
    }
]
const articles =[]

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("World Cup")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: newspaper.https + url,
                    source: newspaper.name
                })
            })

        })
})


app.get('/',(req,res) => {
    res.json("welcome")
})

app.get('/news',(req,res) => {
res.json(articles)
})

app.listen(PORT, ()=> console.log(`server os running on PORT ${PORT}`))