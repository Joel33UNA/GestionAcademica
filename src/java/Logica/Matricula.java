
package Logica;

import java.util.Objects;


public class Matricula {
    private int codigo;
    private int nota;
    private Estudiante estudiante;
    private Grupo grupo;

    public Matricula(int codigo, Estudiante estudiante, Grupo grupo, int nota) {
        this.codigo = codigo;
        this.nota = nota;
        this.estudiante = estudiante;
        this.grupo = grupo;
    }

    public Matricula() {
        this.codigo = 0;
        this.nota = 0;
        this.estudiante = new Estudiante();
        this.grupo = new Grupo();
    }

    public Matricula(Estudiante est) {
        this.codigo = 0;
        this.nota = 0;
        this.estudiante = est;
        this.grupo = new Grupo();
    }

    public Integer getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public Integer getNota() {
        return nota;
    }

    public void setNota(int nota) {
        this.nota = nota;
    }

    public Estudiante getEstudiante() {
        return estudiante;
    }

    public void setEstudiante(Estudiante estudiante) {
        this.estudiante = estudiante;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

    @Override
    public int hashCode() {
        int hash = 5;
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
        final Matricula other = (Matricula) obj;
        if (this.codigo != other.codigo) {
            return false;
        }
        if (this.nota != other.nota) {
            return false;
        }
        if (!Objects.equals(this.estudiante, other.estudiante)) {
            return false;
        }
        if (!Objects.equals(this.grupo, other.grupo)) {
            return false;
        }
        return true;
    }
}
