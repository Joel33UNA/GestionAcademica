
var url = 'http://localhost:8088/GestionAcademica/';

let matriculas = {};
let estudiante = {};

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
        "<div class = 'col-auto p-5 text-center'>"+
            "<div class = bg-secondary>"+
                "<dl class = 'text-white'>" +
                    '<dt>Cédula</dt>'+
                        '<dd>' + estudiante.cedula + '</dd>'+
                    '<dt>Nombre</dt>'+
                        '<dd>' + estudiante.nombre + '</dd>'+
                    '<dt>Teléfono</dt>'+
                        '<dd>' + estudiante.telefono + '</dd>'+
                    '<dt>Correo electrónico</dt>'+
                        '<dd>' + estudiante.email + '</dd>'+
                    '<dt>Fecha de nacimiento</dt>'+
                        '<dd>' + estudiante.fechaNacimiento + '</dd>'+
                    '<dt>Carrera</dt>'+
                        '<dd>' + estudiante.carrera.nombre + '</dd>'+
                    '<dt>Título de carrera</dt>'+
                        '<dd>' + estudiante.carrera.titulo + '</dd>'+
                '</dl>'+
            "</div>"+
        "</div>"
    );
}

async function loadHistorial(){
    estudiante = JSON.parse(sessionStorage.getItem('user'));
    let request = new Request(url+'api/matriculas/'+estudiante.cedula, {method: 'GET', headers: { }});
    const response = await fetch(request);
	let div = $("#body").html("");
    if (!response.ok){
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No cuenta con historial académico!' +
                '</div>'
        );
        return;
    }
    matriculas = await response.json();
	matriculas.sort((a,b)=> {return a.grupo.ciclo.numeroCiclo - b.grupo.ciclo.numeroCiclo});
        matriculas.sort((a,b)=> {return a.grupo.ciclo.anio - b.grupo.ciclo.anio});
	div.html(
        "<div class = 'col-auto p-5 text-center'>"+
            "<div class = bg-secondary>"+
                '<h3 class = "text-white"> Estudiante: ' + estudiante.cedula + '</h3>' +
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
                '</table>'+
            '</div>'+
        '</div>'
    );
    let tbody = $("#tablaHistorial tbody");
    matriculas.forEach((matricula) => {
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
}

$(loader);


