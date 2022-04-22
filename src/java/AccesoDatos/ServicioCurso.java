
package AccesoDatos;

import Logica.Carrera;
import Logica.Curso;
import oracle.jdbc.internal.OracleTypes;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;

public class ServicioCurso {
    private ServicioCarrera servicioCarrera;
    private static final String insertarCurso = "{call insertarCurso(?,?,?,?)}";
    private static final String listarCurso = "{?=call listarCurso()}";
    private static final String modificarCurso ="{call modificaCurso(?,?,?,?,?)}";
    private static final String eliminarCurso  = "{call eliminarCurso(?)}";
    private static final String buscarCurso  = "{?=call buscarCurso(?)}";
    private static final String buscarCursoNom  = "{?=call buscarCursoNom(?)}";

    public ServicioCurso(){ this.servicioCarrera = new ServicioCarrera(); }

    public void insertarCurso(Curso curso) throws Exception {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(insertarCurso);
        pst.setString(1, curso.getNombre());
        pst.setInt(2, curso.getCreditos());
        pst.setInt(3, curso.getHorasSemanales());
        pst.setInt(4, curso.getCarrera().getCodigo());
        if(pst.executeUpdate() == 0)
            throw new Exception("El curso ya existe");
    }

    public void modificarCurso(Curso curso) throws Exception  {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(modificarCurso);
        pst.setInt(1, curso.getCodigo());
        pst.setString(2, curso.getNombre());
        pst.setInt(3, curso.getCreditos());
        pst.setInt(4, curso.getHorasSemanales());
        pst.setInt(5, curso.getCarrera().getCodigo());
        if(pst.executeUpdate() == 0)
            throw new Exception("Ha ocurrido un error");
    }

    public Collection listarCurso() throws Exception{
        ArrayList coleccionCurso = new ArrayList();
        CallableStatement pst = ConnectionService.instance().prepareCallable(listarCurso);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            int codigoCarrera = rs.getInt("codigo_carrera");
            Carrera carrera = this.servicioCarrera.buscarCarrera(codigoCarrera);
            Curso curso = new Curso(rs.getInt("codigo"), rs.getString("nombre"), rs.getInt("creditos"), rs.getInt("horas_semanales"), carrera);
            coleccionCurso.add(curso);
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(coleccionCurso == null || coleccionCurso.size()==0) {
            throw new NoDataException("No hay datos relacionados los cursos");
        }
        return coleccionCurso;
    }

    public Curso buscarCurso(int codigo) throws Exception{
        Curso curso = null;
        CallableStatement pst = ConnectionService.instance().prepareCallable(buscarCurso);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setInt(2, codigo);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            int codigoCarrera = rs.getInt("codigo_carrera");
            Carrera carrera = this.servicioCarrera.buscarCarrera(codigoCarrera);
            curso = new Curso(rs.getInt("codigo"), rs.getString("nombre"), rs.getInt("creditos"), rs.getInt("horas_semanales"), carrera);
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(curso == null)
            throw new Exception("Curso no encontrada");
        return curso;
    }
    
    public Curso buscarCursoNom(String nombre) throws Exception{
        Curso curso = null;
        CallableStatement pst = ConnectionService.instance().prepareCallable(buscarCursoNom);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setString(2, nombre);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            int codigoCarrera = rs.getInt("codigo_carrera");
            Carrera carrera = this.servicioCarrera.buscarCarrera(codigoCarrera);
            curso = new Curso(rs.getInt("codigo"), rs.getString("nombre"), rs.getInt("creditos"), rs.getInt("horas_semanales"), carrera);
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(curso == null)
            throw new Exception("Curso no encontrada");
        return curso;
    }

    public void eliminarCurso(int codigo) throws Exception{
        PreparedStatement pst = ConnectionService.instance().prepareStatement(eliminarCurso);
        pst.setInt(1,codigo);
        if(pst.executeUpdate() == 0)
            throw new Exception("No se pudo eliminar el curso");
    }   
}
