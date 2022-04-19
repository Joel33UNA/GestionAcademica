
package Modelo;

import Logica.Curso;
import AccesoDatos.ServicioCurso;
import java.util.ArrayList;

public class ModelCurso {
    private static ModelCurso instancia;
    private final ServicioCurso curso;

    private ModelCurso() {
        this.curso = new ServicioCurso();
    }
    
    public static ModelCurso instancia(){
        if (instancia == null){
            instancia = new ModelCurso();
        }
        return instancia;
    }
    
    public void agregarCurso(Curso c) throws Exception{
        this.curso.insertarCurso(c);
    }
    
    public void modificarCurso(Curso c) throws Exception{
        this.curso.modificarCurso(c);
    }
    
    public void eliminarCurso(int codigo) throws Exception{
        this.curso.eliminarCurso(codigo);
    }
    
    public Curso buscarCurso(int codigo) throws Exception{
        Curso curso = this.curso.buscarCurso(codigo);
        return curso;
    }
    
    public Curso buscarCursoNom(String nombre) throws Exception{
        Curso curso = this.curso.buscarCursoNom(nombre);
        return curso;
    }
    
    public ArrayList<Curso> obtenerCursos() throws Exception{
        ArrayList<Curso> cursos = (ArrayList<Curso>)this.curso.listarCurso();
        return cursos;
    }
}
