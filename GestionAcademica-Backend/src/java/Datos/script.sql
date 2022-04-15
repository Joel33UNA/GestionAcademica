host cls

-- Drops
drop sequence sec_pk_carrera;
drop sequence sec_pk_curso;
drop sequence sec_pk_ciclo;
drop sequence sec_pk_grupo;
drop sequence sec_pk_matricula;

drop table administrador;
drop table matriculador;
drop table matricula;
drop table grupo;
drop table curso;
drop table profesor;
drop table estudiante;
drop table carrera;
drop table usuario;
drop table ciclo;

-- Secuencias
create sequence sec_pk_carrera start with 1;
create sequence sec_pk_curso start with 1;
create sequence sec_pk_ciclo start with 1;
create sequence sec_pk_grupo start with 1;
create sequence sec_pk_matricula start with 1;

-- Tablas
create table carrera(
                        codigo int,
                        nombre varchar(20),
                        titulo varchar(20),
                        constraints carrera_pk primary key (codigo)
);
create table curso(
                      codigo int,
                      nombre varchar(20),
                      creditos int,
                      horas_semanales int,
                      codigo_carrera int,
                      constraints curso_pk primary key (codigo),
                      constraints curso_fk_carrera foreign key (codigo_carrera) references carrera
);
create table profesor(
                         cedula int,
                         nombre varchar(20),
                         telefono number,
                         email varchar(20),
                         constraints profesor_pk primary key (cedula)
);
create table estudiante(
                           cedula int,
                           nombre varchar(20),
                           telefono number,
                           email varchar(20),
                           fecha_de_nacimiento date,
                           codigo_carrera int,
                           constraints estudiante_pk primary key (cedula),
                           constraints estudiante_fk_carrera foreign key (codigo_carrera) references carrera
);
CREATE TABLE ciclo(
                      codigo int,
                      anio int,
                      numero_ciclo int,
                      fecha_inicio date,
                      fecha_fin date,
                      CONSTRAINTS ciclo_pk PRIMARY KEY (codigo)
);
CREATE TABLE grupo(
                      codigo int,
                      horario varchar(20),
                      codigo_ciclo int,
                      codigo_curso int,
                      cedula_profesor int,
                      CONSTRAINTS grupo_pk PRIMARY KEY (codigo),
                      CONSTRAINTS grupo_fk_ciclo FOREIGN KEY (codigo_ciclo) references ciclo,
                      constraints grupo_fk_curso foreign key (codigo_curso) references curso,
                      CONSTRAINTS grupo_fk_profesor FOREIGN KEY (cedula_profesor) references profesor
);
create table usuario(
                        cedula int,
                        clave varchar(20),
                        rol varchar(20),
                        CONSTRAINTS usuario_pk PRIMARY KEY (cedula)
);

create table administrador(
                              cedula int,
                              CONSTRAINTS administrador_pk primary key (cedula),
                              CONSTRAINTS administrador_fk_usuario foreign key (cedula) references usuario
);

create table matriculador(
                             cedula int,
                             CONSTRAINTS matriculador_pk primary key (cedula),
                             CONSTRAINTS matriculador_fk_usuario foreign key (cedula) references usuario
);
alter table usuario add constraint usuario_ck_rol check (rol in ('administrador','matriculador','profesor','estudiante'));

create table matricula(
                          codigo_matricula int,
                          cedula_estudiante int,
                          codigo_grupo int,
                          nota int,
                          CONSTRAINTS matricula_pk primary key (codigo_matricula),
                          CONSTRAINTS matricula_fk_estudiante foreign key (cedula_estudiante) references estudiante,
                          CONSTRAINTS matricula_fk_grupo foreign key (codigo_grupo) references grupo
);



-- Procedimientos y funciones
CREATE OR REPLACE PACKAGE types
AS
     TYPE ref_cursor IS REF CURSOR;
END;
/
show error

create or replace procedure insertarCarrera(nom IN carrera.nombre%TYPE, tit IN carrera.titulo%TYPE)
as
begin
insert into carrera values (sec_pk_carrera.nextval, nom, tit);
end;
/
show error

create or replace procedure modificarCarrera(cod IN carrera.codigo%TYPE, nom IN carrera.nombre%TYPE, tit IN carrera.titulo%TYPE)
as
begin
update carrera set nombre = nom, titulo = tit where cod=codigo;
end;
/
show error

create or replace function buscarCarrera(cod IN carrera.codigo%TYPE)
return Types.ref_cursor
as
        carrera_cursor types.ref_cursor;
