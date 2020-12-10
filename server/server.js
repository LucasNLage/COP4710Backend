const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors')


const app = express();
const apiRouter = require('./routes');

const PORT = process.env.PORT || "3000";

app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
    origin: ['http://localhost:3000']
}))
app.use('/api', apiRouter);

console.log("cors test")
app.listen(PORT, () => {

    console.log(`Server is running on port: ${PORT}`);

});