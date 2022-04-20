var url = 'http://localhost:8088/GestionAcademica-Backend/';

let usuarios = [];


const carrera = {
    nombre : "asd",
    titulo : "asd"
};

async function addCurso(){
    let request = new Request("http://localhost:8088/GestionAcademica-Backend/",
        { method:'POST', heders:{'Content-Type':'application/json'},
        body:JSON.stringify(curso) });
    await fetch();
}

async function fetchAndListUsuarios(){
    let request = new Request(url+'api/usuarios/', {method: 'GET', headers: { }});
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

async function addCarrera(){
    let request = new Request(url + "api/carreras/",
                            { method: 'POST',
                            headers: { 'Content-Type' : 'application/json' },
                            body: JSON.stringify(carrera)});
    const response = await fetch(request);
}

async function deleteCarrera(){
    let request = new Request(url + "api/carreras/333",
                            { method: 'DELETE'});
                            
    const response = await fetch(request);
    if(response.ok){
        console.log("Carrera eliminada con exito");
    }
}

async function deleteUsuario(){
    let request = new Request(url + "api/usuarios/111",
                            { method: 'DELETE'});
                            
    const response = await fetch(request);
    if(response.ok){
        console.log("Usuario eliminado con exito");
    }
}

function loaded(){
    addCarrera();
}

$(loaded);