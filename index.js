const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// this acts as a middleware using use () function to recognize incoming request as a json object
app.use(bodyParser.json())

// configures your Express app to parse URL-encoded request bodies, which is useful for handling form submissions and other types of URL-encoded data 
app.use(
    bodyParser.urlencoded(
        {extended: true}
    )
)

// get request to route url 

app.get('/',(request, response =>{
response.json({Welcome: 'How to create an API with Node.js, express and POSTGRES'})
}) )

// Specify the port the express app is to run on

app.listen(port, () => {
    console.log( `App running on port ${port}.`)
})