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
