function checkLogin()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var text_login = document.getElementById("text_login");

    var data_username = JSON.parse(admin);

    if(username === data_username[0].username && password === data_username[0].password)
    {
        sessionStorage.setItem("username", username);
        text_login.textContent = "";
        window.location.href = 'data.html';
    }
    else
    {
        text_login.textContent = "Usuario y contraseña no válidos.";
        sessionStorage.clear();
    }

    event.preventDefault();
}

function cerrarSesion()
{
    sessionStorage.clear();
    window.location.href = 'index.html';
}

function myFunction(x)
{
    x.classList.toggle("change");
    var input = document.getElementById('btn-menu');
    var label_input = document.getElementById('label-input');
    var menu = document.getElementById('nav-menu');

    if(label_input.classList.contains('change'))
    {
        menu.style.transform = "translateX(0%)";
        menu.style.width = "30%";
        menu.style.zIndex = "0";
    
        input.style.zIndex = "3";
    }
    else
    {
        menu.style.transform = "translateX(-300%)";
        menu.style.zIndex = "3";
    }
}

function rellenarTabla()
{
    var tabla = document.getElementById('body-table');

    var data_malware = JSON.parse(data);

    for(var i=0; i<data_malware.length; i++)
    {
        tabla.innerHTML += "<tr><td>"+data_malware[i].nombre+"</td><td>"+data_malware[i].hashmd5+"</td><td>"+data_malware[i].fecha+"</td><td>"+data_malware[i].actualizacion+"</td><td>"+data_malware[i].sistema+"</td><td><button class='view_malware'>Visualizar</button></td><td><button class='update_malware' onClick='update_malware("+i+")'>Actualizar</button></td><td><button class='delete_malware'>Borrar</button></td></tr>";
    }
}

function update_malware(number)
{
    var modal = document.getElementById("actualizarModal");
    modal.style.display = "block";

    var cerrar_span = document.getElementById("cerrar_boton");

    
    cerrar_span.onclick = function()
    {
        modal.style.display = "none";
    }
}