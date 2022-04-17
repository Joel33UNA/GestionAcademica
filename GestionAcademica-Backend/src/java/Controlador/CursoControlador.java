
package Controlador;

import Logica.Curso;
import Modelo.ModelCurso;
import java.util.ArrayList;

public class CursoControlador {
    public ArrayList<Curso> obtenerCursos() throws Exception{
        return ModelCurso.instancia().obtenerCursos();
    }
    
    public Curso buscarCurso(int codigo) throws Exception{
        return ModelCurso.instancia().buscarCurso(codigo);
    }
    
    public Curso buscarCursoNom(String nombre) throws Exception{
        return ModelCurso.instancia().buscarCursoNom(nombre);
    }
    
    public void agregarCurso(Curso c) throws Exception{
        ModelCurso.instancia().agregarCurso(c);
    }
    
    public void modificarCurso(Curso u) throws Exception{
        ModelCurso.instancia().modificarCurso(u);
    }
    
    public void eliminarCurso(int codigo) throws Exception{
        ModelCurso.instancia().eliminarCurso(codigo);
    } 
}
