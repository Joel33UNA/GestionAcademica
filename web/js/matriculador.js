
var url = 'http://localhost:8088/GestionAcademica/';
let estudiantes = [];
let grupos = [];
let matriculas = [];

async function fetchEstudiantes(){
    let request = new Request(url+'api/estudiantes/', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        let div = $("#body");
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No se encontraron estudiantes!' +
                '</div>'
        );
        estudiantes = [];
        return;
    }
    estudiantes = await response.json();
}

async function fetchCiclos(){
    let request = new Request(url+'api/ciclos/', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        let div = $("#body");
        div.html("");
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No se encontraron ciclos! Error ' + response.status +
                '</div>'
        );
        ciclos = [];
        return;
    }
    ciclos = await response.json();
}

async function fetchGruposPorCarreraYCiclo(idCarrera, idCiclo){
    request = new Request(url+'api/grupos/'+idCarrera+'/'+idCiclo, {method:'GET'});
    response = await fetch(request);
    if (!response.ok){
        let div = $(".alertasPopup");
        div.html("");
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No se encontraron grupos! Error ' + response.status +
                '</div>'
        );
        grupos = [];
        return false;
    }
    grupos = await response.json();
    return true;
}

async function fetchMatriculasPorEstudiante(estudiante){
    let request = new Request(url+'api/matriculas/'+estudiante.cedula, {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        $('.alertas').html('<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                            '¡El estudiante no posee historial académico! Error ' + response.status +
                       '</div>');
        matriculas = [];
        return;
    }
    matriculas = await response.json();
}

async function matricularEstudiante(estudiante, grupo){
    const matricula = {
        estudiante : { cedula : estudiante.cedula },
        grupo : { codigo : grupo.codigo }
    };
    const request = new Request(url+"api/matriculas", 
                            {method : 'POST', headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(matricula)});
    const response = await fetch(request);  
    if (!response.ok){
        let div = $(".alertas");
        div.html("");
        div.html(
            '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                '¡No se pudo matricular al estudiante! Error ' + response.status +
            '</div>'
        );
        return;
    }
    $('#add-modal-estudiantes').modal('hide');
    $('.alertas').html('<div class="alert alert-success" role="alert" style="padding:20px;">' +
                            '¡Se ha matriculado al estudiante correctamente!' +
                       '</div>');
}

async function loadEstudiantes(){
    await fetchEstudiantes();
    await fetchCiclos();
    let div = $("#body");
    div.html(
        '<div class="alertas"/>' +
        '<div class="divBotones">' +
            '<input type="text" id="search" placeholder="Buscar estudiantes" onkeyup="buscador_interno()">' +
        '</div>' +
        '<div class ="divBotones">' +
            '<label style="color:white;margin:10px;">Ciclo para matricular: </label>' +
            '<select id="selectCiclo" class="form-select" aria-label="Default select example" />' +
        '</div>' +
        '<table class="table table-hover table-dark" id="tablaEstudiantes" style="cursor:pointer;">' +
            '<thead>' +
                '<tr>' +
                    '<th scope="col">Cédula</th>' +
                    '<th scope="col">Nombre</th>' +
                    '<th scope="col">Teléfono</th>' +
                    '<th scope="col">Email</th>' +
                    '<th scope="col">Fecha de nacimiento</th>' +
                    '<th scope="col">Carrera</th>' +
                    '<th scope="col">Funciones</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody/>' +
        '</table>' +
        '<div id="popupEstudiantes" />'
    );
    
    let selectCiclo = $("#selectCiclo");
    ciclos.forEach((ciclo) => {
        let option = $("<option value='"+ciclo.numeroCiclo+"' selected />");
        option.html(ciclo.anio + "-" + ciclo.numeroCiclo + " (" + ciclo.codigo + ")");
        selectCiclo.append(option);
    });
    
    let tbody = $("#tablaEstudiantes tbody");
    estudiantes.forEach((estudiante) => {
        let tr = $("<tr/>");
        tr.html(
            "<th>" + estudiante.cedula + "</th>" +
            "<td>" + estudiante.nombre + "</td>" +
            "<td>" + estudiante.telefono + "</td>" +
            "<td>" + estudiante.email + "</td>" +
            "<td>" + estudiante.fechaNacimiento + "</td>" +
            "<td>" + estudiante.carrera.nombre + "</td>" +
            "<td><button type='button' class='btn btn-info' id='matricularEstudiante"+estudiante.cedula+"'>Matricular estudiante</button></td>"
        );
        tbody.append(tr);
        $("#matricularEstudiante"+estudiante.cedula).click(() => loadPopupMatricula(estudiante));
    });
}

async function loadPopupMatricula(estudiante){    
    let div = $("#popupEstudiantes");
    div.html("");
    div.html("<div class='modal fade' id='add-modal-estudiantes' aria-labelledby='myLargeModalLabel' tabindex='-1' role='dialog'>" +
                "<div class='modal-dialog modal-lg'>" +
                    "<div class='modal-content' id='infoEstudiante'>" +
                        "<div class='modal-header'>" +
                            "<div ><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                        "<div class='modal-body'>" +
                            "<p><b>Nombre: </b>" + estudiante.nombre + "</p>" +
                            "<p><b>Cédula: </b>" + estudiante.cedula + "</p>" +
                            "<p><b>Carrera: </b>" + estudiante.carrera.nombre + "</p>" +
                            "<p><b>Cursos matriculados: </b></p>" +
                            '<table class="table table-borderless" id="tablaHistorialPopup">' +
                                '<thead>' +
                                    '<tr>' +
                                        '<th scope="col">Ciclo</th>' +
                                        '<th scope="col">Curso</th>' +
                                        '<th scope="col">Créditos</th>' +
                                        '<th scope="col">Nota</th>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody/>' +
                            '</table>'+
                            "<p><b>Matricular grupo: </b></p>" +
                            '<table class="table table-borderless" id="tablaMatricularPopup">' +
                                '<thead>' +
                                    '<tr>' +
                                        '<th scope="col">Curso</th>' +
                                        '<th scope="col">Horario</th>' +
                                        '<th scope="col">Ciclo</th>' +
                                        '<th scope="col">Profesor</th>' +
                                        '<th scope="col">Funciones</th>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody/>' +
                            '</table>'+
                            '<div class="alertasPopup"/>' +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>");
    
    
    
    let tbody = $("#tablaHistorialPopup tbody");
    tbody.html("");
    await fetchMatriculasPorEstudiante(estudiante);
    matriculas.forEach((matricula) => {
        let tr = $("<tr/>");
        tr.html(
            "<td>" + matricula.grupo.ciclo.anio + "-" + matricula.grupo.ciclo.numeroCiclo + "</td>" +
            "<td>" + matricula.grupo.curso.nombre + "</td>" +
            "<td>" + matricula.grupo.curso.creditos + "</td>" +
            "<td>" + matricula.nota + "</td>"
        );
        tbody.append(tr);
    });
    
    tbody = $("#tablaMatricularPopup tbody");
    tbody.html("");
    await fetchGruposPorCarreraYCiclo(estudiante.carrera.codigo, $("#selectCiclo").val());
    grupos.forEach((grupo) => {
        let tr = $("<tr/>");
        tr.html(
            "<td>" + grupo.curso.nombre + "</td>" +
            "<td>" + grupo.horario + "</td>" +
            "<td>" + grupo.ciclo.anio + "-" + grupo.ciclo.numeroCiclo + "</td>" +
            "<td>" + grupo.profesor.nombre + "</td>" +
            "<td><button type='button' id='matricular"+grupo.codigo+"' class='btn btn-success'>Matricular</button></td>"
        );
        tbody.append(tr);
        $("#matricular"+grupo.codigo).click(() => matricularEstudiante(estudiante, grupo));
    });
    
    $('#add-modal-estudiantes').modal('show');
}

function buscador_interno() {
    var filter = document.getElementById("search");
    var li = document.getElementsByTagName("td");
    encontrado = false;
    id_encontrado = 0;
    for (i = 0; i < li.length; i++) {
        var a = li[i].textContent;
        if (a.toUpperCase().includes(filter.value.toUpperCase())) {
            encontrado = true;
            id_encontrado = li[i].parentElement;
            li[i].parentElement.style.display = "";
        } else
            if (li[i].parentElement != id_encontrado)
                li[i].parentElement.style.display = "none";
    }
    if (encontrado != true)
        for (i = 0; i < li.length; i++)
            li[i].style.display = "table-cell";
}

function loader(){
    $("#infoEstudiantes").click(loadEstudiantes);
}

$(loader);