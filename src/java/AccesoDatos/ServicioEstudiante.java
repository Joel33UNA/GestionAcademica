
package AccesoDatos;

import Logica.Carrera;
import Logica.Estudiante;
import Logica.Grupo;
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
    private ServicioGrupo servicioGrupo;
    private static final String insertarEstudiante = "{call insertarEstudiante(?,?,?,?,?,?)}";
    private static final String listarEstudiante = "{?=call listarEstudiante()}";
    private static final String modificarEstudiante ="{call modificaEstudiante(?,?,?,?,?,?)}";
    private static final String eliminarEstudiante  = "{call eliminarEstudiante(?)}";
    private static final String buscarEstudiante  = "{?=call buscarEstudiante(?)}";
    private static final String buscarEstudianteNom  = "{?=call buscarEstudianteNom(?)}";
    private static final String buscarGrupo  = "{?=call buscarGrupo(?)}";

    public ServicioEstudiante(){
        this.servicioCarrera = new ServicioCarrera();
        this.servicioUsuario = new ServicioUsuario();
        this.servicioGrupo = new ServicioGrupo();
    }

    public void insertarEstudiante(Estudiante estudiante) throws Exception {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(insertarEstudiante);
        pst.setInt(1, estudiante.getCedula());
        pst.setString(2, estudiante.getNombre());
        pst.setInt(3, estudiante.getTelefono());
        pst.setString(4, estudiante.getEmail());
        pst.setDate(5, estudiante.getFechaNacimiento());
        pst.setInt(6, estudiante.getCarrera().getCodigo());
        pst.setInt(7, estudiante.getGrupo().getCodigo());
        if(pst.executeUpdate() == 0)
            throw new Exception("El estudiante ya existe");
    }

    public void modificarEstudiante(Estudiante estudiante) throws Exception  {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(modificarEstudiante);
        pst.setString(1, estudiante.getNombre());
        pst.setInt(2, estudiante.getTelefono());
        pst.setString(3, estudiante.getEmail());
        pst.setDate(4, estudiante.getFechaNacimiento());
        pst.setInt(5, estudiante.getCarrera().getCodigo());
        pst.setInt(6, estudiante.getGrupo().getCodigo());
        if(pst.executeUpdate() == 0)
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
            Grupo grupo = this.servicioGrupo.buscarGrupo(rs.getInt("codigo_grupo"));
            Estudiante estudiante = new Estudiante(rs.getInt("cedula"),usuario.getClave(),usuario.getRol(),rs.getString("nombre"),rs.getInt("telefono"),rs.getString("email"),rs.getDate("fecha_de_nacimiento"),carrera,grupo);
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
            Grupo grupo = this.servicioGrupo.buscarGrupo(rs.getInt("codigo_grupo"));
            estudiante = new Estudiante(rs.getInt("cedula"),usuario.getClave(),usuario.getRol(),rs.getString("nombre"),rs.getInt("telefono"),rs.getString("email"),rs.getDate("fecha_de_nacimiento"),carrera,grupo);
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(estudiante == null)
            throw new Exception("Estudiante no encontrada");
        return estudiante;
    }
    
    public Estudiante buscarEstudianteNom(String nombre) throws Exception {
        Estudiante estudiante = null;
        CallableStatement pst = ConnectionService.instance().prepareCallable(buscarEstudianteNom);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setString(2, nombre);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            Usuario usuario = this.servicioUsuario.buscarUsuario(rs.getInt("cedula"));
            Carrera carrera = this.servicioCarrera.buscarCarrera(rs.getInt("codigo_carrera"));
            Grupo grupo = this.servicioGrupo.buscarGrupo(rs.getInt("codigo_grupo"));
            estudiante = new Estudiante(rs.getInt("cedula"),usuario.getClave(),usuario.getRol(),rs.getString("nombre"),rs.getInt("telefono"),rs.getString("email"),rs.getDate("fecha_de_nacimiento"),carrera,grupo);
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(estudiante == null)
            throw new Exception("Estudiante no encontrado");
        return estudiante;
    }

    public void eliminarEstudiante(int cedula) throws Exception {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(eliminarEstudiante);
        pst.setInt(1,cedula);
        if(pst.executeUpdate() == 0)
            throw new Exception("No se pudo eliminar el estudiante");
    }
}
