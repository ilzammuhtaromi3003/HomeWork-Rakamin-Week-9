const db = require("../database");

const movies = {}

movies.getAll = async (req, res) => {
    const result = await pool.query ('select * from movies')
    return result
}

movies.getPaginateData = async (offset, limit)=> {
    const query = 'SELECT * FROM movies LIMIT $1 OFFSET $2';
    const values = [limit, offset];
    const result = await pool.query(query, values);
    return result
}

movies.getTotalCount = async () =>{
    const result = pool.query ('SELECT COUNT (*) AS total FROM movies')
    return result
}

movies.getById = async (req, res) => {
    const id = req.params.id
    const result = await pool.query ('select * from movies where id = $1', [id])
    return result
}

movies.add = async (req, res) => {
    const body = req.body
    const result = await pool.query ('INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4)',
    [body.id, body.title, body.genres, body.year])
    return result
}

movies.deleteById = async (req, res) => {
    const id = req.params.id
    const result = await pool.query ('delete from movies where id = $1', [id])
    return result
}


movies.updateById = async (id, data) => {
    const result = await pool.query('UPDATE movies SET title = $2, genres = $3, year = $4 WHERE id = $1',
      [id, data.title, data.genres, data.year]);
    return result;
  };
  

// movies.updateById = async (req, res) => {
//     const body = req.body
//     const result = await pool.query ('UPDATE movies set title = $2, genres = $3, year = $4 WHERE id = $1',
//     [body.id, body. title, body. genres, body. year])
//     return result
// }

module.exports = movies
