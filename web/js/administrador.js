
var url = 'http://localhost:8088/GestionAcademica/';

let ciclos = {};
let carreras = {};
let cursos = [];
let curso = {};
let estudiantes = {};
let profesores = {};
let matriculas = [];

async function loadCiclos(){
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
        return;
    }
    ciclos = await response.json();
    let div = $("#body");
    div.html(
        '<div class="alertas"/>' +
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
                    '¡No se encontraron carreras! Error ' + response.status +
                '</div>'
        );
        return;
    }
    carreras = await response.json();
    let div = $("#body");
    div.html(
        '<div class="alertas"/>' +
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
                    '<th scope="col">Funciones</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody/>' +
        '</table>' +
        '<div id="popupCarreras" />' +
        '<div id="popupAgregarCurso" />'
    );
    let tbody = $("#tablaCarreras tbody");
    carreras.forEach((carrera) => {
        let tr = $("<tr/>");
        tr.html(
            "<th>" + carrera.codigo + "</th>" +
            "<td>" + carrera.nombre + "</td>" +
            "<td>" + carrera.titulo + "</td>" +
            "<td id='botonesCarreras'>" +
                "<button type='button' class='btn btn-secondary' style='margin:2px;' id='verCursos"+carrera.codigo+"'>Ver cursos</button>" +
                "<button type='button' class='btn btn-info' style='margin:2px;' id='agregarCurso"+carrera.codigo+"'>Agregar curso</button>" +
            "</td>"
        );
        tbody.append(tr);
        $("#verCursos"+carrera.codigo).click(() => loadPopupCursos(carrera));
        $("#agregarCurso"+carrera.codigo).click(() => loadPopupAgregarCurso(carrera));
    });
}

function loadPopupCursos(carrera){
    let div = $('#popupCarreras');
    div.html("");
    div.html("<div class='modal fade' id='add-modal-carreras' aria-labelledby='myLargeModalLabel' tabindex='-1' role='dialog'>" +
                "<div class='modal-dialog modal-lg'>" +
                    "<div class='modal-content' id='infoCarrera'>" +
                        "<div class='modal-header'>" +
                            "<div ><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                            "<p><b>Carrera: </b>" + carrera.nombre + "</p>" +
                            "<p><b>Código: </b>" + carrera.codigo + "</p>" +
                            "<p><b>Cursos de la carrera: </b></p>" +
                            "<table class='table table-borderless' id='tablaCursosCarrera'>" +
                                "<thead>" +
                                  "<tr>" +
                                    '<th scope="col">Código</th>' +
                                    '<th scope="col">Nombre</th>' +
                                    '<th scope="col">Horas semanales</th>' +
                                    '<th scope="col">Créditos</th>' +
                                    '<th scope="col">Eliminar curso</th>' +
                                  "</tr>" +
                                "</thead>" +
                                "<tbody />" +
                            "</table>" +
                        "<div id='errorDiv1' style='width:70%; margin: auto;'></div>" +
                    "</div>" +
                "</div>" +
            "</div>");
    let tbody = $("#tablaCursosCarrera tbody");
    tbody.html("");
    carrera.cursos.forEach((curso) => {
        let tr = $("<tr/>");
        tr.html(
            "<th>" + curso.codigo + "</th>" +
            "<td>" + curso.nombre + "</td>" +
            "<td>" + curso.horasSemanales + "</td>" +
            "<td>" + curso.creditos + "</td>" +
            "<td><i class='fa fa-trash' aria-hidden='true' id='eliminarCurso"+curso.codigo+"' style='cursor:pointer;'></i></td>"
        );
        tbody.append(tr);
        $("#eliminarCurso"+curso.codigo).click(() => eliminarCurso(curso));
    });
    $('#add-modal-carreras').modal('show'); 
}

