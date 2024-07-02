const Expenses = require("./models");

exports.getExpenses = async (req, res) => {
  try {
    const getData = await Expenses.findAll();
    return res.json(getData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

exports.postExpenses = async (req, res) => {
  try {
    const { amount, description, items } = req.body;
    const postData = await Expenses.create({ amount, description, items });
    return res.json(postData);
  } catch (error) {
    res.status(500).json({ error: "Failed to create expense" });
  }
};

exports.updateExpenses = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, items } = req.body;

    const updateData = await Expenses.findByPk(id);
    if (updateData) {
      updateData.amount = amount;
      updateData.description = description;
      updateData.items = items;
      await updateData.save();

      res.json(updateData);
    } else {
      res.status(404).json({ error: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
};

exports.deleteExpenses = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await Expenses.findByPk(id);
    if (deleteData) {
      await deleteData.destroy();
      res.json({ message: "Expense deleted successfully" });
    } else {
      res.status(404).json({ error: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
};
