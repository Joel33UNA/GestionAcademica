
package Logica;

import Logica.Curso;
import Logica.Ciclo;
import java.util.Objects;


public class Grupo {
    private int codigo;
    private String horario;
    private Curso curso;
    private Ciclo ciclo;
    private Profesor profesor;

    public Grupo(int codigo, String horario, Curso curso, Ciclo ciclo, Profesor profesor){
        this.codigo = codigo;
        this.horario = horario;
        this.curso = curso;
        this.ciclo = ciclo;
        this.profesor = profesor;
    }

    public Grupo(){
        this.codigo = 0;
        this.horario = "";
        this.curso = new Curso();
        this.ciclo = new Ciclo();
        this.profesor = new Profesor();
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public Ciclo getCiclo() {
        return ciclo;
    }

    public void setCiclo(Ciclo ciclo) {
        this.ciclo = ciclo;
    }

    public Profesor getProfesor() {
        return profesor;
    }

    public void setProfesor(Profesor profesor) {
        this.profesor = profesor;
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
        final Grupo other = (Grupo) obj;
        if (this.codigo != other.codigo) {
            return false;
        }
        if (!Objects.equals(this.horario, other.horario)) {
            return false;
        }
        if (!Objects.equals(this.curso, other.curso)) {
            return false;
        }
        if (!Objects.equals(this.ciclo, other.ciclo)) {
            return false;
        }
        if (!Objects.equals(this.profesor, other.profesor)) {
            return false;
        }
        return true;
    }
}
