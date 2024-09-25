function update() {
    var name = document.getElementById('name').value.trim();
    var age = document.getElementById('age').value.trim();
    var gender = document.querySelector('input[name="Gender"]:checked');
    var course = document.getElementById('course').value.trim();
    var phoneno = document.getElementById('phoneno').value.trim();
    var email = document.getElementById('email').value.trim();

    if (!name || !age || !course || !phoneno || !email || !gender) {
        alert("Please fill in all fields.");
        return;
    }

    var tablelist = document.getElementById('tablelist');
    var newRow = tablelist.insertRow();

    newRow.classList.add('tr2');
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${age}</td>
        <td>${gender.value}</td>
        <td>${course}</td>
        <td>${phoneno}</td>
        <td>${email}</td>
        <td><button onclick="deletelist(event)">Delete</button></td>
    `;

    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('course').value = '';
    document.getElementById('phoneno').value = '';
    document.getElementById('email').value = '';
    document.querySelector('input[name="Gender"]:checked').checked = false;
}

function deletelist(event) {
    var row = event.target.parentElement.parentElement; 
    row.remove();
}