
package Presentacion;

import Controlador.CicloControlador;
import Modelo.ModelCiclo;
import Logica.Ciclo;
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

@Path("/ciclos")
public class Ciclos {
    CicloControlador control;

    public Ciclos(CicloControlador control) {
        this.control = control;
    }
    
    @PermitAll
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Ciclo> getCiclosAll() { 
        try {
            return this.control.obtenerCiclos();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @GET
    @Path("{anio}")
    @Produces({MediaType.APPLICATION_JSON})
    public Ciclo get(@PathParam("anio") int anio) {
        try {
            return this.control.buscarCiclo(anio);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Ciclo c) {  
        try {
            this.control.agregarCiclo(c);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    @PermitAll
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Ciclo c) {  
        try {
            this.control.agregarCiclo(c);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @PermitAll
    @DELETE
    @Path("{codigo}")
    public void delete(@PathParam("codigo") int codigo) {
        try {
            this.control.eliminarCiclo(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
}
