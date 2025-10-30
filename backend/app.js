const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const cors = require("cors")

const port = process.env.PORT || 3000

path = require("path")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes for Users
// const userRoute = require("./routes/userRoutes")
// app.use("/jobmatch", userRoute)

app.use(express.static(path.join(path.resolve(), "dist")))
app.listen(console.log("Server is running on port", port))
