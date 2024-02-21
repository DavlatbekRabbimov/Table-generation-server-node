const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
    console.log(`Server is started on port: http://localhost:${PORT}`)
})

app.use(cors({origin: 'https://table-generation-client-react.vercel.app', credentials: true}));

app.use(bodyParser.json());

module.exports = app;
