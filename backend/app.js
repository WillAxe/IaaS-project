const dotenv=require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const cors = require("cors")

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

path = require("path")

app.get("/", (req, res) => {
  res.send("Welcome to JobMatch API")
})

const planetRoutes = require("./routes/userRoutes")
app.use("/jobmatch", userRoutes)

//Routes for Users
app.use("/jobmatch", require("./routes/userRoutes"))

app.use(express.static(path.join(path.resolve(), "dist")))
app.listen(console.log("Server is running on port", port))


//Routes for Jobs
app.use("/jobmatch", require("./routes/JobRoutes"))
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
