from flask import request, jsonify
from sqlalchemy.orm import aliased
from ..models import AsistenciaUsuarios, Usuario, Asistencia
from .. import db
from . import asistencia_alumnos_bp
from datetime import datetime

@asistencia_alumnos_bp.route('/guardar_uid', methods=['POST'])
def guardar_uid():
    data = request.form
    uid = data.get('uid')
    hora_actual = data.get('hora')
    
    usuario = Usuario.query.filter_by(uid=uid).first()
    
    if not usuario:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    
    # Obtener el registro de asistencia del día actual
    fecha_actual = datetime.today().date()
    asistencias = Asistencia.query.filter_by(fecha=fecha_actual).all()
    
    if not asistencias:
        return jsonify({'message': 'No hay registro de asistencia para hoy'}), 404

    # Convertir la hora actual a un objeto datetime.time
    hora_actual_time = datetime.strptime(hora_actual, '%H:%M:%S').time()
    
    asistencia_valida = False

    for asistencia in asistencias:
        if asistencia.horaEntrada <= hora_actual_time <= asistencia.horaSalida:
            asistencia_usuario = AsistenciaUsuarios.query.filter_by(id_Usuario=usuario.id, id_Asistencia=asistencia.id).first()
            
            if asistencia_usuario:
                asistencia_usuario.asistencia = True
                db.session.commit()
                asistencia_valida = True
                break

    if asistencia_valida:
        return jsonify({'message': 'Asistencia registrada correctamente'}), 200
    else:
        return jsonify({'message': 'La hora actual no está dentro del rango de entrada y salida'}), 400



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



