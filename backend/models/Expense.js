// models/Expense.js

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Їжа', 'Розваги', 'Аренда житла', 'Кава', 'Комунальні послуги', 'Таксі', 'Одяг'], // Predefined categories
  },
  date: { type: Date, default: Date.now },
  month: { type: Number },
  year: { type: Number },
});

expenseSchema.pre('save', function (next) {
  const date = new Date(this.date);
  this.month = date.getMonth() + 1; 
  this.year = date.getFullYear();
  next();
});

module.exports = mongoose.model('Expense', expenseSchema);
