
package Controlador;

import Logica.Usuario;
import Modelo.ModelUsuario;
import java.util.ArrayList;

public class UsuarioControlador {
    
    public ArrayList<Usuario> obtenerUsuarios() throws Exception{
        return ModelUsuario.instancia().obtenerUsuarios();
    }
    
    public Usuario buscarUsuario(int cedula) throws Exception{
        return ModelUsuario.instancia().buscarUsuario(cedula);
    }
    
    public void agregarUsuario(Usuario u) throws Exception{
        ModelUsuario.instancia().agregarUsuario(u);
    }
    
    public void modificarUsuario(Usuario u) throws Exception{
        ModelUsuario.instancia().modificarUsuario(u);
    }
    
    public void eliminarUsuario(int cedula) throws Exception{
        ModelUsuario.instancia().eliminarUsuario(cedula);
    }
    
}
