
package Controlador;

import Modelo.ModelProfesor;
import Logica.Profesor;
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

@Path("/profesores")
public class Profesores {
    //@RolesAllowed({"administrador"})
    @PermitAll
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Profesor> getProfesoresAll() { 
        try {
            return ModelProfesor.instancia().obtenerProfesores();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    //@RolesAllowed({"administrador", "profesor"})
    @PermitAll
    @GET
    @Path("{cedula}")
    @Produces({MediaType.APPLICATION_JSON})
    public Profesor get(@PathParam("cedula") int cedula) {
        try {
            return ModelProfesor.instancia().buscarProfesor(cedula);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Profesor p) {  
        try {
            ModelProfesor.instancia().agregarProfesor(p);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    @PermitAll
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Profesor p) {  
        try {
            ModelProfesor.instancia().modificarProfesor(p);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @DELETE
    @Path("{cedula}")
    public void delete(@PathParam("cedula") int cedula) {
        try {
            ModelProfesor.instancia().eliminarProfesor(cedula);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
}