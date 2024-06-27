const express = require('express')
const app = express()

const user_entries = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const welcomeAPI= 
`<h2>Porfavor continue con los endpoints apropiados</h2>
<p>/contacts GET all DB items</p>
<p>/contacts/:id GET specific element</p>
`
app.get('/',(req,res)=>{res.send(welcomeAPI)})

app.get('/contacts',(req, res)=> res.send(user_entries))

app.get('/contacts/:id', (req,res)=>{
    const id = Number(req.params.id)
    const entry = user_entries.find(user=>user.id===id) 
    if(entry){
        return res.send(entry)
    }
    res.status(404).send({error:'User not found'})
})
app.get('/info',(req,res)=>{
    res.send(
        `<p>Phonebook has info for ${user_entries.length} people</p>
        <p>${new Date().toISOString()}</p>
        `)
})

app.listen(3001, ()=>{
    console.log('server started on 3001')
})
