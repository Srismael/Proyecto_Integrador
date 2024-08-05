from flask import request, jsonify
from . import asistencia_bp
from .. import db
from ..models import Asistencia

@asistencia_bp.route('/asistencia', methods=['GET'])
def get_asistencia():
    asistencias = Asistencia.query.all()
    return jsonify([{
        'id': asistencia.id, 
        'fecha': asistencia.fecha.isoformat(),  # Convierte a cadena ISO
        'horaEntrada': asistencia.horaEntrada.strftime('%H:%M:%S'),  # Convierte a cadena
        'horaSalida': asistencia.horaSalida.strftime('%H:%M:%S'),  # Convierte a cadena
        'materia_id': asistencia.materia_id
    } for asistencia in asistencias])


@asistencia_bp.route('/crear_asistencia', methods=['POST'])
def crear_asistencia():
    try:
        data = request.get_json()

        # Validación de datos
        if not data.get('fecha') or not data.get('horaEntrada') or not data.get('horaSalida'):
            return jsonify({'message': 'Todos los campos son obligatorios'}), 400

        nueva_asistencia = Asistencia(
            fecha=data['fecha'],
            horaEntrada=data['horaEntrada'],
            horaSalida=data['horaSalida'],
            materia_id=data.get('materia_id')  # Obtener el materia_id de la solicitud, si está presente
        )

        db.session.add(nueva_asistencia)
        db.session.commit()

        return jsonify({'message': 'Asistencia creada exitosamente'}), 201

    except Exception as e:
        db.session.rollback()
        print(e)  # Para fines de depuración
        return jsonify({'message': 'Error al crear la asistencia'}), 500