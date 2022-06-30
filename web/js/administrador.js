
var url = 'http://localhost:8088/GestionAcademica/';

let ciclos = {};
let carreras = {};
let cursos = [];
let curso = {};
let estudiantes = {};
let profesores = {};
let matriculas = [];
let carr = {};

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
        return;
    }
    estudiantes = await response.json();
}

async function fetchProfesores(){
    let request = new Request(url+'api/profesores/', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){
        let div = $(".alertas");
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No se encontraron profesores!' +
                '</div>'
        );
        return;
    }
    profesores = await response.json();
}

async function fetchCarreras(){
    const request = new Request(url+'api/carreras/', {method: 'GET', headers: { }});
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
}

async function fetchCursos(){
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
}

async function fetchCiclos(){
    request = new Request(url+'api/ciclos/', {method: 'GET', headers: { }});
    response = await fetch(request);
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
}

async function fetchGruposPorCarreraYCiclo(idCarrera, idCiclo){
    request = new Request(url+'api/grupos/'+idCarrera+'/'+idCiclo, {method:'GET'});
    response = await fetch(request);
    if (!response.ok){
        let div = $(".alertas");
        div.html("");
        div.html(
                '<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                    '¡No se encontraron grupos! Error ' + response.status +
                '</div>'
        );
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
            '<input type="text" id="search" placeholder="Buscar ciclos" onkeyup="buscador_interno()">' +
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
        const nuevaI = ciclo.fechaInicio.substring(0, ciclo.fechaInicio.length - 1);
        const nuevaF = ciclo.fechaFin.substring(0, ciclo.fechaFin.length - 1);
        const feI = nuevaI.split(" ")[0].split("-").reverse().join("-");
        const feF = nuevaF.split(" ")[0].split("-").reverse().join("-");
        let tr = $("<tr/>");
        tr.html(
            "<td>" + ciclo.codigo + "</td>" +
            "<td>" + ciclo.anio + "</td>" +
            "<td>" + ciclo.numeroCiclo + "</td>" +
            "<td>" + feI + "</td>" +
            "<td>" + feF + "</td>"
        );
        tbody.append(tr);
    });
}

