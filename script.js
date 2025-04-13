let expenses = [];

// Function to render expenses in the table
function renderExpenses() {
    const tableBody = document.querySelector('#expense-table');
    tableBody.innerHTML = ''; // Clear existing rows

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.amount}</td>
            <td>${expense.category}</td>
            <td><button class="btn btn-danger btn-sm remove-button" data-index="${index}">x</button></td>
        `;
        tableBody.appendChild(row);
    });

    const budget = parseFloat(document.getElementById('budget').value) || 0;
    document.getElementById('budvalue').textContent = budget;

    const totalExpense = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    document.getElementById('total').textContent = totalExpense;
    document.getElementById('balance').textContent = budget - totalExpense;

    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            expenses.splice(index, 1); // Remove expense from array
            renderExpenses(); // Re-render table
        });
    });
}

// Form 
const form = document.querySelector('#expense-form');
form.addEventListener('submit', (event) => {
    event.preventDefault(); //To prevent page refresh

    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;

    if (!amount || isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    // Add new expense to array
    expenses.push({ amount: parseFloat(amount), category });

    // Re-render table and totals
    renderExpenses();

    // Clear form inputs
    document.getElementById('amount').value = '';
    document.getElementById('category').value = 'Fruits';
});

// Update totals when budget changes
document.getElementById('budget').addEventListener('input', renderExpenses);

// Render expenses on page load
document.addEventListener('DOMContentLoaded', renderExpenses);
