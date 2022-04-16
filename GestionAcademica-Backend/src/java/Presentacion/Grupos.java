
package Presentacion;

import Controlador.GrupoControlador;
import Logica.Grupo;
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

@Path("/grupos")
public class Grupos {
    
    private GrupoControlador control;
    
    public Grupos(){
        control = new GrupoControlador();
    }
    
    @PermitAll
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grupo> getCursosAll() { 
        try {
            return control.obtenerGrupos();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @GET
    @Path("{codigo}")
    @Produces({MediaType.APPLICATION_JSON})
    public Grupo get(@PathParam("codigo") int codigo) {
        try {
            return control.buscarGrupo(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Grupo g) {  
        try {
            control.agregarGrupo(g);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    @PermitAll
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Grupo g) {  
        try {
            control.modificarGrupo(g);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @DELETE
    @Path("{codigo}")
    public void delete(@PathParam("codigo") int codigo) {
        try {
            control.eliminarGrupo(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
}
