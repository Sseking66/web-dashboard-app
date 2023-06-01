const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mern_dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Define the schema for Manufacturer and Transporter
const manufacturerSchema = new mongoose.Schema({
  orderID: String,
  to: String,
  from: String,
  quantity: String,
  address: String,
  transporter: String,
});

const transporterSchema = new mongoose.Schema({
  orderID: String,
  price: Number,
});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);
const Transporter = mongoose.model('Transporter', transporterSchema);

// Routes
app.get('/', (req, res) => {
  res.send('MERN Dashboard API');
});

// Register Manufacturer
app.post('/manufacturer/register', (req, res) => {
  const { orderID, to, from, quantity, address, transporter } = req.body;
  const newManufacturer = new Manufacturer({
    orderID,
    to,
    from,
    quantity,
    address,
    transporter,
  });
  newManufacturer.save()
    .then(() => res.json('Manufacturer registered successfully'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Get all Manufacturers
app.get('/manufacturer', (req, res) => {
  Manufacturer.find()
    .then((manufacturers) => res.json(manufacturers))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Register Transporter
app.post('/transporter/register', (req, res) => {
  const { orderID, price } = req.body;
  const newTransporter = new Transporter({
    orderID,
    price,
  });
  newTransporter.save()
    .then(() => res.json('Transporter registered successfully'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Get all Transporters
app.get('/transporter', (req, res) => {
  Transporter.find()
    .then((transporters) => res.json(transporters))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});