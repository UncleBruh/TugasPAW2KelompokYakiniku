const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');     
const jwt = require('jsonwebtoken');    

const app = express();
const PORT = 3000;
const SECRET_KEY = 'rahasia_negara_api'; 

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/db_les_inggris')
  .then(() => console.log('Sukses terkoneksi ke MongoDB'))
  .catch(err => console.error('Gagal koneksi MongoDB:', err));


const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String, level: String, price: Number, duration: String
}));

const Student = mongoose.model('Student', new mongoose.Schema({
  name: String, email: String, phone: String, program: String,
  registrationDate: { type: Date, default: Date.now }
}));

const Schedule = mongoose.model('Schedule', new mongoose.Schema({
  day: String, time: String, activity: String, teacher: String
}));

const Teacher = mongoose.model('Teacher', new mongoose.Schema({
  name: String, email: String, phone: String, specialty: String, salary: Number
}));

app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User berhasil dibuat!' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal register', error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, username: user.username });
    
  } catch (err) {
    res.status(500).json({ message: 'Gagal login', error: err.message });
  }
});

app.get('/api/courses', async (req, res) => { res.json(await Course.find()); });
app.post('/api/courses', async (req, res) => { await new Course(req.body).save(); res.json({msg: 'ok'}); });
app.delete('/api/courses/:id', async (req, res) => { await Course.findByIdAndDelete(req.params.id); res.json({msg: 'del'}); });

app.get('/api/students', async (req, res) => { res.json(await Student.find().sort({registrationDate: -1})); });
app.post('/api/students', async (req, res) => { await new Student(req.body).save(); res.json({msg: 'ok'}); });
app.delete('/api/students/:id', async (req, res) => { await Student.findByIdAndDelete(req.params.id); res.json({msg: 'del'}); });

app.get('/api/schedules', async (req, res) => { res.json(await Schedule.find()); });
app.post('/api/schedules', async (req, res) => { await new Schedule(req.body).save(); res.json({msg: 'ok'}); });
app.delete('/api/schedules/:id', async (req, res) => { await Schedule.findByIdAndDelete(req.params.id); res.json({msg: 'del'}); });

app.get('/api/teachers', async (req, res) => { res.json(await Teacher.find()); });
app.post('/api/teachers', async (req, res) => { await new Teacher(req.body).save(); res.json({msg: 'ok'}); });
app.put('/api/teachers/:id', async (req, res) => { await Teacher.findByIdAndUpdate(req.params.id, req.body); res.json({msg: 'updated'}); });
app.delete('/api/teachers/:id', async (req, res) => { await Teacher.findByIdAndDelete(req.params.id); res.json({msg: 'deleted'}); });

app.listen(PORT, () => console.log(`Server Auth jalan di http://localhost:${PORT}`));