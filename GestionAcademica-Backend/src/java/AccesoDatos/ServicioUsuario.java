/*
 * servicioUsuario.java
 *
 * Created on 8 de septiembre de 2007, 10:12
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package AccesoDatos;

import Logica.Usuario;
import oracle.jdbc.internal.OracleTypes;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collection;


/**
 *
 * @author Estudiante
 */
public class ServicioUsuario {

    private static final String insertarUsuario = "{call insertarUsuario(?,?,?)}";
    private static final String listarUsuario = "{?=call listarUsuario()}";
    private static final String modificarUsuario ="{call modificarUsuario(?,?,?)}";
    private static final String eliminarUsuario  = "{call eliminarUsuario(?)}";
    private static final String buscarUsuario  = "{?=call buscarUsuario(?)}";


    public void insertarUsuario(Usuario usuario) throws Exception {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(insertarUsuario);
        pst.setInt(1, usuario.getCedula());
        pst.setString(2, usuario.getClave());
        pst.setString(3, usuario.getRol());
        if(ConnectionService.instance().executeUpdate(pst) == 0)
            throw new Exception("El usuario ya existe");
    }

    public void ModificarUsuario(Usuario usuario) throws Exception  {
        PreparedStatement pst = ConnectionService.instance().prepareStatement(modificarUsuario);
        pst.setInt(1, usuario.getCedula());
        pst.setString(2, usuario.getClave());
        pst.setString(3, usuario.getRol());
        if(ConnectionService.instance().executeUpdate(pst) == 0)
            throw new Exception("Ha ocurrido un error");
    }

    public Collection listarUsuario() throws Exception{
        ArrayList coleccionUsuario = new ArrayList();
        CallableStatement pst = ConnectionService.instance().prepareCallable(listarUsuario);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            Usuario usuario = new Usuario(rs.getInt("cedula"),rs.getString("clave"),rs.getString("rol"));
            coleccionUsuario.add(usuario);
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(coleccionUsuario == null || coleccionUsuario.size()==0) {
            throw new NoDataException("No hay datos relacionados con los usuarioes");
        }
        return coleccionUsuario;
    }

    public Usuario buscarUsuario(int cedula) throws Exception{
        Usuario usuario = null;
        CallableStatement pst = ConnectionService.instance().prepareCallable(buscarUsuario);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setInt(2, cedula);
        pst.execute();
        ResultSet rs = (ResultSet)pst.getObject(1);
        while (rs.next()) {
            usuario = new Usuario(rs.getInt("cedula"),rs.getString("clave"),rs.getString("rol"));
        }
        if(rs != null) rs.close();
        if(pst != null) pst.close();
        if(usuario == null)
            throw new Exception("Usuario no encontrado");
        return usuario;
    }

    public void eliminarUsuario(int cedula) throws Exception{
        PreparedStatement pst = ConnectionService.instance().prepareStatement(eliminarUsuario);
        pst.setInt(1,cedula);
        if(ConnectionService.instance().executeUpdate(pst) == 0)
            throw new Exception("No se pudo eliminar el usuario");
    }
}
