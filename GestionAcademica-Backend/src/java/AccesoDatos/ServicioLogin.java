/*
 * servicioLogin.java
 *
 * Created on 8 de junio de 2007, 22:53
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package AccesoDatos;

import oracle.jdbc.internal.OracleTypes;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Administrador
 */
public class ServicioLogin {
    private static final String login = "{?=call login(?,?)}";

    public boolean loginCliente(int user, String password) throws Exception {
        boolean resp = true;
        int respuesta = 0;
        CallableStatement pst = ConnectionService.instance().prepareCallable(login);
        pst.registerOutParameter(1, OracleTypes.CURSOR);
        pst.setInt(2, user);
        pst.setString(3, password);
        pst.execute();
        ResultSet rs = (ResultSet) pst.getObject(1);
        while (rs.next()) {
            respuesta = rs.getInt("esta");
        }
        if (respuesta == 0) {
            resp = false;
        }
        try {
            if (rs != null) rs.close();
            if (pst != null) pst.close();
        } catch (SQLException e) {
            resp = false;
            throw new GlobalException("Estatutos invalidos o nulos");
        }
        return resp;
    }
}



