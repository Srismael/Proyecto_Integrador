from . import db

class RolUsuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rol = db.Column(db.String(255), nullable=False)

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    apellido_Materno = db.Column(db.String(255))
    apellido_Paterno = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True, nullable=False)
    contrasena = db.Column(db.String(255), nullable=False)
    matricula = db.Column(db.String(255), unique=True)
    id_rol = db.Column(db.Integer, db.ForeignKey('rol_usuario.id'), nullable=False)

class Checador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    CDE = db.Column(db.String(255))
    ubicacion = db.Column(db.String(255))

class Materia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    profesor = db.Column(db.String(255), nullable=False)

class Asistencia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.Date, nullable=False)
    horaEntrada = db.Column(db.Time, nullable=False)
    horaSalida = db.Column(db.Time, nullable=False)
    materia_id = db.Column(db.Integer, db.ForeignKey('materia.id'), nullable=False)

class AsistenciaAlumnos(db.Model):
    id_Usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), primary_key=True)
    id_Asistencia = db.Column(db.Integer, db.ForeignKey('asistencia.id'), primary_key=True)
    uuid = db.Column(db.String(255))
    asistencia = db.Column(db.Boolean, nullable=False)
