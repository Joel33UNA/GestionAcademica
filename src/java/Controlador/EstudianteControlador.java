
package Controlador;

import Logica.Estudiante;
import Modelo.ModelEstudiante;
import java.util.ArrayList;

public class EstudianteControlador {
    public ArrayList<Estudiante> obtenerEstudiantes() throws Exception{
        return ModelEstudiante.instancia().obtenerEstudiantes();
    }
    
    public Estudiante buscarEstudiante(int cedula) throws Exception{
        return ModelEstudiante.instancia().buscarEstudiante(cedula);
    }
    
    public Estudiante buscarEstudianteNom(String nombre) throws Exception{
        return ModelEstudiante.instancia().buscarEstudianteNom(nombre);
    }
    
    public void agregarEstudiante(Estudiante u) throws Exception{
        ModelEstudiante.instancia().agregarEstudiante(u);
    }
    
    public void modificarEstudiante(Estudiante u) throws Exception{
        ModelEstudiante.instancia().modificarEstudiante(u);
    }
    
    public void eliminarEstudiante(int cedula) throws Exception{
        ModelEstudiante.instancia().eliminarEstudiante(cedula);
    }
}
