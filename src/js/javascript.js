function checkLogin()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var text_login = document.getElementById("text_login");

    fetch("../src/js/datos.json")
    .then(function(resp)
    {
        return resp.json();
    })
    .then(function(data){
        if(username === data.admin[0].username && password === data.admin[0].password)
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
    });

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

    fetch("../src/js/datos.json")
    .then(function(resp)
    {
        return resp.json();
    })
    .then(function(data){
        var data_malware_length = data.datos.length;

        if(data_malware_length <= max_tabla)
        {
            for(var i=0; i<data_malware_length; i++)
            {
                var numero = i+1;
                tabla.innerHTML += "<tr><td class='number_row'>#"+numero+"</td><td>"+data.datos[i].nombre+"</td><td>"+data.datos[i].hashmd5+"</td><td>"+data.datos[i].fecha+"</td><td>"+data.datos[i].actualizacion+"</td><td>"+data.datos[i].sistema+"</td><td><button class='btn-tabla' onClick='visualizar_malware("+i+")'>VISUALIZAR</button></td></tr>";
            }
        }
        else
        {
            var times = Math.ceil(data_malware_length / max_tabla);
    
            var ul_pagination = document.getElementById('ul_pagination');
    
            for(var i=0; i<max_tabla; i++)
            {
                var numero = i+1;
                tabla.innerHTML += "<tr><td class='number_row'>#"+numero+"</td><td>"+data.datos[i].nombre+"</td><td>"+data.datos[i].hashmd5+"</td><td>"+data.datos[i].fecha+"</td><td>"+data.datos[i].actualizacion+"</td><td>"+data.datos[i].sistema+"</td><td><button class='btn-tabla' onClick='visualizar_malware("+i+")'>VISUALIZAR</button></td></tr>";
            }
    
            for(var i=1; i<=times; i++)
            {
                var min = i-1;
    
                ul_pagination.innerHTML += "<li id='pagination"+i+"' class='pagination_class' onClick='change_page("+times+",pagination"+i+","+max_tabla+","+min+","+i+")'><span>"+i+"</span></li>";
            }
    
            document.getElementById('pagination1').classList.add("selected");
        }
    });
}

function change_page(times, id, max_page, min, max)
{

    var tabla = document.getElementById('body-table');

    tabla.innerHTML = '';

    min = max_page * min;
    max = max_page * max;

    fetch("../src/js/datos.json")
    .then(function(resp)
    {
        return resp.json();
    })
    .then(function(data){
        var data_malware_length = data.datos.length;

        if(max > data_malware_length)
        {
            max = data_malware_length;
        }
    
        for(var i=min; i<max; i++)
        {
            var numero = i+1;
            tabla.innerHTML += "<tr><td class='number_row'>#"+numero+"</td><td>"+data.datos[i].nombre+"</td><td>"+data.datos[i].hashmd5+"</td><td>"+data.datos[i].fecha+"</td><td>"+data.datos[i].actualizacion+"</td><td>"+data.datos[i].sistema+"</td><td><button class='btn-tabla pointer' onClick='visualizar_malware("+i+")'>VISUALIZAR</button></td></tr>";
        }
    
        for(var i=1; i<=times; i++)
        {
            document.getElementById('pagination'+i).classList.remove("selected");
        }
    
        id.classList.add("selected");
    });
}

