const express = require('express');
const cors = require('cors');

const  { config } = require('./config/config');

const app = express(); 

const port = config.port;

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Backend running');
}); 

const routerApi = require('./routes');
routerApi(app);

app.listen(port, ()=>{
    console.log("Backend running on port: ", port);
});
