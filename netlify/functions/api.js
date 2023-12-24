const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
/* To troubleshoot CORS error */
const cors = require('cors');
app.use(cors());

router.get('/', (req, res) => {
  res.send('App is running..');
});


/** Database connection [start] */
// const conn_str = "mongodb+srv://<username>:<password>@cluster0.<clusterid>.mongodb.net/<databasename>?retryWrites=true&w=majority";
const mongoose = require("mongoose");

mongoose.connect(conn_str)
.then(() => console.log("Connected successfully..."))
.catch( (error) => console.log(error) );
/** Database connection [end] */

const empSchema = new mongoose.Schema({
    name: String,
    contact_number: String,
    address: String,
    salary: Number,
    employee_id: Number,
    role: String
});

const emp = mongoose.models.emps || new mongoose.model("emps", empSchema);

// http://localhost:8989/employees
router.get("/employees", async (req, res) => {
    let data = await emp.find();
    res.send(data)
})

// http://localhost:8989/employees/65844854d5397aa15ca3e746
router.get("/employees/:id", async (req, res) => {
    let data = await emp.find({_id: req.params['id']});
    res.send(data[0])
})

// http://localhost:8989/employees?id=65844854d5397aa15ca3e746
router.delete("/employees", async (req, res) => {
    let d_data = await emp.deleteOne({"_id": req.query['id']});
	res.send(d_data);
})

router.use(express.json());
/*POST DATA 
{
  "name":"varsha newly added 2",
  "contact_number":"9833910512",
  "address":"mumbai",
  "salary":20000,
  "employee_id":98829,
  "role":"operations"
}
*/
router.post("/employees", async (req, res) => {
    doc = req.body;

    let u = await emp(doc);
	let result = u.save();
	res.send(doc);
})

/*
{
    "id": "65866e4d7f34e4e8bd0cb498",
    "name":"shruti",
    "salary":30000
}
*/
// http://localhost:8989/employees => PUT method
app.put("/employees", async (req, res) => {
    let u_data = await emp.updateOne({"_id": req.body.id}, {
		"$set": {
			"name" : req.body.name,
			"salary" : req.body.salary,
		}
	});
	
	res.send(u_data);
})




app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
