
package Controlador;

import Modelo.ModelMatricula;
import Logica.Matricula;
import java.util.ArrayList;
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

@Path("/matriculas")
public class Matriculas {
    @PermitAll
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Matricula> getMatriculaAll() { 
        try {
            return ModelMatricula.instancia().obtenerMatriculas(-1); // MacGyver para usar el mismo método en el get
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @GET
    @Path("{cedula}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Matricula> get(@PathParam("cedula") int cedula) {
        try {
            return ModelMatricula.instancia().obtenerMatriculas(cedula);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Matricula m) {  
        try {
            ModelMatricula.instancia().agregarMatricula(m);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    @PermitAll
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Matricula m) {  
        try {
            ModelMatricula.instancia().modificarMatricula(m);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @DELETE
    @Path("{codigo}")
    public void delete(@PathParam("codigo") int codigo) {
        try {
            ModelMatricula.instancia().eliminarMatricula(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
}