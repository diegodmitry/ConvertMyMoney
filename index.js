// Importa o Express
const express = require('express')
// Executa uma nova aplicacao
const app = express()
const path = require('path')
const convert = require('./lib/convert')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// Lugar para colocar arquivos, pronto para o ZeitNow
app.use(express.static(path.join(__dirname, 'public')))


// Informações no Browser
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cotacao', (req, res) => {
    const {cotacao, quantidade} = req.query
    if(cotacao && quantidade) {
    const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            error: false, 
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
} else {
    res.render('cotacao', {
        error: 'Valores Inválidos'
    })
}
})

app.listen(3000, err => {
    if(err) {
        console.log('Não é possível iniciar!')
    } else {
        console.log('ConvertMyMoney está online')
    }   
})