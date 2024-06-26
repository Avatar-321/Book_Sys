import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from 'body-parser';


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const DB_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'booksys'
};

function validateConnectionParams(config) {
    if (!config.host || !config.user || !config.database) {
        throw new Error('Incomplete MySQL connection parameters. Please provide host, user, and database.');
    } 
}

try {
    validateConnectionParams(DB_CONFIG);
} catch (error) {
    console.error('Error validating MySQL connection parameters:', error.message);
    process.exit(1); 
}

const db = mysql.createConnection(DB_CONFIG);

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});


// Route to handle signup form submission
app.post('/signup', (req, res) => {
    const { email, username, password } = req.body;
    const sql = "INSERT INTO users (`email`, `user`, `password`) VALUES (?, ?, ?)";
    const values = [email, username, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Data inserted successfully:', result);
        const user = {
            id: result.insertId,
            email: email,
            username: username
        };
        return res.status(200).json({ success: true, user: user });
    });
});




app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    const values = [email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.length === 0) {
            
            return res.json({ success: false, error: 'Invalid credentials' });
        } else {
            
            return res.json({ success: true, user: result[0] });
        }
    });
});


const createFeedbackTable = `
    CREATE TABLE IF NOT EXISTS feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        feedback TEXT
    )
`;

db.query(createFeedbackTable, (err) => {
    if (err) {
        console.error('Error creating feedback table:', err);
        return;
    }
    console.log('Feedback table created successfully');
});


app.post('/feedback', (req, res) => {
    const { name, email, feedback } = req.body;
    const insertFeedbackQuery = `INSERT INTO feedback (name, email, feedback) VALUES (?, ?, ?)`;
    db.query(insertFeedbackQuery, [name, email, feedback], (err, result) => {
        if (err) {
            console.error('Error saving feedback:', err);
            res.status(500).json({ error: 'Failed to save feedback' });
        } else {
            res.json({ message: 'Feedback saved successfully' });
        }
    });
});
process.on('exit', () => {
    console.log('Closing MySQL connection');
    db.end();
});