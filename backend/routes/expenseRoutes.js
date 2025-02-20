const express = require("express");
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

const router = express.Router();

// Create a new expense
router.post("/", auth, async (req, res) => {
  const { amount, category } = req.body;
  const userId = req.userId;

  try {
    const expense = new Expense({ userId, amount, category });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error("Expense Creation Error: ", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
});

// Get all expenses for the authenticated user
router.get("/:month/:year", auth, async (req, res) => {
  const userId = req.userId;
  const { month, year } = req.params;

  try {
    const expenses = await Expense.find({
      userId,
      date: {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      },
    }).sort({ date: -1 });
    const earliestExpense = await Expense.findOne({ userId }).sort({ date: 1 });

    res.json({ expenses, earliestExpense });
  } catch (error) {
    console.error("Expense Fetching Error: ", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
});

// Update an expense by ID using PATCH
router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const userId = req.userId;

  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true, runValidators: true }
    );
    if (!expense) {
      return res.status(404).json({ message: "Expense not found or user unauthorized" });
    }
    res.json(expense);
  } catch (error) {
    console.error("Expense Update Error: ", error);
    res.status(400).json({ message: error.message });
  }
});

// Delete an expense by ID
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const expense = await Expense.findOneAndDelete({ _id: id, userId });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found or user unauthorized" });
    }
    res.json({ message: "Expense deleted" });
  } catch (error) {
    console.error("Expense Deletion Error: ", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
});

module.exports = router;
