
package Logica;

import java.sql.Date;

public class Ciclo {
    private int codigo;
    private int anio;
    private int numeroCiclo;
    private Date fechaInicio;
    private Date fechaFin;

    public Ciclo(int codigo, int anio, int numeroCiclo, Date fechaInicio, Date fechaFin) {
        this.codigo = codigo;
        this.anio = anio;
        this.numeroCiclo = numeroCiclo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    public Ciclo() {
        this.codigo = 0;
        this.anio = 0;
        this.numeroCiclo = 0;
        this.fechaInicio = new Date(0, 0, 0);
        this.fechaFin = new Date(0, 0, 0);
    }

    public Integer getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public Integer getAnio() {
        return anio;
    }

    public void setAnio(int anio) {
        this.anio = anio;
    }

    public Integer getNumeroCiclo() {
        return numeroCiclo;
    }

    public void setNumeroCiclo(int numeroCiclo) {
        this.numeroCiclo = numeroCiclo;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
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
