const app=require('./app');
const port=3000
require('./config/db');
require('./config/passport');
require('./config/passport2');
require('dotenv').config();
app.listen(port,()=>{
    console.log(`Server is http://localhost:${port}`);
})