
package AccesoDatos;

import Logica.Profesor;
import Logica.Usuario;
import oracle.jdbc.internal.OracleTypes;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;

public class ServicioProfesor {
    private ServicioUsuario servicioUsuario;
    private static final String insertarProfesor = "{call insertarProfesor(?,?,?,?)}";
    private static final String listarProfesor = "{?=call listarProfesor()}";
    private static final String modificarProfesor ="{call modificaProfesor(?,?,?,?)}";
    private static final String eliminarProfesor  = "{call eliminarProfesor(?)}";
    private static final String buscarProfesor  = "{?=call buscarProfesor(?)}";
    private static final String buscarProfesorNom  = "{?=call buscarProfesorNom(?)}";

    public ServicioProfesor(){
        servicioUsuario = new ServicioUsuario();
    }

    public void insertarProfesor(Profesor profesor) throws Exception {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(insertarProfesor);
        pst.setInt(1, profesor.getCedula());
        pst.setString(2, profesor.getNombre());
        pst.setInt(3, profesor.getTelefono());
        pst.setString(4, profesor.getEmail());
        if(pst.executeUpdate() == 1)
            throw new Exception("El profesor ya existe");
    }

    public void ModificarProfesor(Profesor profesor) throws Exception  {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(modificarProfesor);
        pst.setInt(1, profesor.getCedula());
        pst.setString(2, profesor.getNombre());
        pst.setInt(3, profesor.getTelefono());
        pst.setString(4, profesor.getEmail());
        if(pst.executeUpdate() == 0)
            throw new Exception("Ha ocurrido un error");
    }

    public Collection listarProfesor() throws Exception{
        ArrayList coleccionProfesores = new ArrayList();
        CallableStatement pst = ConnectionService.instance().prepareCallable(listarProfesor);
        pst.registerOutParameter(1, OracleTypes.CURSOR); // ACA HAY UN PROBLEMA CON EL ORACLETYPES
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        Usuario usuario = this.servicioUsuario.buscarUsuario(rs.getInt("cedula"));
        while (rs.next()) {
            Profesor profesor = new Profesor(rs.getString("nombre"),rs.getInt("telefono"),rs.getString("email"),usuario.getCedula(),usuario.getClave(),usuario.getRol());
            coleccionProfesores.add(profesor);
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(coleccionProfesores == null || coleccionProfesores.size()==0) {
            throw new NoDataException("No hay datos relacionados con los profesores");
        }
        return coleccionProfesores;
    }

    public Profesor buscarProfesor(int cedula) throws Exception{
        Profesor profesor = null;
        CallableStatement pst = ConnectionService.instance().prepareCallable(buscarProfesor);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setInt(2, cedula);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        Usuario usuario = this.servicioUsuario.buscarUsuario(cedula);
        while (rs.next()) {
            profesor = new Profesor(rs.getString("nombre"), rs.getInt("telefono"), rs.getString("email"), usuario.getCedula(), usuario.getClave(), usuario.getRol());
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(profesor == null)
            throw new Exception("Profesor no encontrado");
        return profesor;
    }
    
    public Profesor buscarProfesorNom(String nombre) throws Exception{
        Profesor profesor = null;
        CallableStatement pst = ConnectionService.instance().prepareCallable(buscarProfesorNom);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setString(2, nombre);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        Usuario usuario = this.servicioUsuario.buscarUsuario(rs.getInt("cedula"));
        while (rs.next()) {
            profesor = new Profesor(rs.getString("nombre"), rs.getInt("telefono"), rs.getString("email"), usuario.getCedula(), usuario.getClave(), usuario.getRol());
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(profesor == null)
            throw new Exception("Profesor no encontrado");
        return profesor;
    }

    public void eliminarProfesor(int cedula) throws Exception{
        PreparedStatement pst = ConnectionService.instance().prepareStatement(eliminarProfesor);
        pst.setInt(1,cedula);
        if(pst.executeUpdate() == 0)
            throw new Exception("No se pudo eliminar el profesor");
    }
}
