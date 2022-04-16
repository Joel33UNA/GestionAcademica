package LogicaNegocio;

import Logica.Profesor;
import AccesoDatos.ServicioProfesor;
import java.util.ArrayList;


public class ModelProfesor {
    private static ModelProfesor instancia;
    private ServicioProfesor profesor;

    private ModelProfesor() {
        this.profesor = new ServicioProfesor();
    }
    
    public static ModelProfesor instancia(){
        if (instancia == null){
            instancia = new ModelProfesor();
        }
        return instancia;
    }
    
    public void agregarProfesor(Profesor p) throws Exception{
        this.profesor.insertarProfesor(p);
    }
    
    public void modificarProfesor(Profesor p) throws Exception{
        this.profesor.ModificarProfesor(p);
    }
    
    public void eliminarProfesor(int cedula) throws Exception{
        this.profesor.eliminarProfesor(cedula);
    }
    
    public Profesor buscarProfesor(int cedula) throws Exception{
        Profesor profesor = this.profesor.buscarProfesor(cedula);
        return profesor;
    }
    
    public ArrayList<Profesor> obtenerProfesores() throws Exception{
        ArrayList<Profesor> profesores = (ArrayList<Profesor>)this.profesor.listarProfesor();
        return profesores;
    }
}
