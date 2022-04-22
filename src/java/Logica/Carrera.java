
package Logica;

import java.util.ArrayList;

public class Carrera {
    private int codigo;
    private String nombre;
    private String titulo;
    private ArrayList<Curso> cursos;

    public Carrera(int codigo, String nombre, String titulo, ArrayList<Curso> cursos) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.titulo = titulo;
        this.cursos = cursos;
    }

    public Carrera() {
        this.codigo = 0;
        this.nombre = "";
        this.titulo = "";
        this.cursos = new ArrayList<>();
    }

    public Carrera(int codigo) {
        this.codigo = codigo;
        this.nombre = "";
        this.titulo = "";
    }

    public Integer getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
    public ArrayList<Curso> getCursos(){
        return this.cursos;
    }
    
    public void setCursos(ArrayList<Curso> cursos) {
        this.cursos = cursos;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this.codigo != codigo) {
            return false;
        }
        return true;
    }
}
