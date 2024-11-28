let express = require("express");
let mongoose = require("mongoose")
let router = require('./routes/routes');

let app = express();
let port = 3000;

app.use(express.json());
app.use(router);

const connectionString =
  "mongodb+srv://simionmarina99:parola11@cluster0.oyx0x.mongodb.net/FlatFinder?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(connectionString);



app.listen(port, function () {
  console.log("Express started!");
})