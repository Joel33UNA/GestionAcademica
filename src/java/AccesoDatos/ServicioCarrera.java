
package AccesoDatos;

import Logica.Carrera;
import Logica.Curso;
import oracle.jdbc.internal.OracleTypes;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;

public class ServicioCarrera {
    private static final String insertarCarrera = "{call insertarCarrera(?,?)}";
    private static final String listarCarrera = "{?=call listarCarrera()}";
    private static final String modificarCarrera ="{call modificaCarrera(?,?,?)}";
    private static final String eliminarCarrera  = "{call eliminarCarrera(?)}";
    private static final String buscarCarrera  = "{?=call buscarCarrera(?)}";
    private static final String buscarCarreraNom  = "{?=call buscarCarreraNom(?)}";
    private static final String buscarCursoCar = "{?=call buscarCursoCar(?)}";
     
    public void insertarCarrera(Carrera carrera) throws Exception {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(insertarCarrera);
        pst.setString(1, carrera.getNombre());
        pst.setString(2, carrera.getTitulo());
        if(pst.executeUpdate() == 0)
            throw new Exception("La carrera ya existe");
    }
    
    public void modificarCarrera(Carrera carrera) throws Exception  {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(modificarCarrera);
        pst.setInt(1, carrera.getCodigo());
        pst.setString(2, carrera.getNombre());
        pst.setString(3, carrera.getTitulo());
        if(pst.executeUpdate() == 0)
            throw new Exception("Ha ocurrido un error");
    }
    
    public Collection listarCarrera() throws Exception{
        ArrayList coleccionCarreras = new ArrayList();
        CallableStatement pst = ConnectionService.instance().prepareCallable(listarCarrera);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        ArrayList<Curso> cursos = new ArrayList<>();
        while (rs.next()) {
            cursos = (ArrayList<Curso>)this.buscarCursoPorCarrera(rs.getInt("codigo"));
            Carrera carrera = new Carrera(rs.getInt("codigo"),rs.getString("nombre"),rs.getString("titulo"), cursos);
            coleccionCarreras.add(carrera);
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(coleccionCarreras.size()==0) {
            throw new NoDataException("No hay datos relacionados con la carrera");
        }
        return coleccionCarreras;
    }
    
    public Carrera buscarCarrera(int codigo) throws Exception{
        Carrera carrera = null;
        CallableStatement pst = ConnectionService.instance().prepareCallable(buscarCarrera);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setInt(2, codigo);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        ArrayList<Curso> cursos = new ArrayList<>();
        while (rs.next()) {
            cursos = (ArrayList<Curso>)this.buscarCursoPorCarrera(rs.getInt("codigo"));
            carrera = new Carrera(rs.getInt("codigo"),rs.getString("nombre"),rs.getString("titulo"), cursos);
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(carrera == null)
            throw new Exception("Carrera no encontrada");
        return carrera;
    }
    
    public Carrera buscarCarreraNom(String nombre) throws Exception{
        Carrera carrera = null;
        CallableStatement pst = ConnectionService.instance().prepareCallable(buscarCarreraNom);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setString(2, nombre);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        ArrayList<Curso> cursos = new ArrayList<>();
        while (rs.next()) {
            cursos = (ArrayList<Curso>)this.buscarCursoPorCarrera(rs.getInt("codigo"));
            carrera = new Carrera(rs.getInt("codigo"),rs.getString("nombre"),rs.getString("titulo"), cursos);
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(carrera == null)
            throw new Exception("Carrera no encontrada");
        return carrera;
    }
    
    public void eliminarCarrera(int codigo) throws Exception{
        PreparedStatement pst = ConnectionService.instance().prepareStatement(eliminarCarrera);
        pst.setInt(1,codigo);
        if(pst.executeUpdate() == 0)
            throw new Exception("No se pudo eliminar la carrera");
    }
    
    public Collection buscarCursoPorCarrera(int codigo) throws Exception{
        ArrayList coleccionCurso = new ArrayList();
        CallableStatement pst = ConnectionService.instance().prepareCallable(buscarCursoCar);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setInt(2, codigo);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            Carrera carrera = new Carrera(codigo, "", "", null);
            Curso curso = new Curso(rs.getInt("codigo"), rs.getString("nombre"), rs.getInt("creditos"), rs.getInt("horas_semanales"), carrera);
            coleccionCurso.add(curso);
        }
        if(coleccionCurso.isEmpty()) {
            throw new NoDataException("No hay datos relacionados los cursos");
        }
        return coleccionCurso;
    }
}
