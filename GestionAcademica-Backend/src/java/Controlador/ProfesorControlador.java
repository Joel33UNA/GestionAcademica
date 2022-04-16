
package Controlador;

import Logica.Profesor;
import Modelo.ModelProfesor;
import java.util.ArrayList;

public class ProfesorControlador {
    
    public ArrayList<Profesor> obtenerProfesores() throws Exception{
        return ModelProfesor.instancia().obtenerProfesores();
    }
    
    public Profesor buscarProfesor(int cedula) throws Exception{
        return ModelProfesor.instancia().buscarProfesor(cedula);
    }
    
    public void agregarProfesor(Profesor u) throws Exception{
        ModelProfesor.instancia().agregarProfesor(u);
    }
    
    public void modificarProfesor(Profesor u) throws Exception{
        ModelProfesor.instancia().modificarProfesor(u);
    }
    
    public void eliminarProfesor(int cedula) throws Exception{
        ModelProfesor.instancia().eliminarProfesor(cedula);
    }
    
}
