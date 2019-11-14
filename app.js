//require related modules
const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
//set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


//set static file
app.use(express.static('public'))


//include restaurant data(restaurant.json)
const restaurantList = require('./restaurant.json')

//set route
app.get(
  '/', (req, res) => {
    //put the restaurant data into partial template 'index-handlebars'
    res.render('index', { restaurants: restaurantList.results })
    //restaurants in the index.hbs
  }
)

//set detail interface
app.get(
  '/restaurants/:id', (req, res) => {

    const detailPage = restaurantList.results.find(
      item => item.id.toString() === req.params.id
    )
    //go restaurant.json to find
    res.render('detail', { detail: detailPage })
  }
)

//set search route
app.get(
  '/search', (req, res) => {

    const search = restaurantList.results.filter(

      item => item.name.toLowerCase().includes(req.query.keyword.toLowerCase())

    )

    res.render('index', { restaurants: search, keyword: req.query.keyword })
  }
)


//set server and listen
app.listen(
  port, () => {
    console.log(`this server is listening on http://localhost:${port}`)
  }
)