var importedFunc = require('./sat1')
var package = require('./package.json')

var express = require('express')
var app = express()



var logger = (req, res, next) => {
  console.log("Request:", req.originalUrl)
  next()
}

var logger2 = (req, res, next) => {
  console.log("Log2 Request:", req.originalUrl)
  next()
}

var errorLog = (req, res, next) => {
  console.log("Error in Request:", req.originalUrl)
  next()
}

var bizLogic = (req, res, next) => {
  console.log(req.query)
  var ok = true
  if (ok) {
    return res.json({ result : importedFunc(parseInt(req.query.a), parseInt(req.query.b)) })
  }
  var error = new Error("something is not good")
  next(error)
}

app.use("/fubar", logger, logger2, bizLogic)



function errorHandler(err, req, res, next) {
  console.log("Error in request", err.message, err.stack)
  if (err) {
    res.status(500).send(err.message + "in:" + err.stack)
  }
}

app.use(errorHandler)


var server = app.listen(8080, (err) => {
  console.log("Our server listening")
})

