
package Logica;

import java.util.List;
import java.util.ArrayList;
import java.util.Objects;

public class Curso {
    private int codigo;
    private String nombre;
    private int creditos;
    private int horasSemanales;
    private Carrera carrera;

    public Curso(int codigo, String nombre, int creditos, int horasSemanales, Carrera carrera) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.creditos = creditos;
        this.horasSemanales = horasSemanales;
        this.carrera = carrera;
    }

    public Curso() {
        this.codigo = 0;
        this.nombre = "";
        this.creditos = 0;
        this.horasSemanales = 0;
        this.carrera = new Carrera();
    }

    public Curso(int codigo){
        this.codigo = codigo;
        this.nombre = "";
        this.creditos = 0;
        this.horasSemanales = 0;
        this.carrera = new Carrera();
    }

    public Integer getCreditos() {
        return creditos;
    }

    public void setCreditos(int creditos) {
        this.creditos = creditos;
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

    public Carrera getCarrera() {
        return carrera;
    }

    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
    }

    public Integer getHorasSemanales() {
        return horasSemanales;
    }

    public void setHorasSemanales(int horasSemanales) {
        this.horasSemanales = horasSemanales;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Curso other = (Curso) obj;
        if (this.codigo != other.codigo) {
            return false;
        }
        if (!Objects.equals(this.nombre, other.nombre)) {
            return false;
        }
        if (!Objects.equals(this.creditos, other.creditos)) {
            return false;
        }
        if (!Objects.equals(this.horasSemanales, other.horasSemanales)) {
            return false;
        }
        if (!Objects.equals(this.carrera, other.carrera)) {
            return false;
        }
        return true;
    }


}
