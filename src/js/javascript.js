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

    var max_tabla = 7;

    var tabla = document.getElementById('body-table');

    var data_malware = JSON.parse(data);

    var data_malware_length = data_malware.length;

    if(data_malware_length <= max_tabla)
    {
        for(var i=0; i<data_malware_length; i++)
        {
            var numero = i+1;
            tabla.innerHTML += "<tr><td class='number_row'>#"+numero+"</td><td>"+data_malware[i].nombre+"</td><td>"+data_malware[i].hashmd5+"</td><td>"+data_malware[i].fecha+"</td><td>"+data_malware[i].actualizacion+"</td><td>"+data_malware[i].sistema+"</td><td><button class='btn-tabla' onClick='visualizar_malware("+i+")'>VISUALIZAR</button></td></tr>";
        }
    }
    else
    {
        var times = Math.ceil(data_malware_length / max_tabla);

        var ul_pagination = document.getElementById('ul_pagination');

        for(var i=0; i<max_tabla; i++)
        {
            var numero = i+1;
            tabla.innerHTML += "<tr><td class='number_row'>#"+numero+"</td><td>"+data_malware[i].nombre+"</td><td>"+data_malware[i].hashmd5+"</td><td>"+data_malware[i].fecha+"</td><td>"+data_malware[i].actualizacion+"</td><td>"+data_malware[i].sistema+"</td><td><button class='btn-tabla' onClick='visualizar_malware("+i+")'>VISUALIZAR</button></td></tr>";
        }

        for(var i=1; i<=times; i++)
        {
            var min = i-1;

            ul_pagination.innerHTML += "<li id='pagination"+i+"' class='pagination_class' onClick='change_page("+times+",pagination"+i+","+max_tabla+","+min+","+i+")'><span>"+i+"</span></li>";
        }

        document.getElementById('pagination1').classList.add("selected");
    }
}

function change_page(times, id, max_page, min, max)
{
    var data_malware = JSON.parse(data);
    var data_malware_length = data_malware.length;

    var tabla = document.getElementById('body-table');

    tabla.innerHTML = '';

    min = max_page * min;
    max = max_page * max;

    if(max > data_malware_length)
    {
        max = data_malware_length;
    }

    for(var i=min; i<max; i++)
    {
        var numero = i+1;
        tabla.innerHTML += "<tr><td class='number_row'>#"+numero+"</td><td>"+data_malware[i].nombre+"</td><td>"+data_malware[i].hashmd5+"</td><td>"+data_malware[i].fecha+"</td><td>"+data_malware[i].actualizacion+"</td><td>"+data_malware[i].sistema+"</td><td><button class='btn-tabla pointer' onClick='visualizar_malware("+i+")'>VISUALIZAR</button></td></tr>";
    }

    for(var i=1; i<=times; i++)
    {
        document.getElementById('pagination'+i).classList.remove("selected");
    }

    id.classList.add("selected");
}

function visualizar_malware(number)
{
    var modal = document.getElementById("visualizarModal");
    modal.style.display = "block";

    var x = [];
    var y = [];
    var ficheros = [];

    var reporte = number + 1;

    document.getElementById('titulo_dashboard').innerHTML = '<strong>REPORTE NÚMERO #'+reporte+'</strong>';

    var nombre_fichero = document.getElementById('nombre_fichero');
    var extension_fichero = document.getElementById('extension_fichero');
    var tam_fichero = document.getElementById('tam_fichero');
    var hash_md5 = document.getElementById('hash_md5');
    var hash_sha256 = document.getElementById('hash_sha256');
    var hash_sha1 = document.getElementById('hash_sha1');
    var puntuacion = document.getElementById('percentage_graph');
    var percentage_puntuacion_array = document.getElementById('percentage_puntuacion_array');

    var data_malware = JSON.parse(data);

    nombre_fichero.innerHTML = "Nombre: " + data_malware[number].nombre;
    extension_fichero.innerHTML = "Extension: " + data_malware[number].extension;
    tam_fichero.innerHTML = "Tamaño: " + data_malware[number].tam;
    hash_md5.innerHTML = data_malware[number].hashmd5;
    hash_sha256.innerHTML = data_malware[number].hashsha256;
    hash_sha1.innerHTML = data_malware[number].hashsha1;
    puntuacion.innerHTML = data_malware[number].puntuacion + '%';
    percentage_puntuacion_array.setAttribute('stroke-dasharray', ""+data_malware[number].puntuacion+",100");

    //GRÁFICO LINEAR

    var puntuacion_ficheros = data_malware[number].puntuacion_ficheros;
    var count = Object.keys(puntuacion_ficheros).length;
    var fichero = data_malware[number].ficheros;

    for(var i=1; i<=count; i++)
    {
        x.push(i);
        y.push(puntuacion_ficheros['fichero'+i]);
        ficheros.push(fichero['fichero'+i]);
    }
    
    var trace1 = {
        x: x,
        y: y,
        type: 'scatter',
        name: 'Importancia ficheros',
        text: ficheros
    };

    var layout_trace1 = {
        height: 400,
        width: 500,
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
        },
        xaxis: {
            showgrid: false,
            zeroline: false,
            showline: false,
            showticklabels: false,
            linecolor: 'rgb(204,204,204)',
            linewidth: 2,
            autotick: false,
            ticks: 'outside',
            tickcolor: 'rgb(204,204,204)',
            tickwidth: 2,
            ticklen: 5,
            tickfont: {
              family: 'Arial',
              size: 12,
              color: 'rgb(82, 82, 82)'
            }
          },
          yaxis: {
            showgrid: false,
            zeroline: false,
            showline: false,
            showticklabels: true
          },
          autosize: true,
    };

    data = [trace1];

    var plotly_line = document.getElementById('plotly_line');
    Plotly.newPlot(plotly_line, data, layout_trace1);

    // TABLA IPS

    

    var cerrar_span = document.getElementById("cerrar_boton_modal");

    cerrar_span.onclick = function()
    {
        modal.style.display = "none";
    }
}