function visualizar_malware(number)
{

    var modal = document.getElementById("visualizarModal");
    modal.style.display = "block";

    var x = [];
    var y = [];
    var y_danio = [];
    var ficheros = [];
    var antivirus_listado = [];

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

    fetch("../src/js/datos.json")
    .then(function(resp)
    {
        return resp.json();
    })
    .then(function(data){
        
        nombre_fichero.innerHTML = "Nombre: " + data.datos[number].nombre;
        extension_fichero.innerHTML = "Extension: " + data.datos[number].extension;
        tam_fichero.innerHTML = "Tamaño: " + data.datos[number].tam;
        hash_md5.innerHTML = data.datos[number].hashmd5;
        hash_sha256.innerHTML = data.datos[number].hashsha256;
        hash_sha1.innerHTML = data.datos[number].hashsha1;
        puntuacion.innerHTML = data.datos[number].puntuacion + '%';
        percentage_puntuacion_array.setAttribute('stroke-dasharray', ""+data.datos[number].puntuacion+",100");


        //TABLA IPS

        var ips = data.datos[number].ip;
        var tabla = document.getElementById('body-table-ip');
        tabla.innerHTML = '';
        var count = Object.keys(ips[0]).length;

        if(count == 0)
        {
            document.getElementById('table_ip').style.display = "none";
        }
        else
        {
            document.getElementById('table_ip').style.display = "block";
            for (var i=1; i<=count; i++)
            {
                tabla.innerHTML += "<tr><td class='number_row'>#"+i+"</td><td>"+ips[0]['ip'+i]+"</td></tr>";
            }
        }

        // TABLA FICHEROS

        document.getElementById('body-table-ficheros').innerHTML = '';

        var fichero = data.datos[number].ficheros;
        var count = Object.keys(fichero[0]).length;

        if(count == 0)
        {
            document.getElementById('table_ficheros').style.display = "none";
            document.getElementById('graph_plotly').style.display = "none";
        }
        else
        {
            document.getElementById('table_ficheros').style.display = "table";
            document.getElementById('graph_plotly').style.display = "block";

            var th_table = document.getElementById('th-table');

            var antivirus = data.datos[number].antivirus;
            var count_antivirus = Object.keys(antivirus).length;

            th_table.innerHTML = '';
            th_table.innerHTML = '<th></th><th><strong>Ficheros</strong></th>';

            for(var i=0; i<count_antivirus; i++)
            {
                antivirus_listado.push(Object.keys(antivirus[i]));
                th_table.innerHTML += '<th><strong>'+Object.keys(antivirus[i])+'</strong></th>';
            }
        
            var clase_style = '';
            document.getElementById('body-table-ficheros').innerHTML = '';

            for(var i=1; i<=count; i++)
            {
                var table = '';

                table += "<tr><td class='number_row'>#"+i+"</td><td>"+fichero[0]['fichero'+i]+"</td>";

                for(var u=0; u<antivirus_listado.length; u++)
                {
                    if(antivirus[u][antivirus_listado[u]][0]['fichero'+i] === 'clean')
                    {
                        clase_style = 'color: green; font-weight: bold';
                    }
                    else
                    {
                        clase_style = 'color: #CA4935; font-weight: bold;';
                    }

                    table += "<td style='"+clase_style+"' class='mayus'>"+antivirus[u][antivirus_listado[u]][0]['fichero'+i]+"</td>";
                }

                table += "</tr>";

                console.log(table);
                document.getElementById('body-table-ficheros').innerHTML += table;
            }

            // GRAFICO LINEAR 

            var puntuacion_ficheros = data.datos[number].puntuacion_ficheros;
            var count = Object.keys(puntuacion_ficheros[0]).length;


            var danio_ficheros = data.datos[number].danio_ficheros;

            for(var i=1; i<=count; i++)
            {
                x.push(i);
                y.push(puntuacion_ficheros[0]['fichero'+i]);
                ficheros.push(fichero[0]['fichero'+i]);
                y_danio.push(danio_ficheros[0]['fichero'+i]);
            }

            var trace1 = {
                x: x,
                y: y,
                type: 'scatter',
                name: 'Importancia ficheros',
                text: ficheros
            };

            var trace2 = {
                x: x,
                y: y_danio,
                type: 'scatter',
                name: 'Daño ficheros',
                text: ficheros
            };

            var layout_trace1 = {
                height: 450,
                width: 600,
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
        
            data = [trace1, trace2];

            var config = {responsive: true}
        
            var plotly_line = document.getElementById('plotly_line');
            Plotly.newPlot(plotly_line, data, layout_trace1, config);

        }

    });

    var cerrar_span = document.getElementById("cerrar_boton_modal");

    cerrar_span.onclick = function()
    {
        modal.style.display = "none";
    }
}