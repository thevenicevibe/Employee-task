const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require('body-praser');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://singhjyoti1997s:XC1oZJGpDJFpfq82@cluster0.jprina6.mongodb.net/USER", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Successfully connected to database");
})
.catch((error) => {
  console.log("database connection failed. exiting now...");
  console.error(error);
  process.exit(1);
});

const employeeSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  salary: Number,
  joiningDate: Date,
  relievingDate: Date,
  contact: String,
  status: String,
});

app.get("/api/employees", async (req, res) => {
  const employees = await employeeSchema.find();
  res.json(employees);
});

app.post("/api/employees", async (req, res) => {
  const newEmployee = new employeeSchema(req.body);
  await newEmployee.save();
  res.json(newEmployee);
});

app.put("/api/employees/:id", async (req, res) => {
  const updatedEmployee = await employeeSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedEmployee);
});

app.delete("/api/employees/:id", async (req, res) => {
  await employeeSchema.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
