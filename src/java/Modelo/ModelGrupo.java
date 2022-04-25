
package Modelo;

import Logica.Grupo;
import AccesoDatos.ServicioGrupo;
import java.util.ArrayList;


public class ModelGrupo {
    private static ModelGrupo instancia;
    private ServicioGrupo grupo;

    private ModelGrupo() {
        this.grupo = new ServicioGrupo();
    }
    
    public static ModelGrupo instancia(){
        if (instancia == null){
            instancia = new ModelGrupo();
        }
        return instancia;
    }
    
    public void agregarGrupo(Grupo g) throws Exception{
        this.grupo.insertarGrupo(g);
    }
    
    public void modificarGrupo(Grupo g) throws Exception{
        this.grupo.modificarGrupo(g);
    }
    
    public void eliminarGrupo(int codigo) throws Exception{
        this.grupo.eliminarGrupo(codigo);
    }
    
    public Grupo buscarGrupo(int codigo) throws Exception{
        Grupo grupo = this.grupo.buscarGrupo(codigo);
        return grupo;
    }
    
    public ArrayList<Grupo> obtenerGrupos() throws Exception{
        ArrayList<Grupo> grupos = (ArrayList<Grupo>)this.grupo.listarGrupo();
        return grupos;
    }
    
    public ArrayList<Grupo> buscarGrupoCiclo(int codCarrera, int codCiclo) throws Exception{
        ArrayList<Grupo> grupos = (ArrayList<Grupo>)this.grupo.buscarGrupoCiclo(codCarrera, codCiclo);
        return grupos;
    }
}
