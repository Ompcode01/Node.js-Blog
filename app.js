require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.static('public'));  // To store Static files like images, etc 

//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require("./server/routes/main"));  // We are putting every routes at different position. 

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
});