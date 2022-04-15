
package LogicaNegocio;

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
    
    public Usuario buscarUsuario(int id) throws Exception{
        Usuario usuario = this.usuario.buscarUsuario(id);
        return usuario;
    }
    
    public ArrayList<Usuario> obtenerUsuarios() throws Exception{
        ArrayList<Usuario> usuarios = (ArrayList<Usuario>)this.usuario.listarUsuario();
        return usuarios;
    }
}
