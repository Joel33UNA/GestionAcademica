
function navEstudiante(){
    var div = $("#navEstudiante");
    div.html("<nav class='navbar navbar-expand-lg navbar-light' style='background-color: #343a40;'>" +
                "<a class='navbar-brand' href='/GestionAcademica/' style='color:white;'><b>Gestión Académica</b></a>" +
                "<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>" +
                    "<span class='navbar-toggler-icon'></span>" +
                "</button>" +
                "<div class='collapse navbar-collapse' id='navbarSupportedContent'>" +
                    "<ul class='navbar-nav mr-auto' style='padding: 15px; justify-content:center;'>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='infoEstudiante' style='color:white;'>Información</a>" +
                        "</li>" +
						"<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='infoHistorial' style='color:white;'>Historial académico</a>" +
                        "</li>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='checkout' style='color:white;'>Cerrar sesión</a>" +
                        "</li>" +
                    "</ul>" +
                "</div>" +
            "</nav>");
}

function navProfesor(){
    var div = $("#navProfesor");
    div.html("<nav class='navbar navbar-expand-lg navbar-light' style='background-color: #343a40;'>" +
                "<a class='navbar-brand' href='/GestionAcademica/' style='color:white;'><b>Gestión Académica</b></a>" +
                "<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>" +
                    "<span class='navbar-toggler-icon'></span>" +
                "</button>" +
                "<div class='collapse navbar-collapse' id='navbarSupportedContent'>" +
                    "<ul class='navbar-nav mr-auto' style='padding: 15px; justify-content:center;'>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='infoProfesor' style='color:white;'>Información</a>" +
                        "</li>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='checkout' style='color:white;'>Cerrar sesión</a>" +
                        "</li>" +
                    "</ul>" +
                "</div>" +
            "</nav>");
}

function navAdmin(){
    var div = $("#navAdministrador");
    div.html("<nav class='navbar navbar-expand-lg navbar-light' style='background-color: #343a40;'>" +
                "<a class='navbar-brand' href='/GestionAcademica/administrador.html' style='color:white;'><b>Gestión Académica</b></a>" +
                "<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>" +
                    "<span class='navbar-toggler-icon'></span>" +
                "</button>" +
                "<div class='collapse navbar-collapse' id='navbarSupportedContent'>" +
                    "<ul class='navbar-nav mr-auto' style='padding: 15px; justify-content:center;'>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='infoCiclos' style='color:white;'>Ciclos</a>" +
                        "</li>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='infoCarreras' style='color:white;'>Carreras</a>" +
                        "</li>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='infoCursos' style='color:white;'>Cursos</a>" +
                        "</li>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='infoEstudiantes' style='color:white;'>Estudiantes</a>" +
                        "</li>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='infoProfesores' style='color:white;'>Profesores</a>" +
                        "</li>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='ofertaAcademica' style='color:white;'>Oferta Académica</a>" +
                        "</li>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='checkout' style='color:white;'>Cerrar sesión</a>" +
                        "</li>" +
                    "</ul>" +
                "</div>" +
            "</nav>");
}

function navMatriculador(){
    var div = $("#navMatriculador");
    div.html("<nav class='navbar navbar-expand-lg navbar-light' style='background-color: #343a40;'>" +
                "<a class='navbar-brand' href='/GestionAcademica/' style='color:white;'><b>Gestión Académica</b></a>" +
                "<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>" +
                    "<span class='navbar-toggler-icon'></span>" +
                "</button>" +
                "<div class='collapse navbar-collapse' id='navbarSupportedContent'>" +
                    "<ul class='navbar-nav mr-auto' style='padding: 15px; justify-content:center;'>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='infoMatriculador' style='color:white;'>Información</a>" +
                        "</li>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='checkout' style='color:white;'>Cerrar sesión</a>" +
                        "</li>" +
                    "</ul>" +
                "</div>" +
            "</nav>");
}

function nav(){
    var div = $("#nav");
    div.html("<nav class='navbar navbar-expand-lg navbar-light' style='background-color: #343a40;'>" +
                "<a class='navbar-brand' href='/GestionAcademica/' style='color:white;'><b>Gestión Académica</b></a>" +
                "<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>" +
                    "<span class='navbar-toggler-icon'></span>" +
                "</button>" +
                "<div class='collapse navbar-collapse' id='navbarSupportedContent'>" +
                    "<ul class='navbar-nav mr-auto' style='padding: 15px; justify-content:center;'>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='login' style='color:white;'>Iniciar sesión</a>" +
                        "</li>" +
                    "</ul>" +
                "</div>" +
            "</nav>");
}

function loaded(){
    if(JSON.parse(sessionStorage.getItem('user'))){
        if(JSON.parse(sessionStorage.getItem('user')).rol === 'estudiante'){
            navEstudiante();
        }
        else if(JSON.parse(sessionStorage.getItem('user') === 'profesor')){
            navProfesor();
        }
        else if(JSON.parse(sessionStorage.getItem('user')).rol === 'administrador'){
            navAdmin();
        }
        else if(JSON.parse(sessionStorage.getItem('user')).rol === 'matriculador'){
            navMatriculador();
        }
    }
    else{
        nav();
    }
    $("#checkout").click(() => {
        sessionStorage.removeItem("user");
        location.href = "/GestionAcademica";
    });
}

$(loaded);  