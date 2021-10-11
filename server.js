const express = require("express")
const app = express()
const { connectDB } = require("./config/db")
const db = require("./models/Document")
require("dotenv").config();
const PORT = process.env.PORT;

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))


connectDB();


app.get("/", (req, res) => {
  const code = `Welcome to Code Drop!

Use the commands in the top right corner
to create a new file to drop code and share with others.`

  res.render("code-display", { code, language: "plaintext" })
})

app.get("/new", (req, res) => {
  res.render("new")
})

app.post("/save", async (req, res) => {
  const value = req.body.value
  try {
    const document = await db.create({ value })
    res.redirect(`/${document.id}`)
  } catch (e) {
    res.render("new", { value })
  }
})

app.get("/:id/duplicate", async (req, res) => {
  const id = req.params.id
  try {
    const document = await db.findById(id)
    res.render("new", { value: document.value })
  } catch (e) {
    res.redirect(`/${id}`)
  }
})

app.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const document = await db.findById(id)

    res.render("code-display", { code: document.value, id })
  } catch (e) {
    res.redirect("/")
  }
})

app.listen(PORT, ()=> {
  console.log(`Server Listening on port 3000`);
})
