
var url = 'http://localhost:8088/GestionAcademica/';

let matriculas = {};
let profesor = {};
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

async function loadGrupos(){
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
    div = $("#body");
    div.html(
        '<div class="alertas"/>' +
        '<table class="table table-dark" id="tablaGrupos">' +
            '<thead>' +
                '<tr>' +
                    '<th scope="col">Curso</th>' +
                    '<th scope="col">Número de grupo</th>' +
                    '<th scope="col">Función</th>' +
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
                "<button type='button' class='btn btn-secondary' style='margin:2px;' id='"+matricula.grupo.codigo+"'>Ver estudiantes</button>" +
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
                            "<p><b>Estudiantes del grupo "+ mat.grupo.codigo + "</b></p>" +
                            "<table class='table table-borderless' id='tablaEstudiantesGrupo'>" +
                                "<thead>" +
                                  "<tr>" +
                                    '<th scope="col">Cédula</th>' +
                                    '<th scope="col">Nombre</th>' +
                                    '<th scope="col">Curso</th>' +
                                    '<th scope="col"></th>' +
                                  "</tr>" +
                                "</thead>" +
                                "<tbody />" +
                            "</table>" +
                        "<div id='errorDiv1' style='width:70%; margin: auto;'></div>" +
                        '<div class="alertasPopUpEstudiantes"/>' +
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
                                "<div id='div-login-msg'>" +
                                    "<span id='text-agregar-nota-msg'>Nota actual: " + matri.nota + "</span>" +
                                "</div>" +
                                "<br>" +
                                "<div class='form-group'>" +
                                    "<label for='nombre'>Nueva nota: </label>" +
                                    "<input type='number' name='nota' id='G"+matri.codigo+"' placeholder='' min='0' max='100'>" +
                                "</div>" +
                            "</div>" +
                        "</form>" +
                        "<div class='modal-footer d-flex justify-content-center'>" +
                            "<div>" +
                                "<input type='button' id='setearNota"+matri.codigo+"' class='btn btn-success btn-lg btn-block' value='Guardar nueva nota'>" +
                            "</div>" +
                        "</div>" +
                        "<div id='errorDiv1' style='width:70%; margin: auto;'></div>" +
                    "</div>" +
                "</div>" +
            "</div>");
    $('#add-modal-agregar-nota').modal('show');
    $('#add-modal-estudiantes').modal('hide');
    $('#setearNota'+matri.codigo).click(() => setearNota(matri));
}

async function setearNota(m){
    if($("#G"+m.codigo).val().length != 0){
        m.nota = $("#G"+m.codigo).val();
    }
    let request = new Request(url + "api/matriculas",
                            {method:'PUT',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(m)});
    const response = await fetch(request);
    if(!response.ok){
        
        $('.alertasPopUpEstudiantes').html('<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                            '¡Error, no se ha podido agregar la nota!' + response.status +
                       '</div>');
        $('#add-modal-agregar-nota').modal('hide');
        $('#add-modal-estudiantes').modal('hide');
        return;
    }
    $('#add-modal-agregar-nota').modal('hide');
    $('#add-modal-estudiantes').modal('show');
    $('.alertasPopUpEstudiantes').html('<div class="alert alert-success" role="alert" style="padding:20px;">' +
                            '¡La nota se ha agregado exitosamente!' +
                       '</div>');
}

async function signoff(){
    let request = new Request(url+'api/sesiones/', {method: 'DELETE', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    sessionStorage.removeItem("user");
    location.href = "http://localhost:8088/GestionAcademica/";
}

function loader(){
    $("#infoProfesor").click(loadProfesor);
    $("#infoGrupos").click(loadGrupos);
    $("#signoff").click(signoff);
}

$(loader);