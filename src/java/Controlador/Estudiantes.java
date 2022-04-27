
package Controller;

import Modelo.ModelEstudiante;
import Logica.Estudiante;
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

@Path("/estudiantes")
public class Estudiantes {
    @PermitAll
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Estudiante> getEstudiantesAll() { 
        try {
            return ModelEstudiante.instancia().obtenerEstudiantes();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @GET
    @Path("{cedula}")
    @Produces({MediaType.APPLICATION_JSON})
    public Estudiante get(@PathParam("cedula") int cedula) {
        try {
            return ModelEstudiante.instancia().buscarEstudiante(cedula);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Estudiante e) {  
        try {
            ModelEstudiante.instancia().agregarEstudiante(e);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    @PermitAll
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Estudiante e) {  
        try {
            ModelEstudiante.instancia().modificarEstudiante(e);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @DELETE
    @Path("{cedula}")
    public void delete(@PathParam("cedula") int cedula) {
        try {
            ModelEstudiante.instancia().eliminarEstudiante(cedula);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
}