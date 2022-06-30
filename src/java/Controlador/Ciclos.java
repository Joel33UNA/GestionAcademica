
package Controlador;

import Modelo.ModelCiclo;
import Logica.Ciclo;
import java.util.List;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
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

@Path("/ciclos")
public class Ciclos {
    @PermitAll
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Ciclo> getCiclosAll() { 
        try {
            return ModelCiclo.instancia().obtenerCiclos();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @GET
    @Path("{codigo}")
    @Produces({MediaType.APPLICATION_JSON})
    public Ciclo get(@PathParam("codigo") int codigo) {
        try {
            return ModelCiclo.instancia().buscarCiclo(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Ciclo c) {  
        try {
            ModelCiclo.instancia().agregarCiclo(c);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    @PermitAll
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Ciclo c) {  
        try {
            ModelCiclo.instancia().modificarCiclo(c);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @DELETE
    @Path("{codigo}")
    public void delete(@PathParam("codigo") int codigo) {
        try {
            ModelCiclo.instancia().eliminarCiclo(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
}