if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const routes = require('./routes')

const handlebars = require('express-handlebars')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const db = require('./models') //測試用

const app = express()
const port = process.env.PORT || 3000


app.engine('hbs', handlebars({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride('_method'))
app.use(flash())

app.use('/api', routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app // 未來測試用