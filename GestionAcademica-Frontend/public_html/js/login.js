
var url = "http://localhost:8088/GestionAcademica-Backend/";

let usuario = {};

function loadLogin(){
    var div = $("#popuplogin");
    div.html("<div class='modal fade' id='add-modal-login' tabindex='-1' role='dialog'>" +
                "<div class='modal-dialog' style='width: 400px'>" +
                    "<div class='modal-content'>" +
                        "<div class='modal-header'>" +
                            "<div ><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span></button></div>" +
                        "</div>" +
                        "<form id='form1'>" +
                            "<div class='modal-body'>" +
                                "<div id='div-login-msg'>" +
                                    "<div id='icon-login-msg'></div>" +
                                    "<span id='text-login-msg'>Iniciar sesión</span>" +
                                "</div>" +
                                "<br>" +
                                "<div class='form-group'>" +
                                    "<label for='cedula'>Cédula</label>" +
                                    "<input type='text' class='form-control' name='id' id='id1' placeholder='Cédula'>" +
                                "</div>" +
                                "<div class='form-group'>" +
                                    "<label for='contra'>Contraseña</label>" +
                                    "<input type='password' class='form-control' name='clave' id='pass1' placeholder='Contraseña'>" +
                                "</div>" +
                            "</div>" +
                        "</form>" +
                        "<div class='modal-footer d-flex justify-content-center'>" +
                            "<div>" +
                                "<input type='button' id='loginFetch' class='btn btn-primary btn-lg btn-block' value='Iniciar Sesión'>" +
                            "</div>" +
                        "</div>" +
                        "<div id='errorDiv1' style='width:70%; margin: auto;'></div>" +
                    "</div>" +
                "</div>" +
            "</div>");
}

function renderLogin(){
    usuario = {};
    $("#id1").val(usuario.cedula);
    $("#pass1").val(usuario.clave);
    $('#loginFetch').click(login);   
    $("#add-modal-login #errorDiv1").html("");     
    $('#add-modal-login').modal('show');        
}

function login(){
    usuario = Object.fromEntries( (new FormData($("#form1").get(0))).entries());       
    if(!validarLogin()) return;
    let request = new Request(url + "api/sesiones/comprobar",
                            {method:'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(usuario)});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status, $("#add-modal-login #errorDiv1"));
            return;
        }
        usuario = await response.json();
        sessionStorage.setItem("user", JSON.stringify(usuario));
        if(usuario.rol === "administrador"){
            location.href = "administrador.html";
        }
        else if(usuario.rol === "estudiante"){
            location.href = "estudiante.html";
        }
        else if(usuario.rol === "profesor"){
            location.href = "profesor.html";
        }
        else if(usuario.rol === "matriculador"){
            location.href = "matriculador.html";
        }
    })();
}

function validarLogin(){
    var error = false;
    $("#form1 input").removeClass("invalid");
    error |= $("#form1 input[type='text']").filter( (i,e)=>{ return e.value==='';}).length > 0;        
    $("#form1 input[type='text']").filter( (i,e)=>{ return e.value==='';}).addClass("invalid");
    error |= $("#form1 input[type='password']").filter((i,e)=>{ return e.value==='';}).length > 0;
    $("#for1 input[type='password']").filter( (i,e)=>{ return e.value==='';}).addClass("invalid");
    return !error;
}

function loader(){
    $(loadLogin);
    $("#login").click(renderLogin);
}

$(loader);