
package Controlador;

import Modelo.ModelCurso;
import Logica.Curso;
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

@Path("/cursos")
public class Cursos {
    @RolesAllowed({"administrador", "matriculador"})
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Curso> getCursosAll() { 
        try {
            return ModelCurso.instancia().obtenerCursos();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @RolesAllowed({"administrador"})
    @GET
    @Path("{codigo}")
    @Produces({MediaType.APPLICATION_JSON})
    public Curso get(@PathParam("codigo") int codigo) {
        try {
            return ModelCurso.instancia().buscarCurso(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @RolesAllowed({"administrador"})
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Curso c) {  
        try {
            ModelCurso.instancia().agregarCurso(c);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    @RolesAllowed({"administrador", "matriculador"})
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Curso c) {  
        try {
            ModelCurso.instancia().modificarCurso(c);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @RolesAllowed({"administrador"})
    @DELETE
    @Path("{codigo}")
    public void delete(@PathParam("codigo") int codigo) {
        try {
            ModelCurso.instancia().eliminarCurso(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
}