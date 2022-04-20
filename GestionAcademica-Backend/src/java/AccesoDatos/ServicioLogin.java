
package AccesoDatos;

import Logica.Usuario;
import oracle.jdbc.internal.OracleTypes;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ServicioLogin {
    private static final String login = "{?=call login(?,?)}";

    public Usuario loginUsuario(int user, String password) throws Exception {
        CallableStatement pst = ConnectionService.instance().prepareCallable(login);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setInt(2, user);
        pst.setString(3, password);
        pst.execute();
        ResultSet rs = (ResultSet) pst.getObject(1);
        Usuario u = null;
        while (rs.next()) {
            u = new Usuario();
            u.setCedula(rs.getInt("cedula"));
            u.setClave(rs.getString("clave"));
            u.setRol(rs.getString("rol"));
        }
        if(u == null) throw new Exception("Usuario no encontrado");
        return u;
    }
}



