
package AccesoDatos;

import java.sql.*;

public class ConnectionService {
    Connection conn;
    static ConnectionService instance;

    public static ConnectionService instance(){
        if(instance == null)
            instance = new ConnectionService();
        return instance;
    }

    private ConnectionService(){
        conn = this.getConnection();
    }

    public Connection getConnection(){
        try{
            Class.forName("oracle.jdbc.driver.OracleDriver");
            return DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "system", "root");
        }
        catch(Exception ex){
            System.err.println(ex.getMessage());
            System.exit(-1);
            return null;
        }
    }

    public PreparedStatement prepareStatement(String statement) throws SQLException {
        return conn.prepareStatement(statement);
    }

    public CallableStatement prepareCallable(String statement) throws SQLException {
        return conn.prepareCall(statement);
    }

    public int executeUpdate(PreparedStatement statement) {
        try {
            statement.executeUpdate();
            return statement.getUpdateCount();
        } catch (SQLException ex) {
            return 0;
        }
    }

    public ResultSet executeQuery(PreparedStatement statement){
        try {
            return statement.executeQuery();
        } catch (SQLException ex) {
        }
        return null;
    }
}