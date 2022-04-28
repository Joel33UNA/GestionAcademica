
package Controlador;

import Modelo.ModelGrupo;
import Logica.Grupo;
import java.util.ArrayList;
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

@Path("/grupos")
public class Grupos {
    @RolesAllowed({"administrador", "matriculador"})
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Grupo> getCursosAll() { 
        try {
            return ModelGrupo.instancia().obtenerGrupos();
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @RolesAllowed({"administrador", "matriculador"})
    @GET
    @Path("{codigo}")
    @Produces({MediaType.APPLICATION_JSON})
    public Grupo get(@PathParam("codigo") int codigo) {
        try {
            return ModelGrupo.instancia().buscarGrupo(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @RolesAllowed({"administrador", "matriculador"})
    @GET
    @Path("{codigoCarrera}/{codigoCiclo}")
    @Produces({MediaType.APPLICATION_JSON})
    public ArrayList<Grupo> getGruposCiclos(@PathParam("codigoCarrera") int codCarrera, @PathParam("codigoCiclo") int codCiclo){
        try{
            return ModelGrupo.instancia().buscarGrupoCiclo(codCarrera, codCiclo);
        } catch(Exception ex){
            throw new NotFoundException();
        }
    }
    
    @RolesAllowed({"administrador", "matriculador"})
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void add(Grupo g) {  
        try {
            ModelGrupo.instancia().agregarGrupo(g);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    @RolesAllowed({"administrador", "matriculador"})
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(Grupo g) {  
        try {
            ModelGrupo.instancia().modificarGrupo(g);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @RolesAllowed({"administrador", "matriculador"})
    @DELETE
    @Path("{codigo}")
    public void delete(@PathParam("codigo") int codigo) {
        try {
            ModelGrupo.instancia().eliminarGrupo(codigo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
}