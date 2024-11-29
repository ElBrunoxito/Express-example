
const express = require('express')
const morgan = require('morgan')
const app = express()


app.use(morgan('dev'))
app.use(express.json())

let products = [
    {
        id:1,
        name: "nose",
        price: 2050
    }
]

app.get('/products',(req,res)=>{
    res.json(products)
})  

app.get('/products/:id',(req,res)=>{
    const product = products.find(p=>p.id === parseInt(req.params.id))
    if(!product) return res.status(404).json({message:"Product not found"})
    return res.json(product)
})



app.post('/products',(req,res)=>{
    const product = {...req.body, id: products.length+1}
    
    products.push(req.body)
    res.send("Producto creado: " + product)
})

app.put('/products',(req,res)=>{

    const product = products.find(p=>p.id === req.body.id)
    if(!product) return res.status(404).json({message:"Product not found"})
    let index = products.findIndex(p=>p.id === req.body.id)
    products[index] = req.body;

    res.send("Producto actualizado correctamete: ")


})

app.delete('/products/:id',(req,res)=>{
    const product = products.find(p=>p.id === parseInt(req.params.id))
    if(!product) return res.status(404).json({message:"Product not found"})
    products = products.filter(p=>p.id !== parseInt(req.params.id))

    console.log(products)
    res.send("Productos eliminados correctamente")
    
})



app.listen(8081)
console.log("RUN EXPRESS 8081")