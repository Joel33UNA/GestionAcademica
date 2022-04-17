
package AccesoDatos;

import Logica.Ciclo;
import oracle.jdbc.internal.OracleTypes;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;


public class ServicioCiclo {
     private static final String insertarCiclo = "{call insertarCiclo(?,?,?,?)}";
     private static final String listarCiclo = "{?=call listarCiclo()}";
     private static final String modificarCiclo ="{call modificaCiclo(?,?,?,?,?)}";
     private static final String eliminarCiclo  = "{call eliminarCiclo(?)}";
     private static final String buscarCiclo  = "{?=call buscarCiclo(?)}";

    public void insertarCiclo(Ciclo ciclo) throws Exception {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(insertarCiclo);
        pst.setInt(1, ciclo.getAnio());
        pst.setInt(2, ciclo.getNumeroCiclo());
        pst.setDate(3, ciclo.getFechaFin());
        pst.setDate(4, ciclo.getFechaFin());
        if(pst.executeUpdate() == 0)
            throw new Exception("El curso ya existe");
    }

    public void modificarCiclo(Ciclo ciclo) throws Exception  {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(modificarCiclo);
        pst.setInt(1, ciclo.getCodigo());
        pst.setInt(2, ciclo.getAnio());
        pst.setInt(3, ciclo.getNumeroCiclo());
        pst.setDate(4, ciclo.getFechaInicio());
        pst.setDate(5, ciclo.getFechaFin());
        if(pst.executeUpdate() == 0)
            throw new Exception("Ha ocurrido un error");
    }

    public Collection listarCiclo() throws Exception{
        ArrayList coleccionCiclo = new ArrayList();
        CallableStatement pst = ConnectionService.instance().prepareCallable(listarCiclo);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            Ciclo ciclo = new Ciclo(rs.getInt("codigo"), rs.getInt("anio"), rs.getInt("numero_ciclo"), rs.getDate("fecha_inicio"), rs.getDate("fecha_fin"));
            coleccionCiclo.add(ciclo);
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(coleccionCiclo == null || coleccionCiclo.size()==0) {
            throw new NoDataException("No hay datos relacionados con los ciclos");
        }
        return coleccionCiclo;
    }

    public Ciclo buscarCiclo(int anio) throws Exception{
        Ciclo ciclo = null;
        CallableStatement pst = ConnectionService.instance().prepareCallable(buscarCiclo);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setInt(2, anio);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            ciclo = new Ciclo(rs.getInt("codigo"), rs.getInt("anio"), rs.getInt("numero_ciclo"), rs.getDate("fecha_inicio"), rs.getDate("fecha_fin"));
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(ciclo == null)
            throw new Exception("Ciclo no encontrado");
        return ciclo;
    }

    public void eliminarCiclo(int codigo) throws Exception{
        PreparedStatement pst = ConnectionService.instance().prepareStatement(eliminarCiclo);
        pst.setInt(1,codigo);
        if(pst.executeUpdate() == 0)
            throw new Exception("No se pudo eliminar el ciclo");
    }
}
