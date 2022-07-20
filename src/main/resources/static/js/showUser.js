function showUser() {
    fetch('/current-user')
        .then((response) => {
            return response.json();
        })
        .then((currentUser) => {
            var content = '';
            var roles = "";

            currentUser.roles.forEach((role) => {
                roles += role.role + ' ';
            });

            content += '<tr>';
            content += '<td>' + currentUser.id + '</td>';
            content += '<td>' + currentUser.name + '</td>';
            content += '<td>' + currentUser.email + '</td>';
            content += '<td>' + currentUser.age + '</td>';
            content += '<td>' + roles + '</td>';
            content += '</tr>';
            $('#singleUserTable').append(content);
        })
}

showUser();