function checkLogin()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var text_login = document.getElementById("text_login");

    var data_username = JSON.parse(admin);

    if(username === data_username[0].username && password === data_username[0].password)
    {
        alert('Exito');
        text_login.textContent = "";
    }
    else
    {
        alert('No');
        text_login.textContent = "Usuario y contraseña no válidos.";
    }

    event.preventDefault();
}