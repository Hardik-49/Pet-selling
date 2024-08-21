const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const ConnectDB = require('./config/db')
const cors = require('cors');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes')
const itemRoutes = require('./routes/itemRoutes');

//enviorment variables
dotenv.config();

const app = express();

//db connection
ConnectDB();

//middleware
app.use(bodyParser.json());

// Routes
app.use('/api', categoryRoutes);
app.use('/api', subcategoryRoutes);
app.use('/api', itemRoutes);


app.use(cors({  
    origin:['http://localhost:5000'],
    methods:["GET","POST","PUT","DELETE"],
    Credentials:true
}));
app.use(express.json());

app.listen(process.env.PORT,()=>console.log(`server is running at port ${process.env.PORT}`))  