begin
open carrera_cursor for
select codigo, nombre, titulo from carrera where codigo=cod;
return carrera_cursor;
end;
/
show error

create or replace function listarCarrera
return Types.ref_cursor
as
        carrera_cursor types.ref_cursor;
begin
open carrera_cursor FOR
select codigo, nombre, titulo from carrera;
return carrera_cursor;
end;
/
show error

create or replace procedure eliminarCarrera(cod IN carrera.codigo%TYPE)
as
begin
delete from carrera where codigo=cod;
end;
/
show error

create or replace procedure insertarCurso(nom IN curso.nombre%TYPE, cre IN curso.creditos%TYPE,
hor in curso.horas_semanales%TYPE, car in curso.codigo_carrera%TYPE)
as
begin
insert into curso values (sec_pk_curso.nextval, nom, cre, hor, car);
end;
/
show error

create or replace procedure modificarCurso(cod IN curso.codigo%TYPE, nom IN curso.nombre%TYPE, cre IN curso.creditos%TYPE,
hor in curso.horas_semanales%TYPE, car in curso.codigo_carrera%TYPE)
as
begin
update curso set nombre = nom, creditos = cre, horas_semanales=hor, codigo_carrera=car where cod=codigo;
end;
/
show error

create or replace function buscarCurso(cod IN curso.codigo%TYPE)
return Types.ref_cursor
as
        curso_cursor types.ref_cursor;
begin
open curso_cursor for
select codigo, nombre, creditos, horas_semanales, codigo_carrera from curso where codigo=cod;
return curso_cursor;
end;
/
show error

create or replace function listarCurso
return Types.ref_cursor
as
    curso_cursor types.ref_cursor;
begin
open curso_cursor FOR
select codigo, nombre, creditos, horas_semanales, codigo_carrera from curso;
return curso_cursor;
end;
/
show error

create or replace procedure eliminarCurso(cod IN curso.codigo%TYPE)
as
begin
delete from curso where codigo=cod;
end;
/
show error

CREATE OR REPLACE PROCEDURE insertarProfesor(id IN profesor.cedula%TYPE, nom IN profesor.nombre%TYPE, tel IN profesor.telefono%TYPE, em IN profesor.email%TYPE)
AS
BEGIN
INSERT INTO profesor VALUES(id,nom,tel,em);
END;
/
show error

CREATE OR REPLACE PROCEDURE modificarProfesor(i IN profesor.cedula%TYPE, nom IN profesor.nombre%TYPE, tel IN profesor.telefono%TYPE, em IN profesor.email%TYPE)
AS
BEGIN
UPDATE profesor SET nombre = nom, telefono = tel, email = em WHERE i=cedula;
END;
/
show error

CREATE OR REPLACE FUNCTION buscarProfesor(idbuscar IN profesor.cedula%TYPE)
RETURN Types.ref_cursor
AS
        profesor_cursor types.ref_cursor;
BEGIN
OPEN profesor_cursor FOR
SELECT cedula, nombre, telefono, email FROM profesor WHERE cedula=idbuscar;
RETURN profesor_cursor;
END;
/
show error

CREATE OR REPLACE FUNCTION listarProfesor
RETURN Types.ref_cursor
AS
        profesor_cursor types.ref_cursor;
BEGIN
OPEN profesor_cursor FOR
SELECT cedula, nombre, telefono, email FROM profesor;
RETURN profesor_cursor;
END;
/
show error

create or replace procedure eliminarProfesor(id IN profesor.cedula%TYPE)
as
begin
delete from profesor where id=cedula;
end;
/
show error

CREATE OR REPLACE PROCEDURE insertarEstudiante(id IN estudiante.cedula%TYPE, nom IN estudiante.nombre%TYPE, tel IN estudiante.telefono%TYPE, em IN estudiante.email%TYPE, fecha_nac in estudiante.fecha_de_nacimiento%TYPE, cod_car in estudiante.codigo_carrera%TYPE)
AS
BEGIN
INSERT INTO estudiante VALUES(id,nom,tel,em,fecha_nac,cod_car);
END;
/
show error

CREATE OR REPLACE PROCEDURE modificarEstudiante(i IN estudiante.cedula%TYPE, nom IN estudiante.nombre%TYPE, tel IN estudiante.telefono%TYPE, em IN estudiante.email%TYPE, fecha_nac in estudiante.fecha_de_nacimiento%TYPE, cod_car in estudiante.codigo_carrera%TYPE)
AS
BEGIN
UPDATE estudiante SET nombre = nom, telefono = tel, email = em, fecha_de_nacimiento = fecha_nac, codigo_carrera = cod_car WHERE i=cedula;
END;
/
show error

