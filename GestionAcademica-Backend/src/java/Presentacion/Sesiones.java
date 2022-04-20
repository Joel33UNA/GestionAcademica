
package Presentacion;

import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import Logica.Usuario;
import Modelo.ModelSesion;


@Path("/sesiones")
public class Sesiones {
    @Context
    private HttpServletRequest request;
    
    @PermitAll
    @POST
    @Path("comprobar")
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes(MediaType.APPLICATION_JSON)
    public Usuario comprobar(Usuario u){
        try{
            Usuario us = ModelSesion.instancia().comprobarUsuario(u.getCedula(), u.getClave());
            request.getSession(true).setAttribute("user", us);
            return us;        
        }
        catch(Exception ex){
            throw new NotAcceptableException(); 
        }
    }
    
//    @PermitAll
//    @POST
//    @Path("registrarse")
//    @Consumes(MediaType.APPLICATION_JSON)
//    public void add(Usuario u){
//        try{
//            Service.instancia().agregarUsuario(u);
//        }
//        catch(Exception ex){
//            throw new NotAcceptableException();
//        }
//    }
    
    @PermitAll
    @DELETE
    public void logout(){
        try{
            HttpSession sesion = request.getSession(true);
            sesion.removeAttribute("user"); 
            sesion.invalidate();
        }
        catch(Exception ex){
            throw new NotAcceptableException();
        }
    }
}