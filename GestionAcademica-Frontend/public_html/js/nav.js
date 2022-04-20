
function navEstudiante(){
    
}

function navProfesor(){
    
}

function navAdmin(){
    
}

function navMatriculador(){
    
}

function nav(){
    var div = $("#nav");
    div.html("<nav class='navbar navbar-expand-lg navbar-light' style='background-color: #343a40;'>" +
                "<a class='navbar-brand' href='/GestionAcademica-Frontend/' style='color:white;'><b>Gestión Académica</b></a>" +
                "<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>" +
                    "<span class='navbar-toggler-icon'></span>" +
                "</button>" +
                "<div class='collapse navbar-collapse' id='navbarSupportedContent'>" +
                    "<ul class='navbar-nav mr-auto' style='padding: 15px; justify-content:center;'>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='login' style='color:white;'>Iniciar sesión</a>" +
                        "</li>" +
                        "<li class='nav-item'>" +
                            "<a class='nav-link' href='#' id='checkin' style='color:white;'>Registrarse</a>" +
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
}

$(loaded);  