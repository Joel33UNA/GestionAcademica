package Modelo;

import Logica.Carrera;
import AccesoDatos.ServicioCarrera;
import java.util.ArrayList;


public class ModelCarrera {
    private static ModelCarrera instancia;
    private final ServicioCarrera carrera;

    private ModelCarrera() {
        this.carrera = new ServicioCarrera();
    }
    
    public static ModelCarrera instancia(){
        if (instancia == null){
            instancia = new ModelCarrera();
        }
        return instancia;
    }
    
    public void agregarCarrera(Carrera c) throws Exception{
        this.carrera.insertarCarrera(c);
    }
    
    public void modificarCarrera(Carrera c) throws Exception{
        this.carrera.modificarCarrera(c);
    }
    
    public void eliminarCarrera(int codigo) throws Exception{
        this.carrera.eliminarCarrera(codigo);
    }
    
    public Carrera buscarCarrera(int codigo) throws Exception{
        Carrera carrera = this.carrera.buscarCarrera(codigo);
        return carrera;
    }
    
    public Carrera buscarCarreraNom(String nombre) throws Exception{
        Carrera carrera = this.carrera.buscarCarreraNom(nombre);
        return carrera;
    }
    
    public ArrayList<Carrera> obtenerCarreras() throws Exception{
        ArrayList<Carrera> carreras = (ArrayList<Carrera>)this.carrera.listarCarrera();
        return carreras;
    }
}