CREATE OR REPLACE FUNCTION buscarEstudiante(idbuscar IN estudiante.cedula%TYPE)
RETURN Types.ref_cursor
AS
        estudiante_cursor types.ref_cursor;
BEGIN
OPEN estudiante_cursor FOR
SELECT cedula, nombre, telefono, email, fecha_de_nacimiento, codigo_carrera FROM estudiante WHERE cedula=idbuscar;
RETURN estudiante_cursor;
END;
/
show error

CREATE OR REPLACE FUNCTION listarEstudiante
RETURN Types.ref_cursor
AS
        estudiante_cursor types.ref_cursor;
BEGIN
OPEN estudiante_cursor FOR
SELECT cedula, nombre, telefono, email, fecha_de_nacimiento, codigo_carrera FROM estudiante;
RETURN estudiante_cursor;
END;
/
show error

create or replace procedure eliminarEstudiante(id IN estudiante.cedula%TYPE)
as
begin
delete from estudiante where id=cedula;
end;
/
show error

CREATE OR REPLACE PROCEDURE insertarCiclo(a IN ciclo.anio%TYPE, numero IN ciclo.numero_ciclo%TYPE, feIni IN ciclo.fecha_inicio%TYPE, feFin IN ciclo.fecha_fin%TYPE)
AS
BEGIN
INSERT INTO ciclo VALUES(sec_pk_ciclo.NEXTVAL,a,numero,feIni,feFin);
END;
/
show error

CREATE OR REPLACE PROCEDURE modificarCiclo (id IN ciclo.codigo%TYPE, an IN ciclo.anio%TYPE, numero IN ciclo.numero_ciclo%TYPE,feIni IN ciclo.fecha_inicio%TYPE,feFin IN ciclo.fecha_fin%TYPE)
AS
BEGIN
UPDATE ciclo SET numero_ciclo=numero,anio=an,fecha_inicio=feIni,fecha_fin=feFin WHERE codigo=id;
END;
/
show error

CREATE OR REPLACE FUNCTION buscarCiclo(idbuscar IN ciclo.codigo%TYPE)
RETURN Types.ref_cursor
AS
    ciclo_cursor types.ref_cursor;
BEGIN
OPEN ciclo_cursor FOR
SELECT codigo, anio, numero_ciclo, fecha_inicio, fecha_fin FROM ciclo WHERE codigo=idbuscar;
RETURN ciclo_cursor;
END;
/
show error

CREATE OR REPLACE FUNCTION listarCiclo
RETURN Types.ref_cursor
AS
    ciclo_cursor types.ref_cursor;
BEGIN
OPEN ciclo_cursor FOR
SELECT codigo, anio, numero_ciclo, fecha_inicio, fecha_fin FROM ciclo;
RETURN ciclo_cursor;
END;
/
show error

create or replace procedure eliminarCiclo(idC IN ciclo.codigo%TYPE)
as
begin
delete from ciclo where idC=codigo;
end;
/
show error

CREATE OR REPLACE PACKAGE types
AS
     TYPE ref_cursor IS REF CURSOR;
END;
/
show error

CREATE OR REPLACE PROCEDURE insertarGrupo(hora IN grupo.horario%TYPE, cic IN grupo.codigo_ciclo%TYPE, cur IN grupo.codigo_curso%TYPE, prof IN grupo.cedula_profesor%TYPE)
AS
BEGIN
INSERT INTO grupo VALUES(sec_pk_grupo.NEXTVAL,hora,cic,cur,prof);
END;
/
show error

CREATE OR REPLACE PROCEDURE modificarGrupo(id in grupo.codigo%TYPE, hora IN grupo.horario%TYPE, cic IN grupo.codigo_ciclo%TYPE, cur IN grupo.codigo_curso%TYPE, prof IN grupo.cedula_profesor%TYPE)
AS
BEGIN
UPDATE grupo SET horario=hora, codigo_ciclo=cic, codigo_curso=cur, cedula_profesor=prof WHERE codigo=id;
END;
/
show error

CREATE OR REPLACE FUNCTION buscarGrupo(idbuscar IN grupo.codigo%TYPE)
RETURN Types.ref_cursor
AS
        grupo_cursor types.ref_cursor;
