
package Modelo;

import Logica.Usuario;
import AccesoDatos.ServicioUsuario;
import java.util.ArrayList;


public class ModelUsuario {
    private static ModelUsuario instancia;
    private ServicioUsuario usuario;

    private ModelUsuario() {
        this.usuario = new ServicioUsuario();
    }
    
    public static ModelUsuario instancia(){
        if (instancia == null){
            instancia = new ModelUsuario();
        }
        return instancia;
    }
    
    public void agregarUsuario(Usuario u) throws Exception{
        this.usuario.insertarUsuario(u);
    }
    
    public void modificarUsuario(Usuario u) throws Exception{
        this.usuario.ModificarUsuario(u);
    }
    
    public void eliminarUsuario(int cedula) throws Exception{
        this.usuario.eliminarUsuario(cedula);
    }
    
    public Usuario buscarUsuario(int cedula) throws Exception{
        Usuario usuario = this.usuario.buscarUsuario(cedula);
        return usuario;
    }
    
    public ArrayList<Usuario> obtenerUsuarios() throws Exception{
        ArrayList<Usuario> usuarios = (ArrayList<Usuario>)this.usuario.listarUsuario();
        return usuarios;
    }
}
