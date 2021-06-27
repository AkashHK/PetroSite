const { request } = require('express')
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('Public'))

app.use(express.json());

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

app.post('/contact-details', (req, res) => {

  console.log("Post ulla irruken")
  
  let name = req.body.name
  let email = req.body.email
  let phone = req.body.phone
  let questions = req.body.questions

  if (!name || !email || !phone || !questions || name.trim() == '' || email.trim() == '' || phone.trim() == '' || questions.trim() == '' )
  {
    res.status(400).json({
      error: 1,
      msg: "Missing details."
    })
    return;
  }

  console.log("NULL check")

  name = name.trim()
  email = email.trim()
  phone = phone.trim()
  questions = questions.trim()

  if (!validateEmail(email)){
    res.status(400).json({
      error: 2,
      msg: "Invalid email."
    })
    return;
  }

  console.log("Email Valid")
  
  var data  = [name, email, phone, questions];

  connection.query('INSERT INTO PetroDetails (C_Name, C_Email, C_Phone, C_Questions) VALUES (?,?,?,?);', data, function(err, result) {
    
    console.log("Query complete")

    if(err){
      console.log(err)
      res.status(500).json({
        error: 3,
        msg: err
      })
      return;

    }

    console.log(result)

    res.status(200).json({
      msg: "Details added successfully"
    })
    console.log("Return ku munnadi")
    return;
    });


})

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwertyuiop',
  database: 'Petro'
});
connection.connect((err) => {
  if (err) throw err;
  // console.log('Connected!');
  app.listen(port, () => {
  console.log(`Application started!`)
  })

});