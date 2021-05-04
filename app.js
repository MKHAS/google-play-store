const express = require('express');
const mongoose = require('mongoose');
const Appuser = require('./models/appuser.js');

const app = express();

// connect to mongodb
const dbUri =
  'mongodb+srv://mkhas:y6jselTUg57RbG7K@cmps278finalproj.ttgsu.mongodb.net/cmps278finalproj?retryWrites=true&w=majority';

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('connected to db');
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//adding users
// app.get('/signup', (req, res) => {
//   const newappuser = new Appuser({
//     username: 'test user 0',
//     password: 'password',
//   });

//   newappuser
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });


// //get one user
// app.get('/get-user', (req, res)=>{
//   Appuser.findById('60901ef77049ad3cbce5d8ef')
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//routes

//home page
app.get('/', (req, res) => {
  res.redirect('/all-users');
});

//about
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/signup', (req, res) => {
  res.render('create', { title: 'Sign Up' });
});

// DB routes

//all users
app.get('/all-users', (req, res) => {
  Appuser.find()
    .sort({ createdAt: -1 }) //sort by descending order (newest to oldest in this case)
    .then((result) => {
      res.render('index', { title: 'All Users', Appusers: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Add User
app.post('/signup', (req, res) => {
  const user = new Appuser(req.body); //create user

  user
    .save() //save to db
    .then((result) => {
      res.redirect('/all-users');
    })
    .catch((err) => {
      console.log(err);
    });
});



//404
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
