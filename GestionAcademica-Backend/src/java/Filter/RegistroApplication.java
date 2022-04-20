
package Filter;

import Presentacion.Usuarios;
import Presentacion.Profesores;
import Presentacion.Matriculas;
import Presentacion.Grupos;
import Presentacion.Cursos;
import Presentacion.Ciclos;
import Presentacion.Carreras;
import Presentacion.Estudiantes;
import Presentacion.Sesiones;
import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import org.glassfish.jersey.media.multipart.MultiPartFeature;

@ApplicationPath("api")
public class RegistroApplication extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        HashSet<Class<?>> classes = new HashSet<>();
        classes.add(MultiPartFeature.class);
        classes.add(Usuarios.class);
        classes.add(Carreras.class);
	classes.add(Cursos.class);
	classes.add(Grupos.class);
	classes.add(Profesores.class);
	classes.add(Estudiantes.class);
	classes.add(Ciclos.class);
	classes.add(Matriculas.class);
        classes.add(Sesiones.class);
        classes.add(RestfulFilter.class);
        return classes;
    }   
}