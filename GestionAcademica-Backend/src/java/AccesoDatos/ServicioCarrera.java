
package AccesoDatos;

import Logica.Carrera;
import oracle.jdbc.internal.OracleTypes;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;

/**
 *
 * @author Administrador
 */


public class ServicioCarrera {
    
    /** Creates a new instance of servicioCarrera */
    
     private static final String insertarCarrera = "{call insertarCarrera(?,?)}";
     private static final String listarCarrera = "{?=call listarCarrera()}";
     private static final String modificarCarrera ="{call modificaCarrera(?,?,?)}";
     private static final String eliminarCarrera  = "{call eliminarCarrera(?)}";
     private static final String buscarCarrera  = "{?=call buscarCarrera(?)}";


    public void insertarCarrera(Carrera carrera) throws Exception {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(insertarCarrera);
        pst.setString(1, carrera.getNombre());
        pst.setString(2, carrera.getTitulo());
        if(ConnectionService.instance().executeUpdate(pst) == 0)
            throw new Exception("La carrera ya existe");
    }
    
    public void modificarCarrera(Carrera carrera) throws Exception  {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(modificarCarrera);
        pst.setInt(1, carrera.getCodigo());
        pst.setString(2, carrera.getNombre());
        pst.setString(3, carrera.getTitulo());
        if(ConnectionService.instance().executeUpdate(pst) == 0)
            throw new Exception("Ha ocurrido un error");
    }
    
    public Collection listarCarrera() throws Exception{
        ArrayList coleccionCarreras = new ArrayList();
        CallableStatement pst = ConnectionService.instance().prepareCallable(listarCarrera);
        pst.registerOutParameter(1, OracleTypes.CURSOR); // ACA HAY UN PROBLEMA CON EL ORACLETYPES
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            Carrera carrera = new Carrera(rs.getInt("codigo"),rs.getString("nombre"),rs.getString("titulo"));
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
        while (rs.next()) {
            carrera = new Carrera(rs.getInt("codigo"),rs.getString("nombre"),rs.getString("titulo"));
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
        if(ConnectionService.instance().executeUpdate(pst) == 0)
            throw new Exception("No se pudo eliminar la carrera");
    }
}
