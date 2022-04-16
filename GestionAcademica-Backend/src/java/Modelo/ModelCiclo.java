package Modelo;

import Logica.Ciclo;
import AccesoDatos.ServicioCiclo;
import java.util.ArrayList;


public class ModelCiclo {
    private static ModelCiclo instancia;
    private final ServicioCiclo ciclo;

    private ModelCiclo() {
        this.ciclo = new ServicioCiclo();
    }
    
    public static ModelCiclo instancia(){
        if (instancia == null){
            instancia = new ModelCiclo();
        }
        return instancia;
    }
    
    public void agregarCiclo(Ciclo c) throws Exception{
        this.ciclo.insertarCiclo(c);
    }
    
    public void modificarCiclo(Ciclo c) throws Exception{
        this.ciclo.modificarCiclo(c);
    }
    
    public void eliminarCiclo(int codigo) throws Exception{
        this.ciclo.eliminarCiclo(codigo);
    }
    
    public Ciclo buscarCiclo(int codigo) throws Exception{
        Ciclo ciclo = this.ciclo.buscarCiclo(codigo);
        return ciclo;
    }
    
    public ArrayList<Ciclo> obtenerCiclos() throws Exception{
        ArrayList<Ciclo> ciclos = (ArrayList<Ciclo>)this.ciclo.listarCiclo();
        return ciclos;
    }
}
