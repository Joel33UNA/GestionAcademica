
package AccesoDatos;

import Logica.Ciclo;
import Logica.Curso;
import Logica.Estudiante;
import Logica.Grupo;
import Logica.Profesor;
import oracle.jdbc.internal.OracleTypes;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;

public class ServicioGrupo {
     private ServicioCiclo servicioCiclo;
     private ServicioCurso servicioCurso;
     private ServicioProfesor servicioProfesor;
     private static final String insertarGrupo = "{call insertarGrupo(?,?,?,?)}";
     private static final String listarGrupo = "{?=call listarGrupo()}";
     private static final String modificarGrupo ="{call modificaGrupo(?,?,?,?,?)}";
     private static final String eliminarGrupo  = "{call eliminarGrupo(?)}";
     private static final String buscarGrupo  = "{?=call buscarGrupo(?)}";
     
    public ServicioGrupo() {
        this.servicioCurso = new ServicioCurso();
        this.servicioCiclo = new ServicioCiclo();
        this.servicioProfesor = new ServicioProfesor();
    }

    public void insertarGrupo(Grupo grupo) throws Exception {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(insertarGrupo);
        pst.setString(1, grupo.getHorario());
        pst.setInt(2, grupo.getCiclo().getCodigo());
        pst.setInt(3, grupo.getCurso().getCodigo());
        pst.setInt(4, grupo.getProfesor().getCedula());
        if(pst.executeUpdate() == 0)
            throw new Exception("El grupo ya existe");
    }
    
    public void modificarGrupo(Grupo grupo) throws Exception  {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(modificarGrupo);
        pst.setInt(1, grupo.getCodigo());
        pst.setString(2, grupo.getHorario());
        pst.setInt(3, grupo.getCiclo().getCodigo());
        pst.setInt(4, grupo.getCurso().getCodigo());
        pst.setInt(5, grupo.getProfesor().getCedula());
        if(pst.executeUpdate() == 0)
            throw new Exception("Ha ocurrido un error");
    }   
    
    public Collection listarGrupo() throws Exception {
        ArrayList coleccionGrupos = new ArrayList();
        CallableStatement pst = ConnectionService.instance().prepareCallable(listarGrupo);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            Ciclo ciclo = this.servicioCiclo.buscarCiclo(rs.getInt("codigo_ciclo"));
            Curso curso = this.servicioCurso.buscarCurso(rs.getInt("codigo_curso"));
            Profesor profesor = this.servicioProfesor.buscarProfesor(rs.getInt("codigo_profesor"));
            Grupo grupo = new Grupo(rs.getInt("codigo"), rs.getString("horario"), curso, ciclo, profesor, new ArrayList<Estudiante>());
            coleccionGrupos.add(grupo);
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(coleccionGrupos == null || coleccionGrupos.size()==0) {
            throw new NoDataException("No hay datos relacionados los grupos");
        }
        return coleccionGrupos;
    }
    
    public Grupo buscarGrupo(int codigo) throws Exception {
        Grupo grupo = null;
        CallableStatement pst = ConnectionService.instance().prepareCallable(buscarGrupo);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setInt(2, codigo);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            Ciclo ciclo = this.servicioCiclo.buscarCicloCod(rs.getInt("codigo_ciclo"));
            Curso curso = this.servicioCurso.buscarCurso(rs.getInt("codigo_curso"));
            Profesor profesor = this.servicioProfesor.buscarProfesor(rs.getInt("cedula_profesor"));
            grupo = new Grupo(rs.getInt("codigo"), rs.getString("horario"), curso, ciclo, profesor, new ArrayList<Estudiante>());
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(grupo == null)
            throw new Exception("Grupo no encontrada");
        return grupo;
    }
    public void eliminarGrupo(int codigo) throws Exception{
        PreparedStatement pst = ConnectionService.instance().prepareStatement(eliminarGrupo);
        pst.setInt(1,codigo);
        if(pst.executeUpdate() == 0)
            throw new Exception("No se pudo eliminar el grupo");
    }
}
