
package Logica;

import java.io.Serializable;
import java.util.Objects;

public class Usuario implements Serializable {
    protected int cedula;
    protected String clave;
    protected String rol;

    public Usuario(int cedula, String clave, String rol){
        this.cedula = cedula;
        this.rol = rol;
        this.clave = clave;
    }

    public Usuario(){
        this.cedula = 0;
        this.rol = "";
        this.clave = "";
    }

    public Usuario(int cedula){
        this.cedula = cedula;
        this.rol = "";
        this.clave = "";
    }

    public void setCedula(int cedula) {
        this.cedula = cedula;
    }

    public int getCedula() {
        return cedula;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
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
        final Usuario other = (Usuario) obj;
        if (!Objects.equals(this.cedula, other.cedula)) {
            return false;
        }
        if (!Objects.equals(this.rol, other.rol)) {
            return false;
        }
        if (!Objects.equals(this.clave, other.clave)) {
            return false;
        }
        return true;
    }


}
