
var url = 'http://localhost:8088/GestionAcademica-Backend/';

let ciclos = {};
let carreras = {};
let cursos = {};
let estudiantes = {};
let profesores = {};

async function loadCiclos(){
    let request = new Request(url+'api/ciclos/', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        let div = $("#body");
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No se encontraron ciclos!' +
                '</div>'
        );
        return;
    }
    ciclos = await response.json();
    let div = $("#body");
    div.html(
        '<div class="divBotones">' +
            '<button type="button" class="btn btn-secondary">Ordenar por código</button>' +
            '<button type="button" class="btn btn-secondary">Ordenar por nombre</button>' +
//          '<button type="button" class="btn btn-info">Agregar Ciclo</button>' +
        '</div>' +
        '<table class="table table-dark" id="tablaCiclos">' +
            '<thead>' +
                '<tr>' +
                    '<th scope="col">Código</th>' +
                    '<th scope="col">Año</th>' +
                    '<th scope="col">Número de ciclo</th>' +
                    '<th scope="col">Fecha inicio</th>' +
                    '<th scope="col">Fecha final</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody/>' +
        '</table>'
    );
    let tbody = $("#tablaCiclos tbody");
    ciclos.forEach((ciclo) => {
        let tr = $("<tr/>");
        tr.html(
            "<th>" + ciclo.codigo + "</th>" +
            "<td>" + ciclo.anio + "</td>" +
            "<td>" + ciclo.numeroCiclo + "</td>" +
            "<td>" + ciclo.fechaInicio + "</td>" +
            "<td>" + ciclo.fechaFin + "</td>"
        );
        tbody.append(tr);
    });
}

async function loadCarreras(){
    let request = new Request(url+'api/carreras/', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        let div = $("#body");
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No se encontraron carreras!' +
                '</div>'
        );
        return;
    }
    carreras = await response.json();
    let div = $("#body");
    div.html(
        '<div class="divBotones">' +
            '<button type="button" class="btn btn-secondary">Ordenar por código</button>' +
            '<button type="button" class="btn btn-secondary">Ordenar por nombre</button>' +
//          '<button type="button" class="btn btn-info">Agregar Ciclo</button>' +
        '</div>' +
        '<table class="table table-dark" id="tablaCarreras">' +
            '<thead>' +
                '<tr>' +
                    '<th scope="col">Código</th>' +
                    '<th scope="col">Nombre</th>' +
                    '<th scope="col">Título</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody/>' +
        '</table>'
    );
    let tbody = $("#tablaCarreras tbody");
    carreras.forEach((carrera) => {
        let tr = $("<tr/>");
        tr.html(
            "<th>" + carrera.codigo + "</th>" +
            "<td>" + carrera.nombre + "</td>" +
            "<td>" + carrera.titulo + "</td>"
        );
        tbody.append(tr);
    });
}

async function loadCursos(){
    let request = new Request(url+'api/cursos/', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        let div = $("#body");
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No se encontraron cursos!' +
                '</div>'
        );
        return;
    }
    cursos = await response.json();
    let div = $("#body");
    div.html(
        '<div class="divBotones">' +
            '<button type="button" class="btn btn-secondary">Ordenar por código</button>' +
            '<button type="button" class="btn btn-secondary">Ordenar por nombre</button>' +
            '<button type="button" class="btn btn-info">Agregar Curso</button>' +
        '</div>' +
        '<table class="table table-dark" id="tablaCursos">' +
            '<thead>' +
                '<tr>' +
                    '<th scope="col">Código</th>' +
                    '<th scope="col">Nombre</th>' +
                    '<th scope="col">Horas semanales</th>' +
                    '<th scope="col">Créditos</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody/>' +
        '</table>'
    );
    let tbody = $("#tablaCursos tbody");
    cursos.forEach((curso) => {
        let tr = $("<tr/>");
        tr.html(
            "<th>" + curso.codigo + "</th>" +
            "<td>" + curso.nombre + "</td>" +
            "<td>" + curso.horasSemanales + "</td>" +
            "<td>" + curso.creditos + "</td>"
        );
        tbody.append(tr);
    });
}

async function loadEstudiantes(){
    let request = new Request(url+'api/estudiantes/', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        let div = $("#body");
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No se encontraron estudiantes!' +
                '</div>'
        );
        return;
    }
    estudiantes = await response.json();
    let div = $("#body");
    div.html(
        '<div class="divBotones">' +
            '<button type="button" class="btn btn-secondary">Ordenar por cédula</button>' +
            '<button type="button" class="btn btn-secondary">Ordenar por nombre</button>' +
//          '<button type="button" class="btn btn-info">Agregar Estudiante</button>' +
        '</div>' +
        '<table class="table table-dark" id="tablaEstudiantes">' +
            '<thead>' +
                '<tr>' +
                    '<th scope="col">Cédula</th>' +
                    '<th scope="col">Nombre</th>' +
                    '<th scope="col">Teléfono</th>' +
                    '<th scope="col">Email</th>' +
                    '<th scope="col">Fecha de nacimiento</th>' +
                    '<th scope="col">Código carrera</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody/>' +
        '</table>'
    );
    let tbody = $("#tablaEstudiantes tbody");
    estudiantes.forEach((estudiante) => {
        let tr = $("<tr/>");
        tr.html(
            "<th>" + estudiante.cedula + "</th>" +
            "<td>" + estudiante.nombre + "</td>" +
            "<td>" + estudiante.telefono + "</td>" +
            "<td>" + estudiante.email + "</td>" +
            "<td>" + estudiante.fechaNacimiento + "</td>" +
            "<td>" + estudiante.carrera + "</td>"
        );
        tbody.append(tr);
    });
}

async function loadProfesores(){
    let request = new Request(url+'api/profesores/', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        let div = $("#body");
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No se encontraron profesores!' +
                '</div>'
        );
        return;
    }
    profesores = await response.json();
    let div = $("#body");
    div.html(
        '<div class="divBotones">' +
            '<button type="button" class="btn btn-secondary">Ordenar por cédula</button>' +
            '<button type="button" class="btn btn-secondary">Ordenar por nombre</button>' +
//          '<button type="button" class="btn btn-info">Agregar Profesor</button>' +
        '</div>' +
        '<table class="table table-dark" id="tablaProfesores">' +
            '<thead>' +
                '<tr>' +
                    '<th scope="col">Cédula</th>' +
                    '<th scope="col">Nombre</th>' +
                    '<th scope="col">Teléfono</th>' +
                    '<th scope="col">Email</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody/>' +
        '</table>'
    );
    let tbody = $("#tablaEstudiantes tbody");
    profesores.forEach((profesor) => {
        let tr = $("<tr/>");
        tr.html(
            "<th>" + profesor.cedula + "</th>" +
            "<td>" + profesor.nombre + "</td>" +
            "<td>" + profesor.telefono + "</td>" +
            "<td>" + profesor.email + "</td>"
        );
        tbody.append(tr);
    });
}

function loader(){
    $("#infoCiclos").click(loadCiclos);
    $("#infoCarreras").click(loadCarreras);
    $("#infoCursos").click(loadCursos)
    $("#infoEstudiantes").click(loadEstudiantes);
    $("#infoProfesores").click(loadProfesores);
}

$(loader);


