var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

//display page
router.get('/', function (req, res, next) {
  dbConn.query('SELECT * FROM provinsi_tb ORDER BY id desc', function(err, rows) {
    if(err) {  
      req.flash('error', err);
      //render to view/nkri/index.ejs
      res.render('nkri', {data: ''});
    } else {
      //render to view /nkri/index.ejs
      res.render('nkri', {data: rows});
    }
  });
});

// display detail
// router.get('/detail/(:id)', function (req, res, next) {
//   dbConn.query(`SELECT * FROM kabupaten_tb WHERE provinsi_id = ${req.params.id} ORDER BY id desc`, function(err, rows) {
//     if(err) {
//       console.log(err);
//       req.flash ('error', err);
//       //render to view/nkri/index.ejs
//       res.render('detail', {data: ''});
//     } else {
//       //render to view /nkri/index.ejs
//       res.render('detail', {data: rows});
//       // console.log(rows);
//     }
//   })
// })

//display add page
router.get("/add", function (req, res, next) {
  //render to add.js
    res.render('nkri/add', {
      nama : '',
      diresmikan : '',
      pulau : '',
    });
  });

//add a new
router.post('/add', function(req, res, next) {
  let nama = req.body.nama;
  let diresmikan = req.body.diresmikan;
  let pulau = req.body.pulau;

  if(nama.length === 0 || diresmikan.length === 0 || pulau.length === 0) {
    errors = true;

    //set flash message
    req.flash('error', 'Please entry data')
    //render to add.ejs with flash message
    res.render('nkri/add', {  
      nama : nama,
      diresmikan : diresmikan,
      pulau : pulau,
    })
  }

  //if no error
  if(!errors) {
    var form_data = {
      nama: nama,
      diresmikan: diresmikan,
      pulau: pulau,
    };

    //insert query
    dbConn.query('INSERT INTO provinsi SET ?', form_data, function(err, result) {
      //if(err) throw err
      if (err) {
        req.flash('error', err);

        //render to add.ejs
        res.render('nkri/add', {
          nama: form_data.nama,
          diresmikan: form_data.diresmikan,
          pulau: form_data.pulau,
        });
      } else {
        req.flash('success', 'Province Data Successfully added');
        res.redirect('/nkri');
      }
    });
  }
});

// display edit page
router.get('/edit/(:edit)', function (req, res, next) {
  let id = req.params.id;

  dbConn.query(
    'SELECT * FROM provinsi_tb WHERE id = ' + id,
    function (err, rows, fields) {
      if (err) throw err;

      // if user not found
      if(rows.length <= 0) {
        req.flash('error', 'Region not found with id = ' + id);
        res.redirect('/nkri');
        //if data found
      } else {
        res.render('nkri/edit', {
          title: 'Edit Province',
          id: rows[0].id,
          nama: rows[0].nama,
          diresmikan: rows[0].diresmikan,
          pulau: rows[0].pulau
        });
      }
    }
  );
});

//update province data
router.post('/update/:id', function (req, res, next) {
  let id = req.params.id;
  let nama = req.params.nama;
  let diresmikan = req.params.diresmikan;
  let pulau = req.params.pulau;
  let errors = false;

  if(nama.length === 0 || diresmikan.length === 0 || pulau.length === 0) {
    errors = true;

    //set flash message
    req.flash('error', 'Unfulfil data, Please entry the data');
    //render to add.js with flash message
    res.render('nkri/edit', {
      id: req.params.id,
      nama: nama,
      diresmikan: diresmikan,
      pulau: pulau,
    });
  }

  //if mo error
  if(!errors) {
    var form_data = {
      nama: nama,
      diresmikan: diresmikan,
      pulau: pulau,
    };
    //update query
    dbConn.query(
      'UPDATE provinsi_tb SET ? WHERE id = ' + id,
      form_data,
      function(err, result) {
        //if(err) throw err
        if(err) {
          //set flash message
          req.flash('error', err);
          //render to edit.ejs
          res.render('nkri/edit', {
            id: req.params.id,
            nama: form_data.nama,
            diresmikan: form_data.diresmikan,
            pulau: form_data.pulau,
          });
        } else {
          req.flash('success', 'Province Data successfully updated');
          res.redirect('/nkri');
        }
      }
    );
  }
});

//delete data
router.get('delete/(:id)', function(req, res, next) {
  let id = req.params.id;

    dbConn.query('DELETE FROM provinsi_tb WHERE id = ' + id, function (err, result) {
    //if(err) throw err
    if (err) {
      //set flash, message 
      res.flash('error', err);
      //redirect to nkri page
      res.redirect('/nkri');
    } else {
      //set flash message
      req.flash('success', 'Province Data successfully deleted! ID = ' + id);
      //rerdirect to nkri page
      res.redirect('/nkri');
    }
  });
});

module.exports = router