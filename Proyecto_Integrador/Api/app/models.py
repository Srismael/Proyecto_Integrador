from . import db

class RolUsuario(db.Model):
    __tablename__ = 'rol_usuario'
    id = db.Column(db.Integer, primary_key=True)
    rol = db.Column(db.String(255), nullable=False)

class Usuario(db.Model):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    apellido_Materno = db.Column(db.String(255), nullable=False)
    apellido_Paterno = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    contrasena = db.Column(db.String(255), nullable=False)
    matricula = db.Column(db.String(255), nullable=False)
    uid = db.Column(db.String(255))
    id_rol = db.Column(db.Integer, db.ForeignKey('rol_usuario.id'), nullable=False)

class Checador(db.Model):
    __tablename__ = 'checador'
    id = db.Column(db.Integer, primary_key=True)
    CDE = db.Column(db.String(255), nullable=False)
    ubicacion = db.Column(db.String(255), nullable=False)

class Materia(db.Model):
    __tablename__ = 'materia'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    profesor = db.Column(db.String(255), nullable=False)

class Asistencia(db.Model):
    __tablename__ = 'Asistencia'
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.Date, nullable=False)
    horaEntrada = db.Column(db.Time, nullable=False)
    horaSalida = db.Column(db.Time, nullable=False)
    materia_id = db.Column(db.Integer, db.ForeignKey('materia.id'), nullable=False)

class AsistenciaUsuarios(db.Model):
    __tablename__ = 'asistencia_Usuarios'
    id_Usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), primary_key=True)
    id_Asistencia = db.Column(db.Integer, db.ForeignKey('Asistencia.id'), primary_key=True)
    asistencia = db.Column(db.Boolean, nullable=False)
