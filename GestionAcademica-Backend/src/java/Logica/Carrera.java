
package Logica;

import java.util.Objects;

public class Carrera {
    private int codigo;
    private String nombre;
    private String titulo;

    public Carrera(int codigo, String nombre, String titulo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.titulo = titulo;
    }

    public Carrera() {
        this.codigo = 0;
        this.nombre = "";
        this.titulo = "";
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
