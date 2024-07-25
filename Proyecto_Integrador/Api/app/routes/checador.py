from flask import request, jsonify
from . import checador_bp
from .. import db
from ..models import Checador

@checador_bp.route('/checador', methods=['GET'])
def get_usuarios():
    checador = Checador.query.all()
    return jsonify([{
        'id': checador.id, 
        'CDE': checador.CDE, 
        'ubicacion': checador.ubicacion
    } for checador in checador])