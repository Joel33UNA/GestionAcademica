
package Presentacion;

import Controlador.MatriculaControlador;
import Logica.Matricula;
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
    
    private MatriculaControlador control;
    
    public Matriculas(){
        control = new MatriculaControlador();
    }
    
    @PermitAll
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Matricula> getMatriculaAll() { 
        try {
            return control.obtenerMatriculas();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @GET
    @Path("{codigo}")
    @Produces({MediaType.APPLICATION_JSON})
    public Matricula get(@PathParam("codigo") int codigo) {
        try {
            return control.buscarMatricula(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Matricula m) {  
        try {
            control.agregarMatricula(m);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    @PermitAll
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Matricula m) {  
        try {
            control.modificarMatricula(m);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @DELETE
    @Path("{codigo}")
    public void delete(@PathParam("codigo") int codigo) {
        try {
            control.eliminarMatricula(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
}
