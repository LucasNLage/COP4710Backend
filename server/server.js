const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const apiRouter = require('./routes');

const PORT = process.env.PORT || "3000";

app.use(express.json());
app.use('/api', apiRouter);
app.use(bodyParser.json());

app.listen(PORT, () => {

    console.log(`Server is running on port: ${PORT}`);

});