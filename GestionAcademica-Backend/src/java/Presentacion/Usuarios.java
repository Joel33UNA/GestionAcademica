
package Presentacion;
import Controlador.UsuarioControlador;
import Logica.Usuario;
import java.util.List;
import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/usuarios")
public class Usuarios {
    private UsuarioControlador control;
    
    public Usuarios(){
        control = new UsuarioControlador();
    }
    
    @PermitAll
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Usuario> getUsuariosAll() { 
        try {
            return control.obtenerUsuarios();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Usuario get(@PathParam("id") int id) {
        try {
            return control.buscarUsuario(id);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Usuario u) {  
        try {
            control.agregarUsuario(u);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    @PermitAll
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Usuario u) {  
        try {
            control.modificarUsuario(u);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @DELETE
    @Path("{cedula}")
    public void delete(@PathParam("cedula") int cedula) {
        try {
            control.eliminarUsuario(cedula);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
}
