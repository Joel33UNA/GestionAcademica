
var url = 'http://localhost:8088/GestionAcademica';

let matriculas = {};
const estudiante = {};


async function loadEstudiante(){
	estudiante = JSON.parse(sessionStorage.getItem('user'));
    let request = new Request(url+'api/estudiantes/'+estudiante.cedula, {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        let div = $("#body");
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No se encontró el estudiante!' +
                '</div>'
        );
        return;
    }
    estudiante = await response.json();
    let div = $("#body");
    div.html(
        '<div class="divBotones">' +
            '<button type="button" class="btn btn-secondary">Consultar historial académico</button>' +
        '</div>' +
        '<table class="table table-dark" id="tablaEstudiante">' +
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
    let tbody = $("#tablaEstudiante tbody");
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
}

async function loadHistorial(){
    let request = new Request(url+'api/matriculas/'+estudiante.cedula, {method: 'GET', headers: { }});
    const response = await fetch(request);
	let div = $("#body").html("");
    if (!response.ok){
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No se encontraron matriculas!' +
                '</div>'
        );
        return;
    }
    matriculas = await response.json();
	matOrdered = matriculas.sort();  // ordenar el array por medio de numero de ciclo y anio???
	let h3 = $("<h3>'Estudiante: ' + estudiante.nombre </h3>");
	div.append(h3);
	div.html(
        '<h3>Estudiante: ' + estudiante.nombre + '</h3>' +
        '<table class="table table-dark" id="tablaHistorial">' +
            '<thead>' +
                '<tr>' +
                    '<th scope="col">Ciclo</th>' +
                    '<th scope="col">Curso</th>' +
                    '<th scope="col">Créditos</th>' +
                    '<th scope="col">Nota</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody/>' +
        '</table>'
    );
    let tbody = $("#tablaHistorial tbody");
    matOrdered.forEach((matricula) => {
        let tr = $("<tr/>");
        tr.html(
            "<td>" + matricula.grupo.ciclo.numeroCiclo+ " " + matricula.grupo.ciclo.anio + "</td>" +
            "<td>" + matricula.grupo.curso.nombre + "</td>" +
            "<td>" + matricula.grupo.curso.creditos + "</td>" +
            "<td>" + matricula.nota + "</td>"
        );
        tbody.append(tr);
    });
}

async function signoff(){
    let request = new Request(url+'api/sesiones/', {method: 'DELETE', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    sessionStorage.removeItem("user");
    location.href = "/http://localhost:8088/GestionAcademica";
}

function loader(){
    $("#infoEstudiante").click(loadEstudiante);
    $("#infoHistorial").click(loadHistorial);
    $("#signoff").click(signoff);
    $("#signoff").html("Cerrar Sesión (" + estudiante.nombre + ")");
}

$(loader);