async function eliminarCurso(curso){
    let request = new Request(url+'api/cursos/'+curso.codigo, {method: 'DELETE', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        $('#add-modal-carreras').modal('hide');
        $('.alertas').html('<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                            '¡Ha ocurrido un error al eliminar! ' + response.status +
                       '</div>');
        return;
    }
    $('#add-modal-carreras').modal('hide');
    $('.alertas').html('<div class="alert alert-success" role="alert" style="padding:20px;">' +
                            '¡Se ha eliminado el curso correctamente!' +
                       '</div>');
}

function loadPopupAgregarCurso(carrera){
    let div = $('#popupAgregarCurso');
    div.html("");
    div.html("<div class='modal fade' id='add-modal-agregar-curso' aria-labelledby='myLargeModalLabel' tabindex='-1' role='dialog'>" +
                "<div class='modal-dialog'>" +
                    "<div class='modal-content' id='infoCarrera'>" +
                        "<div class='modal-header'>" +
                            "<div ><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                        "<form id='formAgregarCurso'>" +
                            "<div class='modal-body'>" +
                                "<div id='div-login-msg'>" +
                                    "<div id='icon-login-msg'></div>" +
                                    "<span id='text-agregar-curso-msg'>Agregar curso a " + carrera.nombre + "</span>" +
                                "</div>" +
                                "<br>" +
                                "<div class='form-group'>" +
                                    "<label for='nombre'>Nombre del curso</label>" +
                                    "<input type='text' class='form-control' name='nombre' id='nombreCurso' placeholder='Nombre'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='creditos'>Créditos</label>" +
                                    '<select class="form-select" aria-label="Default select example" name="creditos" id="creditosCurso" style="margin-left:10px;">' +
                                        '<option selected value="1">1</option>' +
                                        '<option value="2">2</option>' +
                                        '<option value="3">3</option>' +
                                        '<option value="4">4</option>' +
                                        '<option value="5">5</option>' +
                                    '</select>' +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='horas'>Horas semanales</label>" +
                                    "<input type='number' class='form-control' name='horasSemanales' id='horasCurso' min='1' max='10'>" +
                                "</div>" +
                            "</div>" +
                        "</form>" +
                        "<div class='modal-footer d-flex justify-content-center'>" +
                            "<div>" +
                                "<input type='button' id='crearCurso' class='btn btn-primary btn-lg btn-block' value='Crear curso'>" +
                            "</div>" +
                        "</div>" +
                        "<div id='errorDiv1' style='width:70%; margin: auto;'></div>" +
                    "</div>" +
                "</div>" +
            "</div>");
    $('#add-modal-agregar-curso').modal('show');
    $('#crearCurso').click(() => crearCurso(carrera));
}

async function crearCurso(carrera){
    curso = Object.fromEntries( (new FormData($("#formAgregarCurso").get(0))).entries());
    curso.carrera = carrera;
    if(!validarLogin()) return;
    let request = new Request(url + "api/cursos",
                            {method:'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(curso)});
    const response = await fetch(request);
    if(!response.ok){
        $('#add-modal-carreras').modal('hide');
<<<<<<< HEAD
        $('.#body').html('<div class="alert alert-danger" role="alert" style="padding:20px;">' +
=======
        $('.alertas').html('<div class="alert alert-danger" role="alert" style="padding:20px;">' +
>>>>>>> c2ffe79086c9217023801a621d8f2dc39579f6fe
                            '¡No se ha podido crear el curso! Error ' + response.status +
                       '</div>');
        return;
    }
    $('#add-modal-agregar-curso').modal('hide');
    $('.alertas').html('<div class="alert alert-success" role="alert" style="padding:20px;">' +
                            '¡Se ha creado el curso correctamente!' +
                       '</div>');
}

function validarLogin(){
    var error = false;
    $("#formAgregarCurso input").removeClass("invalid");
    error |= $("#formAgregarCurso input[type='text']").filter( (i,e)=>{ return e.value==='';}).length > 0;        
    $("#formAgregarCurso input[type='text']").filter( (i,e)=>{ return e.value==='';}).addClass("invalid");
    error |= $("#formAgregarCurso input[type='number']").filter((i,e)=>{ return e.value==='';}).length > 0;
    $("#formAgregarCurso input[type='number']").filter( (i,e)=>{ return e.value==='';}).addClass("invalid");
    return !error;
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
        '<div class="alertas"/>' +
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
                    '<th scope="col">Carrera</th>' +
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
            "<td>" + curso.creditos + "</td>" +
            "<td>" + curso.carrera.nombre + "</td>"
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
        '<div class="alertas"/>' +
        '<div class="divBotones">' +
            '<button type="button" class="btn btn-secondary">Ordenar por cédula</button>' +
            '<button type="button" class="btn btn-secondary">Ordenar por nombre</button>' +
//          '<button type="button" class="btn btn-info">Agregar Estudiante</button>' +
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
                '</tr>' +
            '</thead>' +
            '<tbody/>' +
        '</table>' +
        '<div id="popupEstudiantes" />'
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
            "<td>" + estudiante.carrera.nombre + "</td>"
<<<<<<< HEAD
        );
        tr.click(() => loadPopupEstudiantes(estudiante));
        tbody.append(tr);
    });
}

async function loadPopupEstudiantes(estudiante){
    let div = $("#popupEstudiantes");
    div.html("");
    div.html("<div class='modal fade' id='add-modal-estudiantes' aria-labelledby='myLargeModalLabel' tabindex='-1' role='dialog'>" +
                "<div class='modal-dialog modal-lg'>" +
                    "<div class='modal-content' id='infoEstudiante'>" +
                        "<div class='modal-header'>" +
                            "<div ><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                            "<p><b>Nombre: </b>" + estudiante.nombre + "</p>" +
                            "<p><b>Cédula: </b>" + estudiante.cedula + "</p>" +
                            "<p><b>Teléfono: </b>" + estudiante.telefono + "</p>" +
                            "<p><b>Email: </b>" + estudiante.email + "</p>" +
                            "<p><b>Fecha de nacimiento: </b>" + estudiante.fechaDeNacimiento + "</p>" +
                            "<p><b>Carrera: </b>" + estudiante.carrera.nombre + "</p>" +
                            "<p><b>Historial académico: </b></p>" +
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
                    "</div>" +
                "</div>" +
            "</div>");
    
    let request = new Request(url+'api/matriculas/'+estudiante.cedula, {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        $('.alertas').html('<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                            '¡El estudiante no posee historial académico! Error ' + response.status +
                       '</div>');
        return;
    }
    matriculas = await response.json();
    
    let tbody = $("#tablaHistorialPopup tbody");
    tbody.html("");
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
    $('#add-modal-estudiantes').modal('show');
}

async function loadProfesores(){
    let request = new Request(url+'api/profesores/', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        let div = $("#.alertas");
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
        '<div class="alertas"/>' +
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
    let tbody = $("#tablaProfesores tbody");
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
    $("#infoCursos").click(loadCursos);
    $("#infoEstudiantes").click(loadEstudiantes);
    $("#infoProfesores").click(loadProfesores);
}

$(loader);


