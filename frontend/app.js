const API_URL = 'http://localhost:3000/expenses';

function getExpense() {
    let amount = document.getElementById('amount').value;
    let description = document.getElementById('description').value;
    let items = document.getElementById('list').value;

    if (!amount || !description || !items) {
        alert("All fields are required!");
        return;
    }
    let expense = { amount, description, items };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
    })
    .then(response => response.json())
    .then(data => expenses(data))
    .catch(error => console.error('Error:', error));
}

window.onload = function() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            data.forEach(expense => expenses(expense));
        })
        .catch(error => console.error('Error:', error));
};

function expenses(expense) {
    let parentElem = document.getElementById("expense-list");
    let childElem = document.createElement("li");
    childElem.textContent = `${expense.amount} - ${expense.description} - ${expense.items}`;

    const deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete';
    deleteBtn.onclick = () => {
        fetch(`${API_URL}/${expense.id}`, {
            method: 'DELETE',
        })
        .then(() => parentElem.removeChild(childElem))
        .catch(error => console.error('Error:', error));
    };

    const editButton = document.createElement('input');
    editButton.type = 'button';
    editButton.value = 'Edit';
    editButton.onclick = () => {
        document.getElementById('amount').value = expense.amount;
        document.getElementById('description').value = expense.description;
        document.getElementById('list').value = expense.items;

        // Add an event listener to handle the update
        document.getElementById('submit-button').onclick = () => {
            let updatedExpense = {
                amount: document.getElementById('amount').value,
                description: document.getElementById('description').value,
                items: document.getElementById('list').value
            };

            fetch(`${API_URL}/${expense.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedExpense)
            })
            .then(response => response.json())
            .then(data => {
                parentElem.removeChild(childElem);
                expenses(data);
            })
            .catch(error => console.error('Error:', error));
        };
    };

    childElem.appendChild(deleteBtn);
    childElem.appendChild(editButton);
    parentElem.appendChild(childElem);
}
