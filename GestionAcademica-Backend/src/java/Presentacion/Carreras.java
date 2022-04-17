
package Presentacion;
import Controlador.CarreraControlador;
import Logica.Carrera;
import Modelo.ModelCarrera;
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

@Path("/carreras")
public class Carreras {
    CarreraControlador control;

    public Carreras(CarreraControlador control) {
        this.control = control;
    }
    
    @PermitAll
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Carrera> getCarrerasAll() { 
        try {
            return this.control.obtenerCarreras();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @GET
    @Path("{codigo}")
    @Produces({MediaType.APPLICATION_JSON})
    public Carrera get(@PathParam("codigo") int codigo) {
        try {
            return this.control.buscarCarrera(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @GET
    @Path("{nombre}")
    @Produces({MediaType.APPLICATION_JSON})
    public Carrera getByNom(@PathParam("nombre") String nombre) {
        try {
            return this.control.buscarCarreraNom(nombre);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Carrera c) {  
        try {
            this.control.agregarCarrera(c);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    @PermitAll
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Carrera c) {  
        try {
            this.control.modificarCarrera(c);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @DELETE
    @Path("{codigo}")
    public void delete(@PathParam("codigo") int codigo) {
        try {
            this.control.eliminarCarrera(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
}
