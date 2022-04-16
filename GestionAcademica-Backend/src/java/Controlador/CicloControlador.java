
package Controlador;

import Logica.Ciclo;
import Modelo.ModelCiclo;
import java.util.ArrayList;

public class CicloControlador {
    public ArrayList<Ciclo> obtenerCiclos() throws Exception{
        return ModelCiclo.instancia().obtenerCiclos();
    }
    
    public Ciclo buscarCiclo(int codigo) throws Exception{
        return ModelCiclo.instancia().buscarCiclo(codigo);
    }
    
    public void agregarCiclo(Ciclo c) throws Exception{
        ModelCiclo.instancia().agregarCiclo(c);
    }
    
    public void modificarCiclo(Ciclo u) throws Exception{
        ModelCiclo.instancia().modificarCiclo(u);
    }
    
    public void eliminarCiclo(int codigo) throws Exception{
        ModelCiclo.instancia().eliminarCiclo(codigo);
    } 
}
