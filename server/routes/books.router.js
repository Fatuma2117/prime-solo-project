const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

const { rejectUnauthenticated} = require('../modules/authentication-middleware');



router.get('/', rejectUnauthenticated, (req, res) => {
  // console.log('req.user', req.user)
  console.log(req.headers.currentKidId)
  const sqlQuery = `
  SELECT * FROM books
  JOIN kids_books ON books.id=kids_books.book_id
  WHERE kids_books.kid_id=$1
  ;
  `

  const sqlValues = [req.headers.currentKidId];
  pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log('ERROR in GET/books', dbErr);
      res.sendStatus(500);
    })
});








module.exports = router;
