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
const userRoute = require("./routes/userRoutes")
app.use("/jobmatch", userRoute)

//Routes for Jobs
app.use("/jobmatch", require("./routes/JobRoutes"))

//Routes for applications
app.use("/jobmatch/", require("./routes/applicationRoute"))

app.use(express.static(path.join(path.resolve(), "dist")))

app.listen(3000, () => {
  console.log("Redo på http://localhost:3000/")
})
