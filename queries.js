const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'bluelime',
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

//  const createCountry = (request,response) => {
//     const { name, city} = request.body
//     pool.query('INSERT INTO countries(name, city) VALUES ($1,$2)', [name,city], (error,results) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).send('A new country has been added to the database');
//     })
//  }
 
const createCountry = (request, response) => {
    const { name, city } = request.body;
    console.log('Received request to create country:', name, city);
    pool.query('INSERT INTO countries (name, city) VALUES ($1, $2)', [name, city], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            response.status(500).send('Error executing query');
            return;
        }
        response.status(201).send('A new country has been added to the database');
    });
};

 // Creating a route function to update a record existing in the database

 const updateCountry = (request, response) => {
    const id = parseInt(request.params.id)
    const { name , city} = request.body
    pool.query('UPDATE countries SET name = $1, city = $2 WHERE id = $3',[name, city, id], 
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
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM countries WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            response.status(500).send('Error executing query');
            return;
        }
        response.status(200).send(`Country deleted with ID: ${id}`);
    });
};


 // creating exports to be available to the application file using modules

 module.exports = {
    getCountries,
    getCountryById,
    createCountry,
    updateCountry,
    deleteCountry
 }