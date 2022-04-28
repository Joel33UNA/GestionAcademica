
package Controlador;

import Logica.Carrera;
import Modelo.ModelCarrera;
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

@Path("/carreras")
public class Carreras {
    @RolesAllowed({"administrador"})
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Carrera> getCarrerasAll() { 
        try {
            return ModelCarrera.instancia().obtenerCarreras();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @RolesAllowed({"administrador","estudiante"})
    @GET
    @Path("{codigo}")
    @Produces({MediaType.APPLICATION_JSON})
    public Carrera get(@PathParam("codigo") int codigo) {
        try {
            return ModelCarrera.instancia().buscarCarrera(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @RolesAllowed({"administrador"})
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Carrera c) {  
        try {
            ModelCarrera.instancia().agregarCarrera(c);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    @RolesAllowed({"administrador"})
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Carrera c) {  
        try {
            ModelCarrera.instancia().modificarCarrera(c);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @RolesAllowed({"administrador"})
    @DELETE
    @Path("{codigo}")
    public void delete(@PathParam("codigo") int codigo) {
        try {
            ModelCarrera.instancia().eliminarCarrera(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
}