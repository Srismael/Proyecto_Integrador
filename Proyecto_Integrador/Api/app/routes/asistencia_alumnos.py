from flask import request, jsonify
from sqlalchemy.orm import aliased
from ..models import AsistenciaUsuarios, Usuario, Asistencia
from .. import db
from . import asistencia_alumnos_bp
from datetime import datetime


@asistencia_alumnos_bp.route('/actualizar_asistencia', methods=['POST'])
def actualizar_asistencia():
    data = request.json
    id_usuario = data['id_Usuario']
    id_asistencia = data['id_Asistencia']

    asistencia_usuario = AsistenciaUsuarios.query.filter_by(id_Usuario=id_usuario, id_Asistencia=id_asistencia).first()

    if asistencia_usuario:
        asistencia_usuario.asistencia = True
        db.session.commit()
        return jsonify({'message': 'Asistencia actualizada correctamente'}), 200
    else:
        return jsonify({'message': 'Registro de asistencia no encontrado'}), 404




@asistencia_alumnos_bp.route('/asistenciausuarios', methods=['GET'])
def get_asistencia_usuarios():
    asistencias = db.session.query(
        Asistencia.fecha,
        Asistencia.horaEntrada,
        Asistencia.horaSalida,
        Usuario.nombre,
        Usuario.apellido_Paterno,
        Usuario.apellido_Materno,
        AsistenciaUsuarios.asistencia,
        Usuario.uid
    ).select_from(AsistenciaUsuarios).join(
        Usuario, AsistenciaUsuarios.id_Usuario == Usuario.id
    ).join(
        Asistencia, AsistenciaUsuarios.id_Asistencia == Asistencia.id
    ).distinct().all()

    return jsonify([{
        'fecha': asistencia[0].strftime('%Y-%m-%d'),
        'horaEntrada': asistencia[1].strftime('%H:%M:%S'),
        'horaSalida': asistencia[2].strftime('%H:%M:%S'),
        'nombre': asistencia[3],
        'apellido_Paterno': asistencia[4],
        'apellido_Materno': asistencia[5],
        'asistencia': asistencia[6],
        'uid': asistencia[7]
    } for asistencia in asistencias])


@asistencia_alumnos_bp.route('/insert_asistencia', methods=['POST'])
def insert_asistencia():
    data = request.json
    nueva_asistencia = AsistenciaUsuarios(
        id_Usuario=data['id_Usuario'],
        id_Asistencia=data['id_Asistencia'],
        asistencia=data['asistencia']
    )
    db.session.add(nueva_asistencia)
    db.session.commit()
    return jsonify({'message': 'Asistencia insertada correctamente'})



