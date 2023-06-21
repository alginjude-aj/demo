
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors');
const { Form } = require('react-router-dom');


const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// db config
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'alginjude',
  database: 'db_user'
});

connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});


app.post('/signup', (req, res) => {
    const { username, password } = req.body;
  
    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    // Check if the username already exists in the database
    const checkQuery = 'SELECT * FROM tbl_users WHERE username = ?';
    connection.query(checkQuery, [username], (err, rows) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (rows.length > 0) {
        return res.status(409).json({ error: 'Username already exists' });
      }
  
      // Hash the password
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        // Insert the user into the database
        const insertQuery = 'INSERT INTO tbl_users (username, password) VALUES (?, ?)';
        connection.query(insertQuery, [username, hash], (err) => {
          if (err) {
            console.error('Error inserting user into the database:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }
  
          res.json({ message: 'Signup successful' });
      });
    });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Find the user in the database by username
  const query = 'SELECT * FROM tbl_users WHERE username = ?';
  connection.query(query, [username], (err, rows) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];

    // Compare the provided password with the stored password hash
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!result) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Password is correct, login successful
      // You can generate and send a token or session information here
      res.json({ message: 'Login successful' });
    });
  });
});

app.get ('/students', (req, res) =>{
  connection.query('SELECT * From tbl_students', (err, result) =>{
    if(err) {
      console.error('Error fetching student data:', err);
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  });
});

app.post('/student', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
  const { studentname, age, gender, score } = req.body;

 
  connection.query("INSERT INTO tbl_students (student_name, age, gender, score) VALUES (?,?,?,?)",
      [studentname, age, gender, score], 
      (err, result) => {
      console.log(err);
      
  });
});

app.put('/api/students/:studentId', (req, res) => {
  const studentId = req.params.id;
  const {student_name, age, gender, score} = req.body;

  connection.query('UPDATE tbl_students SET student_name = ?, age = ?, gender = ? , score = ? WHERE id = ?',
  [ student_name, age, gender, score, studentId],
  (err, result) => {
      if (err) {
        console.error('Error updating student:', err);
        res.sendStatus(500); // Send appropriate error response
      } else {
        res.sendStatus(200); // Send success status
      }
    });
})
app.delete('/students/:id', (req, res) =>{
  const studentId = req.params.id;

  connection.query("DELETE FROM tbl_students WHERE id= ?", [studentId] , (err, result) => {
    if(err) {
      console.error('Error Deleting Student Data:', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
