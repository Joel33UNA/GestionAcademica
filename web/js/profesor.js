
var url = 'http://localhost:8088/GestionAcademica/';

let matriculas = {};
let profesor = {};
let estudiantes = {};
let grupos = [];
let estuds = [];

async function loadProfesor(){
    profesor = JSON.parse(sessionStorage.getItem('user'));
    let request = new Request(url+'api/profesores/'+profesor.cedula, {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        let div = $("#body");
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No se encontró el profesor!' +
                '</div>'
        );
        return;
    }
    profesor = await response.json();
    let div = $("#body");
    div.html(
        "<div class = 'col-auto p-5 text-center'>"+
            "<div class = bg-secondary>"+
                "<dl class = 'text-white'>" +
                    '<dt>Cédula'+
                        '<dd>' + profesor.cedula + '</dd>'+
                    '</dt>' +
                    '<dt>Nombre'+
                        '<dd>' + profesor.nombre + '</dd>'+
                    '</dt>'+
                    '<dt>Teléfono'+
                        '<dd>' + profesor.telefono + '</dd>'+
                    '</dt>'+
                    '<dt>Correo electrónico'+
                        '<dd>' + profesor.email + '</dd>'+
                    '</dt>'+
                '</dl>'+
            "</div>"+
        "</div>"
    );
}

async function loadEstudiantes(){
    let request = new Request(url+'api/estudiantes', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        let div = $("#body");
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No se encontraron los estudiantes!' +
                '</div>'
        );
        return;
    }
    estudiantes = await response.json();
}

async function loadGrupos(){
    loadEstudiantes();
    profesor = JSON.parse(sessionStorage.getItem('user'));
    let request = new Request(url+'api/matriculas/'+profesor.cedula, {method: 'GET', headers: { }});
    const response = await fetch(request);
    let div = $("#body").html("");
    if (!response.ok){
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No cuenta con grupos asignados!' +
                '</div>'
        );
        return;
    }
    matriculas = await response.json();
    matriculas.forEach((matricula)=>{
       grupos.push(matricula.grupo);
    });
    
    grupos.forEach((grupoo)=>{
        llenarGrupos(grupoo.codigo);
    });
    div.html(
    "<div class = 'col-auto p-5 text-center'>"+
        "<div class = bg-secondary>"+
            '<h3 class = "text-white"> Grupos de ' + profesor.cedula + '</h3>' +
            '<table class="table table-dark" id="tablaGrupos">' +
                '<thead>' +
                    '<tr>' +
                        '<th scope="col">Curso</th>' +
                        '<th scope="col">Número de grupo</th>' +
                        '<th scope="col"></th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody/>' +
            '</table>'+
        '</div>'+
    '</div>'
    );
    let tbody = $("#tablaGrupos tbody");
    grupos.forEach((g) => {
        let tr = $("<tr/>");
        tr.html(
            "<td>" + g.curso.nombre + "</td>" +
            "<td>" + g.codigo + "</td>" +
            "<td id = 'agrNota'> Clic aquí para agregar notas</td>"
        );
        tbody.append(tr);
    });
}

function llenarGrupos(codigo){
    estudiantes.forEach((est)=>{
        if(est.grupo.codigo === codigo){
            estuds.push(est);
        }
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
    $("#infoProfesor").click(loadProfesor);
    $("#infoGrupos").click(loadGrupos);
    $("#signoff").click(signoff);
}

$(loader);


