package LogicaNegocio;

import Logica.Carrera;
import AccesoDatos.ServicioCarrera;
import java.util.ArrayList;
import java.util.Observable;
import java.util.Observer;
import java.util.Collection;

public class ModelCarrera extends Observable {
    private Carrera carrera;
    private ServicioCarrera servicioCarrera;

    public ModelCarrera(){
        carrera = new Carrera();
        servicioCarrera = new ServicioCarrera();
    }

    public Carrera getCarrera() {
        return carrera;
    }

    public void setCarrera(Carrera carrera){
        this.carrera = carrera;
    }

    public void addObserver(Observer o){
        super.addObserver(o);
        setChanged();
        notifyObservers(null);
    }

    public void insertarCarrera(Carrera c) throws Exception{
        servicioCarrera.insertarCarrera(c);
        this.setChanged();
        this.notifyObservers(null);
    }

    public void modificar(Carrera c) throws Exception{
        servicioCarrera.modificarCarrera(c);
        this.setChanged();
        this.notifyObservers(null);
    }

    public void eliminar(int codigo) throws Exception{
        servicioCarrera.eliminarCarrera(codigo);
        this.setChanged();
        this.notifyObservers(null);
    }

    public Carrera buscar(int codigo) throws Exception{
        this.setChanged();
        this.notifyObservers(null);
        return servicioCarrera.buscarCarrera(codigo);
    }

    public Collection listar() throws Exception{
        this.setChanged();
        this.notifyObservers(null);
        return servicioCarrera.listarCarrera();
    }
}
