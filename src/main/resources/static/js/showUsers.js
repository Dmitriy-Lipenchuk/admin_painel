const modalEditButton = document.querySelector("#modalEditButton");
modalEditButton.addEventListener("click", edit);

const newUserButton = document.querySelector("#createUserButton");
newUserButton.addEventListener("click", addNewUser);

const deleteUserButton = document.querySelector("#modalDeleteButton");
deleteUserButton.addEventListener("click", deleteUser);


function showUsers() {

    fetch("/users")
        .then((response) => {
            return response.json();
        })
        .then((users) => {
            users.forEach((user) => {
                var content = '';
                var roles = "";

                user.roles.forEach((role) => {
                    roles += role.role + ' ';
                });

                content += '<tr>';
                content += '<td>' + user.id + '</td>';
                content += '<td>' + user.name + '</td>';
                content += '<td>' + user.email + '</td>';
                content += '<td>' + user.age + '</td>';
                content += '<td>' + roles + '</td>';
                content += '<td>\n' +
                    '<button type="button" class="btn btn-primary" data-bs-toggle="modal" ' +
                    'data-bs-target="#editModal" data-bs-whatever="' + user.id + '">' +
                    'Edit' +
                    '</button>' +
                    '</td>';
                content += '<td>\n' +
                    '<button type="button" class="btn btn-danger" data-bs-toggle="modal" ' +
                    'data-bs-target="#deleteModal" data-bs-whatever="' + user.id + '">' +
                    'Delete' +
                    '</button>' +
                    '</td>';
                content += '</tr>';
                $('#tableTr').append(content);
            });
        });

}


var editModal = document.getElementById('editModal');
editModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var id = button.getAttribute('data-bs-whatever');

    var idInput = editModal.querySelector('#inputID');
    var nameInput = editModal.querySelector('#inputUserName');
    var emailInput = editModal.querySelector('#inputEmail');
    var ageInput = editModal.querySelector('#inputAge');

    fetch('/users/' + id)
        .then((response) => {
            return response.json();
        })
        .then((user) => {
            idInput.value = id;
            nameInput.value = user.name;
            emailInput.value = user.email;
            ageInput.value = user.age;
        });


})

var deleteModal = document.getElementById('deleteModal');
deleteModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var id = button.getAttribute('data-bs-whatever');

    var idInput = deleteModal.querySelector('#deleteID');
    var nameInput = deleteModal.querySelector('#deleteUserName');
    var emailInput = deleteModal.querySelector('#deleteEmail');
    var ageInput = deleteModal.querySelector('#deleteAge');

    fetch('/users/' + id)
        .then((response) => {
            return response.json();
        })
        .then((user) => {
            idInput.value = id;
            nameInput.value = user.name;
            emailInput.value = user.email;
            ageInput.value = user.age;
        });

})


function edit() {
    sendUserToDB();
    setTimeout(updateTable, 550);
}

function sendUserToDB() {
    var editForm = document.getElementById("editForm");
    var formData = new FormData(editForm);

    var user = {
        id: formData.get('id'),
        name: formData.get('name'),
        email: formData.get('email'),
        age: formData.get('age'),
        password: formData.get('password'),
        roles: Array.from(document.getElementById("editRole"))
            .filter(option => option.selected)
            .map(option => ({role: option.value, id: -1}))
    }

    fetch('/admin', {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(console.log);
}

function updateTable() {
    $('#tableTr').empty();
    showUsers();
}

function addNewUser() {
    newUserToDB();
    showUsersTab();
    setTimeout(updateTable, 550);
}

function newUserToDB() {
    var createForm = document.getElementById("createForm");
    var formData = new FormData(createForm);

    var user = {
        name: formData.get('name'),
        email: formData.get('email'),
        age: formData.get('age'),
        password: formData.get('password'),
        roles: Array.from(document.getElementById("createRole"))
            .filter(option => option.selected)
            .map(option => ({role: option.value, id: -1}))
    }

    fetch('/admin', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(console.log);
}

function showUsersTab() {
    var triggerEl = document.querySelector('#myTab a[href="#users-table"]')
    bootstrap.Tab.getInstance(triggerEl).show() // Select tab by name
}

function deleteUser() {
    deleteFromDB();
    setTimeout(updateTable, 550);
}

function deleteFromDB () {
    var deleteForm = document.getElementById("deleteForm");
    var formData = new FormData(deleteForm);

    var user = {
        id: formData.get('id')
    }

    fetch('/admin', {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(console.log);
}

showUsers();