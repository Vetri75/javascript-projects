let currentEditRow = null;
let currentUserId = ''; 

function setUserId(userId) {
    currentUserId = userId; 
}

function editRow(event) {
    const row = event.target.parentElement.parentElement;
    const rowUserId = row.dataset.userId;

    // Check if the current user is the owner of the data
    if (rowUserId !== currentUserId) {
        alert("You can only edit your own details.");
        return;
    }

    // If another row is already in edit mode, cancel its edit
    if (currentEditRow && currentEditRow !== row) {
        cancelEdit(currentEditRow);
    }

    // Set the current edit row
    currentEditRow = row;

    // Fill the form with the row data
    document.getElementById('name').value = row.cells[0].textContent;
    document.getElementById('age').value = row.cells[1].textContent;
    document.querySelector(`input[name="Gender"][value="${row.cells[2].textContent}"]`).checked = true;
    document.getElementById('course').value = row.cells[3].textContent;
    document.getElementById('phoneno').value = row.cells[4].textContent;
    document.getElementById('email').value = row.cells[5].textContent;

    row.style.display = 'none';
}

function cancelEdit(row) {
    // Restore the previously hidden row
    row.style.display = '';
    currentEditRow = null;
}

function update() {
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const gender = document.querySelector('input[name="Gender"]:checked');
    const course = document.getElementById('course').value.trim();
    const phoneno = document.getElementById('phoneno').value.trim();
    const email = document.getElementById('email').value.trim();

    // Validate age
    if (!age || isNaN(age) || age <= 0 || age > 100) {
        alert("Please enter a valid age between 1 and 100.");
        return false;
    }
    
    // Validate inputs
    if (!name || !age || !course || !phoneno || !email || !gender) {
        alert("Please fill in all fields.");
        return;
    }

    if (!validateInputs(phoneno, email)) return;

    if (currentEditRow) {
        currentEditRow.cells[0].textContent = name;
        currentEditRow.cells[1].textContent = age;
        currentEditRow.cells[2].textContent = gender.value;
        currentEditRow.cells[3].textContent = course;
        currentEditRow.cells[4].textContent = phoneno;
        currentEditRow.cells[5].textContent = email;

        currentEditRow.style.display = '';
        currentEditRow = null; 
    } else {
        const tablelist = document.getElementById('tablelist');
        const newRow = tablelist.insertRow();
        newRow.classList.add('tr2');
        newRow.dataset.userId = currentUserId;
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${age}</td>
            <td>${gender.value}</td>
            <td>${course}</td>
            <td>${phoneno}</td>
            <td>${email}</td>
            <td>
                <button onclick="editRow(event)">Edit</button>
                <button onclick="deletelist(event)">Delete</button>
            </td>
        `;
    }

    saveToLocalStorage();
    resetForm();
}

function deletelist(event) {
    const row = event.target.parentElement.parentElement;
    const rowUserId = row.dataset.userId;

    // Check if the current user is the owner of the data
    if (rowUserId !== currentUserId) {
        alert("You can only delete your own details.");
        return;
    }

    row.remove();
    saveToLocalStorage();
}

function validateInputs(phoneno, email) {
    // Validate phone number format
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phoneno)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('course').value = '';
    document.getElementById('phoneno').value = '';
    document.getElementById('email').value = '';
    document.querySelector('input[name="Gender"]:checked').checked = false;
}

function searchTable() {
    const input = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('.tr2');

    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const course = row.cells[3].textContent.toLowerCase();
        row.style.display = (name.includes(input) || course.includes(input)) ? '' : 'none';
    });
}

function saveToLocalStorage() {
    const table = document.getElementById('tablelist');
    const rows = table.getElementsByTagName('tr');
    const data = [];

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const rowData = {
            name: cells[0].textContent,
            age: cells[1].textContent,
            gender: cells[2].textContent,
            course: cells[3].textContent,
            phoneno: cells[4].textContent,
            email: cells[5].textContent,
            userId: rows[i].dataset.userId
        };
        data.push(rowData);
    }

    localStorage.setItem('tableData', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('tableData');
    if (data) {
        const tablelist = document.getElementById('tablelist');
        const parsedData = JSON.parse(data);

        parsedData.forEach(function (rowData) {
            const newRow = tablelist.insertRow();
            newRow.classList.add('tr2');
            newRow.dataset.userId = rowData.userId;
            newRow.innerHTML = `
                <td>${rowData.name}</td>
                <td>${rowData.age}</td>
                <td>${rowData.gender}</td>
                <td>${rowData.course}</td>
                <td>${rowData.phoneno}</td>
                <td>${rowData.email}</td>
                <td>
                    <button onclick="editRow(event)">Edit</button>
                    <button onclick="deletelist(event)">Delete</button>
                </td>
            `;
        });
    }
}

// Load data from localStorage when the page loads
window.onload = function () {
    loadFromLocalStorage();
    setUserId('user1'); 
};
