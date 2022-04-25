package Logica;

import java.sql.Date;

public class Estudiante extends Usuario {
    private String nombre;
    private int telefono;
    private String email;
    private Date fechaNacimiento;
    private Carrera carrera;

    public Estudiante(int cedula, String clave, String rol, String nombre, int telefono, String email, Date fechaNacimiento, Carrera carrera) {
        super(cedula,clave,rol);
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.carrera = carrera;
    }

    public Estudiante() {
        super();
        this.nombre = "";
        this.telefono = 0;
        this.email = "";
        this.fechaNacimiento = new Date(0,0,0);
        this.carrera = new Carrera();
    }

    public int getCedula() {
        return cedula;
    }

    public void setCedula(int cedula) {
        this.cedula = cedula;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getTelefono() {
        return telefono;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Carrera getCarrera() {
        return carrera;
    }

    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
<<<<<<< HEAD
    }  
=======
    } 
>>>>>>> 583f02babe16923726625823588272ec30db26a3
}

