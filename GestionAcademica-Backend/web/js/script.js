const url = 'http://localhost:8088/GestionAcademica-Backend/';

let usuarios = [];

let usuario = {
    'cedula' : 222,
    'clave' : '222',
    'rol' : 'administrador'
};

async function fetchAndListUsuarios(){
    let request = new Request(url+'api/usuarios/111', {method: 'GET', headers: { }});
    const response = await fetch(request);
    if (!response.ok){ return; }
    usuarios = await response.json();
}

async function fetchAndAddUsuarios(){
    let request = new Request(url + "api/usuarios/",
                            {method:'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(usuario)});
    const response = await fetch(request);
    if (!response.ok){ console.log("error"); }
}

function loaded(){
    fetchAndListUsuarios();
}

$(loaded);