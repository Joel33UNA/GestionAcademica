
package Controlador;

import Logica.Grupo;
import Modelo.ModelGrupo;
import java.util.ArrayList;

public class GrupoControlador {
    public ArrayList<Grupo> obtenerGrupos() throws Exception{
        return ModelGrupo.instancia().obtenerGrupos();
    }
    
    public Grupo buscarGrupo(int codigo) throws Exception{
        return ModelGrupo.instancia().buscarGrupo(codigo);
    }
    
    public void agregarGrupo(Grupo c) throws Exception{
        ModelGrupo.instancia().agregarGrupo(c);
    }
    
    public void modificarGrupo(Grupo u) throws Exception{
        ModelGrupo.instancia().modificarGrupo(u);
    }
    
    public void eliminarGrupo(int codigo) throws Exception{
        ModelGrupo.instancia().eliminarGrupo(codigo);
    } 
}
