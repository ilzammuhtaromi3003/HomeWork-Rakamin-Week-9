const express = require ('express')
const movies = require ('../controller/movies')

const { authentication } = require("../middleware/auth");

const router = require("express").Router();

router.use(express.json());
//menampilkan semua movies
router.get('/', async (req, res) => {
    try {
      const result = await movies.getAll(req, res);
      res.status(200).json({
        "success": true,
        "data": result.rows
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        "success": false,
        "message": "Terjadi kesalahan saat mengambil data film."
      });
    }
  });
  
  router.get('/paginate', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Mengambil parameter 'page' atau default ke halaman 1 jika tidak ada
      const limit = 10; // Batasan data per halaman
      const offset = (page - 1) * limit; // Menghitung offset berdasarkan halaman
  
      const result = await movies.getPaginateData(offset, limit);
      const totalMovies = await movies.getTotalCount(); // Mengambil total jumlah data film
  
      res.status(200).json({
        "success": true,
        "data": result.rows,
        "page": page,
        "total_pages": Math.ceil(totalMovies / limit)
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        "success": false,
        "message": "Terjadi kesalahan saat melakukan paginasi data film."
      });
    }
  });

router.get ('/:id', async (req, res) => {
    try {
        const result = await movies.getById(req, res)
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          "success": false,
          "message": "Data film tidak ditemukan."
        });
      }
  
      res.status(200).json({
        "success": true,
        "data": result.rows[0] // Mengambil data pertama dari hasil query (asumsi hanya satu hasil yang ditemukan)
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        "success": false,
        "message": "Terjadi kesalahan saat mengambil data film."
      });
    }
  });

  router.post('/', async (req, res) => {
    try {
        const result = await movies.add (req, res)
      
      // Jika operasi penambahan berhasil, kirimkan respons dengan status 201 (Created)
      res.status(201).json({
        "success": true,
        "message": "Data film berhasil ditambahkan."
      });
    } catch (error) {
      console.error(error);
      // Jika terjadi kesalahan, kirimkan respons dengan status 500 (Internal Server Error)
      res.status(500).json({
        "success": false,
        "message": "Terjadi kesalahan saat menambahkan data film."
      });
    }
  });




router.put("/:id", authentication, (req, res) => {
  res.send("update movie");
});
router.delete("/:id", authentication, (req, res) => {
  res.send("delete movie");
});

module.exports = router;
