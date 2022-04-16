package Modelo;

import Logica.Matricula;
import AccesoDatos.ServicioMatricula;
import java.util.ArrayList;


public class ModelMatricula {
    private static ModelMatricula instancia;
    private ServicioMatricula matricula;

    private ModelMatricula() {
        this.matricula = new ServicioMatricula();
    }
    
    public static ModelMatricula instancia(){
        if (instancia == null){
            instancia = new ModelMatricula();
        }
        return instancia;
    }
    
    public void agregarMatricula(Matricula m) throws Exception{
        this.matricula.insertarMatricula(m);
    }
    
    public void modificarMatricula(Matricula m) throws Exception{
        this.matricula.modificarMatricula(m);
    }
    
    public void eliminarMatricula(int codigo) throws Exception{
        this.matricula.eliminarMatricula(codigo);
    }
    
    public Matricula buscarMatricula(int codigo) throws Exception{
        Matricula matricula = this.matricula.buscarMatricula(codigo);
        return matricula;
    }
    
    public ArrayList<Matricula> obtenerMatriculas() throws Exception{
        ArrayList<Matricula> matriculas = (ArrayList<Matricula>)this.matricula.listarMatricula();
        return matriculas;
    }
}