BEGIN
OPEN grupo_cursor FOR
SELECT codigo, horario, codigo_ciclo, codigo_curso, cedula_profesor FROM grupo WHERE codigo=idbuscar;
RETURN grupo_cursor;
END;
/
show error

CREATE OR REPLACE FUNCTION listarGrupo
RETURN Types.ref_cursor
AS
    grupo_cursor types.ref_cursor;
BEGIN
OPEN grupo_cursor FOR
SELECT codigo, horario, codigo_ciclo, codigo_curso, cedula_profesor FROM grupo;
RETURN grupo_cursor;
END;
/
show error

create or replace procedure eliminarGrupo(idG IN grupo.codigo%TYPE)
as
begin
delete from grupo where idG=codigo;
end;
/
show error

CREATE OR REPLACE PROCEDURE insertarUsuario(id IN usuario.cedula%TYPE, pass IN usuario.clave%TYPE, r IN usuario.rol%TYPE)
AS
BEGIN
INSERT INTO usuario VALUES(id,pass,r);
END;
/
show error

CREATE OR REPLACE PROCEDURE modificarUsuario(i IN usuario.cedula%TYPE, pass IN usuario.clave%TYPE, r IN usuario.rol%TYPE)
AS
BEGIN
UPDATE usuario SET clave = pass, rol = r WHERE i=cedula;
END;
/
show error

CREATE OR REPLACE FUNCTION buscarUsuario(idbuscar IN usuario.cedula%TYPE)
RETURN Types.ref_cursor
AS
        usuario_cursor types.ref_cursor;
BEGIN
OPEN usuario_cursor FOR
SELECT cedula, clave, rol FROM usuario WHERE cedula=idbuscar;
RETURN usuario_cursor;
END;
/
show error

CREATE OR REPLACE FUNCTION listarUsuario
RETURN Types.ref_cursor
AS
        usuario_cursor types.ref_cursor;
BEGIN
OPEN usuario_cursor FOR
SELECT cedula, clave, rol FROM usuario;
RETURN usuario_cursor;
END;
/
show error

create or replace procedure eliminarUsuario(idU IN usuario.cedula%TYPE)
as
begin
delete from usuario where idU=cedula;
end;
/
show error

CREATE OR REPLACE PROCEDURE insertarMatricula(est IN matricula.cedula_estudiante%TYPE, gru IN matricula.codigo_grupo%TYPE, n IN matricula.nota%TYPE)
AS
BEGIN
INSERT INTO matricula VALUES(sec_pk_matricula.nextval,est,gru,n);
END;
/
show error

CREATE OR REPLACE PROCEDURE modificarMatricula(id IN matricula.codigo_matricula%TYPE, est IN matricula.cedula_estudiante%TYPE, gru IN matricula.codigo_grupo%TYPE, n IN matricula.nota%TYPE)
AS
BEGIN
UPDATE matricula SET cedula_estudiante = est, codigo_grupo = gru, nota = n WHERE id=codigo_matricula;
END;
/
show error

CREATE OR REPLACE FUNCTION buscarMatricula(idbuscar IN matricula.codigo_matricula%TYPE)
RETURN Types.ref_cursor
AS
        matricula_cursor types.ref_cursor;
BEGIN
OPEN matricula_cursor FOR
SELECT codigo_matricula, cedula_estudiante, codigo_grupo, nota FROM matricula WHERE codigo_matricula=idbuscar;
RETURN matricula_cursor;
END;
/
show error

CREATE OR REPLACE FUNCTION listarMatricula
RETURN Types.ref_cursor
AS
        matricula_cursor types.ref_cursor;
BEGIN
OPEN matricula_cursor FOR
SELECT codigo_matricula, cedula_estudiante, codigo_grupo, nota FROM matricula;
RETURN matricula_cursor;
END;
/
show error

create or replace procedure eliminarMatricula(id IN matricula.codigo_matricula%TYPE)
as
begin
delete from matricula where id=codigo_matricula;
end;
/
show error

-- Login

CREATE OR REPLACE FUNCTION login(idin IN int, pass IN varchar)
RETURN Types.ref_cursor 
AS 
        n_cursor types.ref_cursor; 
BEGIN 
  OPEN n_cursor FOR 
	  SELECT COUNT(cedula) AS esta FROM usuario WHERE cedula=idin AND clave=pass;
	 RETURN n_cursor; 
END;
/
show error


insert into usuario values (111, '111', 'administrador');
insert into administrador values (111);
commit;