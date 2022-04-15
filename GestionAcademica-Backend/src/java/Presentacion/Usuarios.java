
package Presentacion;
import LogicaNegocio.ModelUsuario;
import Logica.Usuario;
import java.util.List;
import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/usuarios")
public class Usuarios {
    @PermitAll
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Usuario> getComprasAll() { 
        try {
            return ModelUsuario.instancia().obtenerUsuarios();
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
            return ModelUsuario.instancia().buscarUsuario(id);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Usuario u) {  
        try {
            ModelUsuario.instancia().agregarUsuario(u);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
}
