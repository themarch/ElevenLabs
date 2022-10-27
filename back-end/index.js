const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const cors = require('cors');
const morgan = require ("morgan")
const InitMongoose = require("./src/utils/InitMongoose")

const router = require ("./src/api/index.js")
const app = express()
const PORT = process.env.PORT || 9000

app.use(express.json()) // middleware for parsing incoming json
app.use(cors());
app.use(router)

// Server Listener
const main = async () => {
    await InitMongoose(process.env.URLDB);
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}

// (async ()=>{
//     await InitMongoose(process.env.URLDB);
//     app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
//   })();

main()
