
package AccesoDatos;

import Logica.Estudiante;
import Logica.Grupo;
import Logica.Matricula;
import oracle.jdbc.internal.OracleTypes;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;

public class ServicioMatricula {

    private ServicioEstudiante servicioEstudiante;
    private ServicioUsuario servicioUsuario;
    private ServicioGrupo servicioGrupo;
    private ServicioCurso servicioCurso;
    private ServicioProfesor servicioProfesor;
    private ServicioCiclo servicioCiclo;
    private ServicioCarrera servicioCarrera;
    private static final String insertarMatricula = "{call insertarMatricula(?,?,?)}";
    private static final String listarMatricula = "{?=call listarMatricula()}";
    private static final String modificarMatricula ="{call modificaMatricula(?,?,?,?)}";
    private static final String eliminarMatricula  = "{call eliminarMatricula(?)}";
    private static final String buscarMatricula  = "{?=call buscarMatricula(?)}";

    public ServicioMatricula() {
        this.servicioEstudiante = new ServicioEstudiante();
        this.servicioGrupo = new ServicioGrupo();
    }

    public void insertarMatricula(Matricula matricula) throws Exception {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(insertarMatricula);
        pst.setInt(1, matricula.getEstudiante().getCedula());
        pst.setInt(2, matricula.getGrupo().getCodigo());
        pst.setInt(3, matricula.getNota());
        if(pst.executeUpdate() == 0)
            throw new Exception("La matricula ya existe");
    }

    public void modificarMatricula(Matricula matricula) throws Exception  {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(modificarMatricula);
        pst.setInt(1, matricula.getCodigo());
        pst.setInt(2, matricula.getEstudiante().getCedula());
        pst.setInt(3, matricula.getGrupo().getCodigo());
        pst.setInt(4, matricula.getNota());
        if(pst.executeUpdate() == 0)
            throw new Exception("Ha ocurrido un error");
    }

    public Collection listarMatricula(int cedula) throws Exception{
        ArrayList coleccionMatriculas = new ArrayList();
        CallableStatement pst = ConnectionService.instance().prepareCallable(listarMatricula);
        pst.registerOutParameter(1, OracleTypes.CURSOR); // ACA HAY UN PROBLEMA CON EL ORACLETYPES
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            Estudiante estudiante = this.servicioEstudiante.buscarEstudiante(rs.getInt("cedula_estudiante"));
            Grupo grupo = this.servicioGrupo.buscarGrupo(rs.getInt("codigo_grupo"));
            Matricula matricula = new Matricula(rs.getInt("codigo_matricula"),estudiante,grupo,rs.getInt("nota"));
            if(matricula.getEstudiante().getCedula() == cedula || cedula == -1){
                coleccionMatriculas.add(matricula);
            }else{
                if(matricula.getGrupo().getProfesor().getCedula() == cedula || cedula == -1){
                    coleccionMatriculas.add(matricula);
                }
            }
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(coleccionMatriculas == null || coleccionMatriculas.size()==0) {
            throw new NoDataException("No hay datos relacionados con el Comprobante de pago");
        }
        return coleccionMatriculas;
    }

    public Matricula buscarMatricula(int codigo) throws Exception{
        Matricula matricula = null;
        CallableStatement pst = ConnectionService.instance().prepareCallable(buscarMatricula);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setInt(2, codigo);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        Estudiante estudiante = this.servicioEstudiante.buscarEstudiante(rs.getInt("cedula_estudiante"));
        Grupo grupo = this.servicioGrupo.buscarGrupo(rs.getInt("codigo_grupo"));
        while (rs.next()) {
            matricula = new Matricula(rs.getInt("codigo"),estudiante,grupo,rs.getInt("nota"));
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(matricula == null)
            throw new Exception("Matricula no encontrada");
        return matricula;
    }

    public void eliminarMatricula(int codigo) throws Exception{
        PreparedStatement pst = ConnectionService.instance().prepareStatement(eliminarMatricula);
        pst.setInt(1,codigo);
        if(pst.executeUpdate() == 0)
            throw new Exception("No se pudo eliminar la matricula");
    }
}
