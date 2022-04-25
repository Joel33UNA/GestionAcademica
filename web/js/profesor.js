
var url = 'http://localhost:8088/GestionAcademica/';

let matriculas = {};
let profesor = {};
<<<<<<< HEAD
=======
let estudiantes = {};
>>>>>>> 583f02babe16923726625823588272ec30db26a3
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

<<<<<<< HEAD
async function loadGrupos(){
    //loadEstudiantes();
=======
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
>>>>>>> 583f02babe16923726625823588272ec30db26a3
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
<<<<<<< HEAD
    div = $("#body");
    div.html(
        '<div class="alertas"/>' +
        '<table class="table table-dark" id="tablaGrupos">' +
            '<thead>' +
                '<tr>' +
                    '<th scope="col">Curso</th>' +
                    '<th scope="col">Número de grupo</th>' +
                    '<th scope="col"></th>' +
                '</tr>' +
            '</thead>' +
            '<tbody/>' +
        '</table>' +
        '<div id="popupEstudiantes" />'+
        '<div id="popupAddNota" />'
    );
    let tbody = $("#tablaGrupos tbody");
    matriculas.forEach((matricula) => {
        let tr = $("<tr/>");
        tr.html(
            "<th>" + matricula.grupo.curso.nombre + "</th>" +
            "<td>" + matricula.grupo.codigo + "</td>" +
            "<td id='botonEstudiantes'>" +
                "<button type='button' class='btn btn-success' style='margin:2px;' id='"+matricula.grupo.codigo+"'>Ver estudiantes</button>" +
            "</td>"
        );
        tbody.append(tr);
        $("#"+matricula.grupo.codigo).click(() => loadPopupEstudiantes(matricula));
    });
}

function loadPopupEstudiantes(mat){
    let div = $('#popupEstudiantes');
    div.html("");
    div.html("<div class='modal fade' id='add-modal-estudiantes' aria-labelledby='myLargeModalLabel' tabindex='-1' role='dialog'>" +
                "<div class='modal-dialog modal-lg'>" +
                    "<div class='modal-content' id='infoGrupo'>" +
                        "<div class='modal-header'>" +
                            "<div ><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                            "<p><b>Estudiantes del grupo: </b></p>" +
                            "<table class='table table-borderless' id='tablaEstudiantesGrupo'>" +
                                "<thead>" +
                                  "<tr>" +
                                    '<th scope="col">Cédula</th>' +
                                    '<th scope="col">Nombre</th>' +
                                    '<th scope="col">Curso</th>' +
                                    '<th scope="col">Nota</th>' +
                                  "</tr>" +
                                "</thead>" +
                                "<tbody />" +
                            "</table>" +
                        "<div id='errorDiv1' style='width:70%; margin: auto;'></div>" +
                    "</div>" +
                "</div>" +
            "</div>");
    let tbody = $("#tablaEstudiantesGrupo tbody");
    tbody.html("");
    mat.grupo.estudiantes.forEach((est)=>{
        let tr = $("<tr/>");
        tr.html(
            "<th>" + est.cedula + "</th>" +
            "<td>" + est.nombre + "</td>" +
            "<td>" + mat.grupo.curso.nombre + "</td>" +
            "<td>" + 
                "<input type='button' id='setear"+mat.codigo+"' class='btn btn-primary btn-lg btn-block' value='Agregar nota'>" +
            "</td>"
        );
        tbody.append(tr);
        $("#setear"+mat.codigo).click(() => loadPopupAddNota(mat));
    });
    $('#add-modal-estudiantes').modal('show'); 
}

function loadPopupAddNota(matri){
    let div = $('#popupAddNota');
    div.html("");
    div.html("<div class='modal fade' id='add-modal-agregar-nota' aria-labelledby='myLargeModalLabel' tabindex='-1' role='dialog'>" +
                "<div class='modal-dialog'>" +
                    "<div class='modal-content' id='infoEstudiante'>" +
                        "<div class='modal-header'>" +
                            "<div ><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                        "<form id='formAgregarNota'>" +
                            "<div class='modal-body'>" +
                                "<div id='div-login-msg'>" +
                                    "<div id='icon-login-msg'></div>" +
                                    "<span id='text-agregar-nota-msg'>Agregar nota a " + matri.estudiante.nombre + "</span>" +
                                "</div>" +
                                "<br>" +
                                "<div class='form-group'>" +
                                    "<label for='nombre'>Nueva nota</label>" +
                                    "<input type='number' name='nota' id='"+matri.codigo+"' placeholder='"+matri.nota+"' min='0' max='100'>" +
                                "</div>" +
                            "</div>" +
                        "</form>" +
                        "<div class='modal-footer d-flex justify-content-center'>" +
                            "<div>" +
                                "<input type='button' id='setearNota"+matri.codigo+"' class='btn btn-primary btn-lg btn-block' value='Agregar nota'>" +
                            "</div>" +
                        "</div>" +
                        "<div id='errorDiv1' style='width:70%; margin: auto;'></div>" +
                    "</div>" +
                "</div>" +
            "</div>");
    $('#add-modal-agregar-nota').modal('show');
    $('#setearNota'+matri.codigo).click(() => setearNota(matri));
}

async function setearNota(m){
    if($("#"+m.codigo).val().length != 0){
        m.nota = $("#"+m.codigo).val();
    }
    let request = new Request(url + "api/matriculas",
                            {method:'PUT',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(m)});
    const response = await fetch(request);
    if(!response.ok){
        
        $('.alertas').html('<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                            '¡Error, no se ha podido agregar la nota!' + response.status +
                       '</div>');
        $('#add-modal-agregar-nota').modal('hide');
        $('#add-modal-estudiantes').modal('hide');
        return;
    }
    $('#add-modal-agregar-nota').modal('hide');
    $('.alertas').html('<div class="alert alert-success" role="alert" style="padding:20px;">' +
                            '¡La nota se ha agregado exitosamente!' +
                       '</div>');
=======
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
>>>>>>> 583f02babe16923726625823588272ec30db26a3
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

<<<<<<< HEAD
$(loader);
=======
$(loader);


>>>>>>> 583f02babe16923726625823588272ec30db26a3
