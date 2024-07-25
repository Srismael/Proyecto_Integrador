from flask import request, jsonify
from . import asistencia_alumnos_bp
from .. import db
from ..models import AsistenciaAlumnos

@asistencia_alumnos_bp.route('/asistenciausuarios', methods=['GET'])
def get_asistenciaUsuario():
    asistenciasA = AsistenciaAlumnos.query.all()
    return jsonify([{
        'id_Usuario': asistencia.id_Usuario, 
        'id_Asistencia': asistencia.id_Asistencia,
        'asistencia': asistencia.asistencia,
        'uuid': asistencia.uuid
    } for asistencia in asistenciasA])
