
package Controlador;

import Logica.Carrera;
import Modelo.ModelCarrera;
import java.util.ArrayList;

public class CarreraControlador {
    public ArrayList<Carrera> obtenerCarreras() throws Exception{
        return ModelCarrera.instancia().obtenerCarreras();
    }
    
    public Carrera buscarCarrera(int codigo) throws Exception{
        return ModelCarrera.instancia().buscarCarrera(codigo);
    }
    
    public void agregarCarrera(Carrera c) throws Exception{
        ModelCarrera.instancia().agregarCarrera(c);
    }
    
    public void modificarCarrera(Carrera u) throws Exception{
        ModelCarrera.instancia().modificarCarrera(u);
    }
    
    public void eliminarCarrera(int codigo) throws Exception{
        ModelCarrera.instancia().eliminarCarrera(codigo);
    }
}
