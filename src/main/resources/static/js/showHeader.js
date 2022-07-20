function showHeader() {
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

            content += '<span><b style="color: aliceblue">' + currentUser.email + '</b> </span>';
            content += '<span style="color: aliceblue"> with roles: </span>'
            content += '<span><b style="color: aliceblue">' + roles + '</b> </span>';
            $('#header').append(content);
        })
}

showHeader();
