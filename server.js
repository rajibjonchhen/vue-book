const express = require('express');
const serveStatic = require('serve-static')

const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname + '/dist'))
app.get(/.*/, function(req, res){
  res.sendFile(__dirname + "/dist/index.html")
})

app.listen(port);

console.log(`server is running on port - ${port}`)
