const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'blueline',
    host: 'localhost',
    database: 'api',
    password: 'gratitude',
    port: 5432
 })

 // query to retrieve all the data 
 const getCountries = (request,response) =>{
    pool.query('SELECT * FROM countries ORDER BY id ASC', (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)

    })
 }

 // query to retrieve a single country using country id 

 const getCountryById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * FROM countries WHERE id = $1', [id], (error, results) =>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
 }

 // Route to query to create a country 

 const createCountry = (request,response) => {
    const { name, capital} = request.body
    pool.query('INSERT INTO countries(name, capital) VALUES ($1,$2)', [name,capital], (error,results) => {
        if (error) {
            throw error
        }
        response.status(201).send('A new country has been added to the database');
    })
 }
 
 // Creating a route function to update a record existing in the database

 const updateCountry = (request, response) => {
    const id = parseInt(request.params.id)
    const { name , capital} = request.body
    pool.query('UPDATE countries SET name = $1, capita = $2, WHERE id = $3',[name, capital, id], 
        (error,results) => {
            if (error) {
                throw error
            }
            response.status(200).send('Country has been updated in the database')
        }
       
    )
 }

 // Creating a query function to delete an existing record in the database

 const deleteCountry = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM countries WHERE id = $id', [id], (error,results) => {
        if (error) {
            throw error
        }

        response.status(200).send(`Country deleted with ID: ${id}`)
    })
 }