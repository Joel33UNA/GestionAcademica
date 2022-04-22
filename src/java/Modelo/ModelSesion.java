
package Modelo;

import AccesoDatos.ServicioLogin;
import Logica.Usuario;


public class ModelSesion {
    private static ModelSesion instancia;
    private ServicioLogin sesion;

    private ModelSesion() {
        this.sesion = new ServicioLogin();
    }
    
    public static ModelSesion instancia(){
        if (instancia == null){
            instancia = new ModelSesion();
        }
        return instancia;
    }
    
    public Usuario comprobarUsuario(int cedula, String clave) throws Exception{
        Usuario usuario = sesion.loginUsuario(cedula, clave);
        return usuario;
    }
}
