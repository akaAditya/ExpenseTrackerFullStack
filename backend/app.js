const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const controller = require('./controller');
const sequelize = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/expenses', controller.getExpenses);
app.post('/expenses', controller.postExpenses);
app.put('/expenses/:id', controller.updateExpenses);
app.delete('/expenses/:id', controller.deleteExpenses);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('MySQL connected successfully on: 3000');
    });
});