async function loadCarreras(){
    await fetchCarreras();
    let div = $("#body");
    div.html(
        '<div class="alertas"/>' +
        '<div class="divBotones">' +
            '<input type="text" id="search" placeholder="Buscar carreras" onkeyup="buscador_interno()">' +
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
            "<td>" + carrera.codigo + "</td>" +
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

async function fetchCarreraEsp(codigo){
    const request = new Request(url+'api/carreras/'+codigo, {method: 'GET', headers: { }});
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
    carr = await response.json();
}

async function loadPopupCursos(carrera){
    await fetchCarreraEsp(carrera.codigo);
    carrera = carr;
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
            "<td>" + curso.codigo + "</td>" +
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
        $('.alertas').html('<div class="alert alert-danger" role="alert" style="padding:20px;">' +
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
    await fetchCursos();
    let div = $("#body");
    div.html(
        '<div class="alertas"/>' +
        '<div class="divBotones">' +
            '<input type="text" id="search" placeholder="Buscar cursos" onkeyup="buscador_interno()">' +
        '</div>' +
        '<table class="table table-dark" id="tablaCursos">' +
            '<thead>' +
                '<tr>' +
                    '<th scope="col">Código</th>' +
                    '<th scope="col">Nombre</th>' +
                    '<th scope="col">Horas semanales</th>' +
                    '<th scope="col">Créditos</th>' +
                    '<th scope="col">Carrera</th>' +
                    '<th scope="col">Funcionalidades</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody/>' +
        '</table>' +
        '<div id="popupCursos"></>' +
        '<div id="popupAgregarGrupo" />'
    );
    let tbody = $("#tablaCursos tbody");
    cursos.forEach((curso) => {
        let tr = $("<tr/>");
        tr.html(
            "<td>" + curso.codigo + "</td>" +
            "<td>" + curso.nombre + "</td>" +
            "<td>" + curso.horasSemanales + "</td>" +
            "<td>" + curso.creditos + "</td>" +
            "<td>" + curso.carrera.nombre + "</td>" +
            "<td>" +
                "<button type='button' class='btn btn-info' id='agregarGrupo"+curso.codigo+"'>Agregar Grupo</button>" +
            "</td>"
        );
        tbody.append(tr);
        $("#agregarGrupo"+curso.codigo).click(() => loadPopupAgregarGrupo(curso));
    });
}

function loadPopupGrupos(curso){
    let div = $('#popupCursos');
    div.html("");
    div.html("<div class='modal fade' id='add-modal-cursos' aria-labelledby='myLargeModalLabel' tabindex='-1' role='dialog'>" +
                "<div class='modal-dialog modal-lg'>" +
                    "<div class='modal-content' id='infoCarrera'>" +
                        "<div class='modal-header'>" +
                            "<div ><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                        "<div class='modal-body'>" +
                            "<p><b>Curso: </b>" + curso.nombre + "</p>" +
                            "<p><b>Carrera: </b>" + curso.carrera.nombre + "</p>" +
                            "<p><b>Créditos: </b>" + curso.creditos + "</p>" +
                            "<p><b>Grupos del curso: </b></p>" +
                            "<table class='table table-borderless' id='tablaGruposCurso'>" +
                                "<thead>" +
                                  "<tr>" +
                                    '<th scope="col">Código</th>' +
                                    '<th scope="col">Horario</th>' +
                                    '<th scope="col">Ciclo</th>' +
                                    '<th scope="col">Profesor</th>' +
                                  "</tr>" +
                                "</thead>" +
                                "<tbody />" +
                            "</table>" +
                            "<div id='errorDiv1' style='width:70%; margin: auto;'></div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>");
    let tbody = $("#tablaGruposCurso tbody");
    tbody.html("");
    curso.grupos.forEach((grupo) => {
        let tr = $("<tr/>");
        tr.html(
            "<td>" + grupo.codigo + "</td>" +
            "<td>" + grupo.horario + "</td>" +
            "<td>" + grupo.ciclo.anio + "-" + grupo.ciclo.numeroCiclo + "</td>" +
            "<td>" + curso.profesor.nombre + "</td>"
        );
        tbody.append(tr);
    });
    $('#add-modal-cursos').modal('show'); 
}

async function loadPopupAgregarGrupo(curso){
    await fetchCiclos();
    await fetchProfesores();
    let div = $('#popupAgregarGrupo');
    div.html("");
    div.html("<div class='modal fade' id='add-modal-agregar-grupo' aria-labelledby='myLargeModalLabel' tabindex='-1' role='dialog'>" +
                "<div class='modal-dialog'>" +
                    "<div class='modal-content' id='infoCurso'>" +
                        "<div class='modal-header'>" +
                            "<div ><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                        "<form id='formAgregarGrupo'>" +
                            "<div class='modal-body'>" +
                                "<div id='div-login-msg'>" +
                                    "<div id='icon-login-msg'></div>" +
                                    "<span id='text-agregar-curso-msg'>Agregar grupo a " + curso.nombre + "</span>" +
                                "</div>" +
                                "<br>" +
                                "<div class='form-group'>" +
                                    "<label for='nombre'>Horario del grupo: </label>" +
                                    "<input type='text' class='form-control' name='horario' id='horarioGrupo' placeholder='Horario'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='ciclo'>Ciclo</label>" +
                                    '<select class="form-select" aria-label="Default select example" name="codigoCiclo" id="codigoCiclo" style="margin-left:10px;">' +
                                    '</select>' +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='profesor'>Profesor</label>" +
                                    '<select class="form-select" aria-label="Default select example" name="cedulaProfesor" id="cedulaProfesor" style="margin-left:10px;">' +
                                    '</select>' +
                                "</div>" +
                            "</div>" +
                        "</form>" +
                        "<div class='modal-footer d-flex justify-content-center'>" +
                            "<div>" +
                                "<input type='button' id='crearGrupo' class='btn btn-primary btn-lg btn-block' value='Crear grupo'>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>");
    
    let selectCiclo = $('#formAgregarGrupo #codigoCiclo');
    ciclos.forEach((ciclo) => {
        let option = $("<option value='"+ciclo.numeroCiclo+"'/>");
        option.html(ciclo.anio + "-" + ciclo.numeroCiclo + " (" + ciclo.codigo + ")");
        selectCiclo.append(option);
    });
    
    let selectProfe = $('#formAgregarGrupo #cedulaProfesor');
    profesores.forEach((profesor) => {
        let option = $("<option value='"+profesor.cedula+"'/>");
        option.html(profesor.nombre + " " + profesor.cedula);
        selectProfe.append(option);
    });
    
    $('#add-modal-agregar-grupo').modal('show');
    $('#crearGrupo').click(() => crearGrupo(curso));
}

async function crearGrupo(curso){
    form = Object.fromEntries( (new FormData($("#formAgregarGrupo").get(0))).entries());
    const grupo_nuevo = {
        profesor : {cedula:form.cedulaProfesor},
        ciclo : {codigo:form.codigoCiclo},
        curso: curso,
        horario : form.horario
    };
    if(!validarLogin()) return;
    let request = new Request(url + "api/grupos",
                            {method:'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(grupo_nuevo)});
    const response = await fetch(request);
    if(!response.ok){
        $('#add-modal-agregar-curso').modal('hide');
        $('.alertas').html('<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                            '¡No se ha podido crear el grupo! Error ' + response.status +
                       '</div>');
        return;
    }
    $('#add-modal-agregar-curso').modal('hide');
    $('.alertas').html('<div class="alert alert-success" role="alert" style="padding:20px;">' +
                            '¡Se ha creado el grupo correctamente!' +
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
        '<table class="table table-dark" id="tablaEstudiantes">' +
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
        '<div id="popupEstudiantes" />' +
        '<div id="popupMatricula" />'
    );
    
    let selectCiclo = $("#selectCiclo");
    ciclos.forEach((ciclo) => {
        let option = $("<option value='"+ciclo.numeroCiclo+"' selected />");
        option.html(ciclo.anio + "-" + ciclo.numeroCiclo + " (" + ciclo.codigo + ")");
        selectCiclo.append(option);
    });
    
    let tbody = $("#tablaEstudiantes tbody");
    estudiantes.forEach((estudiante) => {
        const nueva = estudiante.fechaNacimiento.substring(0, estudiante.fechaNacimiento.length - 1);
        const fe = nueva.split(" ")[0].split("-").reverse().join("-");
        let tr = $("<tr/>");
        tr.html(
            "<td>" + estudiante.cedula + "</td>" +
            "<td>" + estudiante.nombre + "</td>" +
            "<td>" + estudiante.telefono + "</td>" +
            "<td>" + estudiante.email + "</td>" +
            "<td>" + fe + "</td>" +
            "<td>" + estudiante.carrera.nombre + "</td>" +
            "<td id='botonesCarreras'>" +
                "<button type='button' class='btn btn-info' style='margin:2px;' id='visualizarEstudiante"+estudiante.cedula+"'>Visualizar estudiante</button>" +
                "<button type='button' class='btn btn-dark' style='margin:2px;' id='matricularEstudiante"+estudiante.cedula+"'>Matricular estudiante</button>" +
            "</td>"    
        );
        tbody.append(tr);
        $("#visualizarEstudiante"+estudiante.cedula).click(() => loadPopupEstudiantes(estudiante));
        $("#matricularEstudiante"+estudiante.cedula).click(() => loadPopupMatricula(estudiante));
    });
}

async function loadPopupEstudiantes(estudiante){
    var nueva = estudiante.fechaNacimiento.substring(0, estudiante.fechaNacimiento.length - 1);
    var fe = nueva.split(" ")[0].split("-").reverse().join("-");
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
                            "<p><b>Teléfono: </b>" + estudiante.telefono + "</p>" +
                            "<p><b>Email: </b>" + estudiante.email + "</p>" +
                            "<p><b>Fecha de nacimiento: </b>" + fe + "</p>" +
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
                        "</div" +
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

async function loadPopupMatricula(estudiante){
    let div = $("#popupMatricula");
    div.html("");
    div.html("<div class='modal fade' id='add-modal-matricula' aria-labelledby='myLargeModalLabel' tabindex='-1' role='dialog'>" +
                "<div class='modal-dialog modal-lg'>" +
                    "<div class='modal-content' id='infoEstudiante'>" +
                        "<div class='modal-header'>" +
                            "<div ><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                        "<div class='modal-body'>" +
                            "<p><b>Nombre: </b>" + estudiante.nombre + "</p>" +
                            "<p><b>Cédula: </b>" + estudiante.cedula + "</p>" +
                            "<p><b>Carrera: </b>" + estudiante.carrera.nombre + "</p>" +
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
    
    let tbody = $("#tablaMatricularPopup tbody");
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
    
    $('#add-modal-matricula').modal('show');
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
        let div = $(".alertasPopup");
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

async function loadProfesores(){
    await fetchProfesores();
    let div = $("#body");
    div.html(
        '<div class="alertas"/>' +
        '<div class="divBotones">' +
            '<input type="text" id="search" placeholder="Buscar profesores" onkeyup="buscador_interno()">' +
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
            "<td>" + profesor.cedula + "</td>" +
            "<td>" + profesor.nombre + "</td>" +
            "<td>" + profesor.telefono + "</td>" +
            "<td>" + profesor.email + "</td>"
        );
        tbody.append(tr);
    });
}

async function loadOfertaAcademica(){
    await fetchCarreras();
    let div = $("#body");
    div.html(
        '<div class="alertas"/>' +
        '<div id="popupGrupos"/>' + 
        '<div class="divBotones">' +
        '</div>' +
        '<div id="comboCarrera" style="display:flex; justify-content:center;">' +
            '<span style="margin:5px;color:white;">Carrera: </span>' +
            '<select id="selectCarreras" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"/>' +
        '</div>'
    );
    var select = $("#selectCarreras");
    carreras.forEach((carrera) => {
        let option = $("<option value='"+carrera.codigo+"'>"+carrera.nombre+" ("+carrera.codigo+")</option>");
        select.append(option);
    });
    
    await fetchCiclos();
    div.append($('<div id="comboCiclo" style="display:flex; justify-content:center;">' +
                    '<span style="margin:5px;color:white;">Ciclo: </span>' +
                    '<select id="selectCiclos" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"/>' +
                 '</div>'));
    select = $("#selectCiclos");
    ciclos.forEach((ciclo) => {
        let option = $("<option value='"+ciclo.codigo+"'>"+ciclo.anio+"-"+ciclo.numeroCiclo+"</option>");
        select.append(option);
    });
    div.append($('<div class="divBotones">' +
                    '<button type="button" id="btnDisplayCursos" class="btn btn-dark">Buscar grupos</button>' +
                '</div>'));
    $("#btnDisplayCursos").click(async() => {
        $(".alertas").html("");
        $("#divInfo").remove();
        div.append($('<div style="margin-top:10px;" id="divInfo">' +
                        '<table class="table table-dark" id="tablaGruposCarreraCiclo">' +
                            '<thead>' +
                              '<tr>' +
                                '<th scope="col">Código</th>' +
                                '<th scope="col">Horario</th>' +
                                '<th scope="col">Ciclo</th>' +
                                '<th scope="col">Curso</th>' +
                                '<th scope="col">Profesor</th>' +
                                '<th scope="col">Funciones</th>' +
                              '</tr>' +
                            '</thead>' +
                            '<tbody/>' +
                        '</table>' +
                     '</div>'));
        const error = await fetchGruposPorCarreraYCiclo($('#selectCarreras').val(), $('#selectCiclos').val());
        if(!error) grupos = [];
        let tbody = $("#tablaGruposCarreraCiclo tbody");
        grupos.forEach((grupo) => {
            let tr = $("<tr/>");
            tr.html(
                "<td>" + grupo.codigo + "</td>" +
                "<td>" + grupo.horario + "</td>" +
                "<td>" + grupo.ciclo.anio + "-" + grupo.ciclo.numeroCiclo + "</td>" +
                "<td>" + grupo.curso.nombre + "</td>" +
                "<td>" + grupo.profesor.nombre + "</td>" +
                "<td><button type='button' class='btn btn-info' id='editarGrupo"+grupo.codigo+"'>Detalle del grupo</button></td>"
            );
            tbody.append(tr);
            $("#editarGrupo"+grupo.codigo).click(() => loadPopupEditarGrupo(grupo));
        });
    });
}

async function loadPopupEditarGrupo(grupo){
    await fetchCiclos();
    await fetchProfesores();
    let div = $("#popupGrupos");
    div.html("");
    div.html("<div class='modal fade' id='add-modal-editar-grupos' aria-labelledby='myLargeModalLabel' tabindex='-1' role='dialog'>" +
                "<div class='modal-dialog'>" +
                    "<div class='modal-content' id='infoEstudiante'>" +
                        "<div class='modal-header'>" +
                            "<div ><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                        "<form id='formEditarGrupo'>" +
                            "<div class='modal-body'>" +
                                "<p><b>Código: </b>" + grupo.codigo + "</p>" +
                                "<p><b>Curso: </b>" + grupo.curso.nombre + "</p>" +
                                "<p><input type='text' class='form-control' name='horario' id='anioGrupo' value='"+grupo.horario+"'</p>" +
                                "<div class='form-group'>" +
                                    "<label for='ciclo'>Ciclo</label>" +
                                    '<select class="form-select" aria-label="Default select example" name="codigoCiclo" id="codigoCiclo" style="margin-left:10px;" />' +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='profesor'>Profesor</label>" +
                                    '<select class="form-select" aria-label="Default select example" name="cedulaProfesor" id="cedulaProfesor" style="margin-left:10px;" />' +
                                "</div>" +
                            "</div>" +
                        "</form>" +
                        "<div class='modal-footer d-flex justify-content-center'>" +
                            "<div>" +
                                "<input type='button' id='editarGrupo' class='btn btn-primary btn-lg btn-block' value='Editar grupo'>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>");
    let selectCiclo = $('#formEditarGrupo #codigoCiclo');
    ciclos.forEach((ciclo) => {
        if(ciclo.codigo === grupo.ciclo.codigo){
            let option = $("<option value='"+ciclo.numeroCiclo+"' selected />");
            option.html(ciclo.anio + "-" + ciclo.numeroCiclo + " (" + ciclo.codigo + ")");
            selectCiclo.append(option);
        }else{
            let option = $("<option value='"+grupo.ciclo.codigo+"'/>");
            option.html(ciclo.anio + "-" + ciclo.numeroCiclo + " (" + ciclo.codigo + ")");
            selectCiclo.append(option);
        }
    });
    
    let selectProfe = $('#formEditarGrupo #cedulaProfesor');
    profesores.forEach((profesor) => {
        if(profesor.nombre === grupo.profesor.nombre){
            let option = $("<option value='"+profesor.cedula+"' selected />");
            option.html(profesor.nombre + " " + profesor.cedula);
            selectProfe.append(option);
        }else{
            let option = $("<option value='"+profesor.cedula+"'/>");
            option.html(profesor.nombre + " " + profesor.cedula);
            selectProfe.append(option);
        }
    });
    
    $('#add-modal-editar-grupos').modal('show');
    $('#editarGrupo').click(() => editarGrupo(grupo));
}

async function editarGrupo(grupo){
    const form = Object.fromEntries( (new FormData($("#formEditarGrupo").get(0))).entries());
    const grupo_nuevo = {
        codigo : grupo.codigo,
        profesor : {cedula:form.cedulaProfesor},
        ciclo : {codigo:form.codigoCiclo},
        curso: grupo.curso, 
        horario : form.horario
    };
    if(!validarLogin()) return;
    let request = new Request(url + "api/grupos",
                            {method:'PUT',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(grupo_nuevo)});
    const response = await fetch(request);
    if(!response.ok){
        $('#add-modal-editar-grupos').modal('hide');
        $('.alertas').html('<div class="alert alert-danger" role="alert" style="padding:20px;">' +
                            '¡No se ha podido editar el grupo! Error ' + response.status +
                       '</div>');
        return;
    }
    $('#add-modal-editar-grupos').modal('hide');
    $('.alertas').html('<div class="alert alert-success" role="alert" style="padding:20px;">' +
                            '¡Se ha creado el curso correctamente!' +
                       '</div>');
}

function buscador_interno() {
    var filter = document.getElementById("search");
    var li = document.getElementsByTagName("td");
    encontrado = false;
    id_encontrado = 0;
    //Recorriendo elementos a filtrar mediante la lista
    for (i = 0; i < li.length; i++) {
        var a = li[i].textContent;
        if (a.toUpperCase().includes(filter.value.toUpperCase())) {
            encontrado = true;
            id_encontrado = li[i].parentElement;
            li[i].parentElement.style.display = "";
        } else {
            if (li[i].parentElement != id_encontrado) {
                li[i].parentElement.style.display = "none";
            }
        }
    }
    if (encontrado != true) {
        for (i = 0; i < li.length; i++) {
            li[i].style.display = "table-cell";
        }
    }
}

async function signoff(){
    let request = new Request(url+'api/sesiones/', {method: 'DELETE', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    sessionStorage.removeItem("user");
    location.href = "http://localhost:8088/GestionAcademica/";
}

function loader(){
    $("#infoCiclos").click(loadCiclos);
    $("#infoCarreras").click(loadCarreras);
    $("#infoCursos").click(loadCursos);
    $("#infoEstudiantes").click(loadEstudiantes);
    $("#infoProfesores").click(loadProfesores);
    $("#ofertaAcademica").click(loadOfertaAcademica);
    $("#signoff").click(signoff);
}

$(loader);