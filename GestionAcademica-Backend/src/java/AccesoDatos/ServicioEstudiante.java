/*
 * servicioEstudiante.java
 *
 * Created on 21 de septiembre de 2007, 10:23 PM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package AccesoDatos;

import Logica.Carrera;
import Logica.Estudiante;
import Logica.Usuario;
import oracle.jdbc.internal.OracleTypes;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;

public class ServicioEstudiante {
    private ServicioCarrera servicioCarrera;
    private ServicioUsuario servicioUsuario;
    private static final String insertarEstudiante = "{call insertarEstudiante(?,?,?,?,?,?)}";
    private static final String listarEstudiante = "{?=call listarEstudiante()}";
    private static final String modificarEstudiante ="{call modificaEstudiante(?,?,?,?,?,?)}";
    private static final String eliminarEstudiante  = "{call eliminarEstudiante(?)}";
    private static final String buscarEstudiante  = "{?=call buscarEstudiante(?)}";

    public ServicioEstudiante(){
        this.servicioCarrera = new ServicioCarrera();
        this.servicioUsuario = new ServicioUsuario();
    }

    public void insertarEstudiante(Estudiante estudiante) throws Exception {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(insertarEstudiante);
        pst.setInt(1, estudiante.getCedula());
        pst.setString(2, estudiante.getNombre());
        pst.setInt(3, estudiante.getTelefono());
        pst.setString(4, estudiante.getEmail());
        pst.setDate(5, estudiante.getFechaNacimiento());
        pst.setInt(6, estudiante.getCarrera().getCodigo());
        if(ConnectionService.instance().executeUpdate(pst) == 0)
            throw new Exception("El estudiante ya existe");
    }

    public void modificarEstudiante(Estudiante estudiante) throws Exception  {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(modificarEstudiante);
        pst.setString(1, estudiante.getNombre());
        pst.setInt(2, estudiante.getTelefono());
        pst.setString(3, estudiante.getEmail());
        pst.setDate(4, estudiante.getFechaNacimiento());
        pst.setInt(5, estudiante.getCarrera().getCodigo());
        if(ConnectionService.instance().executeUpdate(pst) == 0)
            throw new Exception("Ha ocurrido un error");
    }

    public Collection listarEstudiante() throws Exception{
        ArrayList coleccionEstudiantes = new ArrayList();
        CallableStatement pst = ConnectionService.instance().prepareCallable(listarEstudiante);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            Usuario usuario = this.servicioUsuario.buscarUsuario(rs.getInt("cedula"));
            Carrera carrera = this.servicioCarrera.buscarCarrera(rs.getInt("codigo_carrera"));
            Estudiante estudiante = new Estudiante(rs.getInt("cedula"),usuario.getClave(),usuario.getRol(),rs.getString("nombre"),rs.getInt("telefono"),rs.getString("email"),rs.getDate("fecha_de_nacimiento"),carrera);
            coleccionEstudiantes.add(estudiante);
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(coleccionEstudiantes == null || coleccionEstudiantes.size()==0) {
            throw new NoDataException("No hay datos relacionados con los estudiantes");
        }
        return coleccionEstudiantes;
    }

    public Estudiante buscarEstudiante(int codigo) throws Exception {
        Estudiante estudiante = null;
        CallableStatement pst = ConnectionService.instance().prepareCallable(buscarEstudiante);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setInt(2, codigo);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            Usuario usuario = this.servicioUsuario.buscarUsuario(rs.getInt("cedula"));
            Carrera carrera = this.servicioCarrera.buscarCarrera(rs.getInt("codigo_carrera"));
            estudiante = new Estudiante(rs.getInt("cedula"),usuario.getClave(),usuario.getRol(),rs.getString("nombre"),rs.getInt("telefono"),rs.getString("email"),rs.getDate("fecha_de_nacimiento"),carrera);
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(estudiante == null)
            throw new Exception("Estudiante no encontrada");
        return estudiante;
    }

    public void eliminarEstudiante(int cedula) throws Exception {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(eliminarEstudiante);
        pst.setInt(1,cedula);
        if(ConnectionService.instance().executeUpdate(pst) == 0)
            throw new Exception("No se pudo eliminar el estudiante");
    }
}
