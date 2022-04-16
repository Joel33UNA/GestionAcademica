
package Controlador;

import Logica.Matricula;
import Modelo.ModelMatricula;
import java.util.ArrayList;

public class MatriculaControlador {
    public ArrayList<Matricula> obtenerMatriculas() throws Exception{
        return ModelMatricula.instancia().obtenerMatriculas();
    }
    
    public Matricula buscarMatricula(int codigo) throws Exception{
        return ModelMatricula.instancia().buscarMatricula(codigo);
    }
    
    public void agregarMatricula(Matricula c) throws Exception{
        ModelMatricula.instancia().agregarMatricula(c);
    }
    
    public void modificarMatricula(Matricula u) throws Exception{
        ModelMatricula.instancia().modificarMatricula(u);
    }
    
    public void eliminarMatricula(int codigo) throws Exception{
        ModelMatricula.instancia().eliminarMatricula(codigo);
    } 
}
