const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mysql = require('mysql')
const validator = require('validator')
const sgMail = require('@sendgrid/mail')
require('dotenv').config();
const server = express();
const emailController = require('./Controller/emailController');
const Email = require("./Utilities/email");
const router = express.Router();
const sendgrid_api_key = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendgrid_api_key);

server.use(cors())
server.use(express.json());
server.use(bodyParser.json());
server.use('/api', emailController);


const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'googledev',
});

database.connect((error) => {
    if (error) {
        return console.log("Error connecting to database");
    }
    return console.log('Successfully Connected to database');
});

server.listen({ port: 3301 }, function check(error) {
    if (error) {
        console.log("Error connecting to port")
    }
    else {
        console.log("Successfully connected to port")
    }
});

// send email to the user
server.post('/api/members/email', async (req, res) => {
    const { email, firstname, lastname } = req.body;
    
        try{
            await new Email(email).sendConfirmEmail(lastname);
            console.log('Email sent successfully')
            res.send({ status: true, message: 'Email sent successfully'})

        } catch (error) {
            console.log('Error sending email')
            res.send({ status: false, message: 'Error sending email'})
        }
});

router.post("/wake-up-server", async (req, res) => {
    try {
      const body = req.body;
      console.log("body");
      console.log(body);
  
      res.status(200).json({ message: "server is now ready to send email" });
    } catch (err) {
      console.log("error", err.message);
      if (err) {
        return res.status(500).json({ message: "server an error" });
      }
    }
  });




// getting data froom the database
server.get('/api/members', (req, res) => { 
    var sql = "SELECT * FROM members";
    database.query(sql, function(error,result){
        if(error){
            console.log('Error retrieving data')

        }
        else {
            res.send({ status: true, message: 'members retrieved successfully', data: result})
        }
    });
});

//adding data to the database
server.post('/api/members/add', (req, res) => {
    var values = {
        firstname:req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    };
    const { firstname, lastname, email, password, phone } = req.body;
    if (
        !firstname ||
        !lastname ||
        !email ||
        !password ||
        !phone ||
        !validator.isEmail(email) ||
        !validator.isAlpha(firstname) ||
        !validator.isAlpha(lastname) ||
        !validator.isLength(password, { min: 8 }) ||
        !validator.isLength(phone,{ min: 10, max: 10 })
      ) {
        res.send({ status: false, message: 'Invalid Vata Entered \n Please Check Your Inputs'})
      }
      else{
    var sql = "INSERT INTO members SET ?";
    database.query(sql, values, function(error, result){
        if(error){
            console.log('Error inserting data')
            res.send({ status: false, message: 'Email Address Already Exisxts \n Please Sign In', data: error})
        }
        else {
            res.send({ status: true, message: 'Member inserted successfully', data: result})
        }
    });}
}
);

// reading data from the database
// and validating the user login
server.post('/api/members/login', (req, res) => {
    var values = {
        email: req.body.email,
        password: req.body.password
    };
    var sql = "SELECT firstname,lastname,phone,email FROM members WHERE email = ? AND password = ?";
    database.query(sql, [values.email, values.password], function(error, result){
        if(error){
            console.log('Error retrieving data')
            res.send({ status: false, message: 'Error retrieving data', data: error})
        }
        else {
            res.send({ status: true, message: 'member retrieved successfully', data: result})
            console.log('member retrieved successfully')
        }
    });

}

);

// getting all the admins
server.get('/api/admins/get', (req, res) => {
    var sql = "SELECT members.firstname, members.lastname,members.imagelink,leaders.role FROM members INNER JOIN leaders ON members.email = leaders.email ORDER BY leaders.id DESC LIMIT 3";
    database.query(sql, function(error,result){
        if(error){
            console.log('Error retrieving data')
            res.send({ status: false, message: 'Error retrieving data', data: error})
        }
        else {
            res.send({ status: true, message: 'admins retrieved successfully', data: result})
            console.log('admins retrieved successfully')
        }
    });
});

server.post('/api/members/email', (req, res) => {
    var values = {
        firstName: req.body.firstname,
        lastName: req.body.lastname
    };
    var sql = "SELECT email FROM members WHERE firstname = ? AND lastname = ?";
    database.query(sql, [values.firstName, values.lastName], function(error, result){
        if(error){
            console.log('Error retrieving data')
            res.send({ status: false, message: 'Error retrieving data', data: error})
        }
        else {
            res.send({ status: true, message: 'member retrieved successfully', data: result})
            console.log('member retrieved successfully')
        }
    });

}

);
// updatting the user
server.post('/api/members/update', (req, res) => {
    var values = {
        firstname:req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    };
    const { firstname, lastname, email, password, phone } = req.body;
    if (
        !firstname ||
        !lastname ||
        !password ||
        !phone ||
        !validator.isAlpha(firstname) ||
        !validator.isAlpha(lastname) ||
        !validator.isLength(password, { min: 8 }) ||
        !validator.isLength(phone,{ min: 10, max: 10 })
      ) {
        res.send({ status: false, message: 'Invalid Vata Entered \n Please Check Your Inputs'})
        console.log('invalid values')
      }
      else{
    var sql = `UPDATE members SET firstname = '${firstname}',lastname = '${lastname}', password = '${password}', phone = '${phone}' WHERE email = '${email}'`;
    database.query(sql, values, function(error, result){
        if(error){
            console.log('Error Updating data')
        }
        else {
            res.send({ status: true, message: 'UPdated successfully',})
        }
    });}
}
);
// reading the notes of the diffrent roles
server.post('/api/leader/welcomedata/role', (req, res) => {
    var values = {
        Role: req.body.role
    }
    var sql = `SELECT members.firstname, members.lastname,leaders.role,leaders.notes FROM members JOIN leaders ON members.email = leaders.email WHERE leaders.role = '${values.Role}'`;
    database.query(sql, function(error,result){
        if(error){
            console.log('Error getting data')
            res.send({ status: false, message: 'Error retrieving data', data: error})
        }
        else {
            res.send({ status: true, message: 'admins retrieved successfully', data: result})
            console.log('notes retrieved successfully')
            console.log(result)
        }
    });
});



