package Modelo;

import Logica.Estudiante;
import AccesoDatos.ServicioEstudiante;
import java.util.ArrayList;


public class ModelEstudiante {
    private static ModelEstudiante instancia;
    private ServicioEstudiante estudiante;

    private ModelEstudiante() {
        this.estudiante = new ServicioEstudiante();
    }
    
    public static ModelEstudiante instancia(){
        if (instancia == null){
            instancia = new ModelEstudiante();
        }
        return instancia;
    }
    
    public void agregarEstudiante(Estudiante e) throws Exception{
        this.estudiante.insertarEstudiante(e);
    }
    
    public void modificarEstudiante(Estudiante e) throws Exception{
        this.estudiante.modificarEstudiante(e);
    }
    
    public void eliminarEstudiante(int cedula) throws Exception{
        this.estudiante.eliminarEstudiante(cedula);
    }
    
    public Estudiante buscarEstudiante(int cedula) throws Exception{
        Estudiante estudiante = this.estudiante.buscarEstudiante(cedula);
        return estudiante;
    }
    
    public ArrayList<Estudiante> obtenerEstudiantes() throws Exception{
        ArrayList<Estudiante> estudiantes = (ArrayList<Estudiante>)this.estudiante.listarEstudiante();
        return estudiantes;
    }
}