// get all the leaders
server.get('/api/leader/getall', (req, res) => {
    var sql = "SELECT members.firstname,members.lastname,leaders.role FROM members JOIN leaders ON members.email = leaders.email ";
    database.query(sql, function(error,result){
            if(error){
                console.log('Error retrieving data')
                res.send({ status: false, message: 'Error retrieving data', data: error})
            }
            else {
                res.send({ status: true, message: 'admins retrieved successfully', data: result})
                console.log('admins retrieved successfully')
            }
        });
    });

server.get('/api/admins/all',(req,res)=>{
const {Email} =req.body;
var sql = `SELECT members.firstname, members.lastname,members.email,members.phone,leaders.role,leaders.notes FROM members JOIN leaders ON members.email = leaders.email`;
database.query(sql, function(error, result){
    if(error){
        console.log('Error retreving admins')
        res.send({ status: false, message: 'Error retreving admins', data: error})
    }
    else {
        res.send({ status: true, message: 'admins retreved successfully', data: result})
        console.log('admins retreved successfully')
    }
});
})

server.post('/api/member/delete',(req,res)=>{
    const {Email} =req.body;
    var sql = `DELETE FROM members WHERE email = '${Email}';`
    database.query(sql, function(error, result){
        if(error){
            console.log('Error deleting member')
            res.send({ status: false, message: 'Error deleting member', data: error})
        }
        else {
            res.send({ status: true, message: 'member Deleted successfully', data: result})
            console.log('member deleted successfully')
        }
    });
    })
    // get all roles of a specific leader
    server.post('/api/leader/notes', (req, res) => {
        values = {
            Role : req.body.role
        }
        var sql =  `SELECT leaders.notes FROM leaders WHERE role = '${values.Role}'`;
        database.query(sql, function(error, result){
            if(error){
                console.log('Error retreving roles')
                res.send({ status: false, message: 'Error retreviing roles', data: error})
            }
            else {
                res.send({ status: true, message: 'Roles retreved successfully', data: result})
                console.log('Roles retreved successfully')
            }
        });
        })

    //updating roles in the leaders table
    server.post('/api/leader/update', (req, res) => {
        var values = {
            role: req.body.role,
            notes: req.body.notes
        };
       
        var sql = `UPDATE leaders SET notes = '${values.notes}' WHERE role = '${values.role}'`;
        database.query(sql, values, function(error, result){
            if(error){
                console.log('Error Updating data')
            }
            else {  
                res.send({ status: true, message: 'UPdated successfully',})
            }
        })});

        server.post('/api/leader/addto', (req, res) => {
            var values = {
                role: req.body.role,
                notes: req.body.notes
            };
            var sql = `UPDATE leaders SET notes = CONCAT(notes ,'${values.notes}') WHERE role = '${values.role}'`;

            database.query(sql, values, function(error, result){
              if (error) {
                console.error(error);
              } else {
                res.send({ status: true, message: 'Added successfully',})
              }
            });
            });
// varify Lead

server.post('/api/lead/login', (req, res) => {
    var values = {
        id: req.body.id,
        // email: req.body.email,
        password: req.body.password
    };
    var sql = `SELECT leaders.role FROM members JOIN leaders ON members.email = leaders.email WHERE leaders.id = ${values.id} AND members.password = '${values.password}'`;
    database.query(sql, function(error, result){
        if(error){
            console.log('Error verifying Lead')
            res.send({ status: false, message: 'Error retrieving Lead', data: error})
        }
        else {
            res.send({ status: true, message: 'Lead verified successfully', data: result})
            console.log('Lead verified successfully')
        }
    });

}

);


// 
server.post('/api/savepic',(req,res)=>{
    var values = {
        email: req.body.email,
        imageLink: req.body.link
    };
    var sql = `UPDATE members SET imagelink = '${values.imageLink}' WHERE email= '${values.email}'`;
    database.query(sql, function(error, result){
        if(error){
            console.log('Error adding pic')
            res.send({ status: false, message: 'Error adding pic', data: error})
        }
        else {
            res.send({ status: true, message: 'pic added successfully', data: result})
            console.log('pic added successfully')
        }
    });
    })