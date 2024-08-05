from flask import request, jsonify
from . import materias_bp
from .. import db
from ..models import Materia

@materias_bp.route('/materias', methods=['GET'])
def get_materias():
    materias = Materia.query.all()
    return jsonify([{
        'id': materia.id, 
        'nombre': materia.nombre, 
        'profesor': materia.profesor
    } for materia in materias])

@materias_bp.route('/materias', methods=['POST'])
def add_materia():
    data = request.get_json()
    nueva_materia = Materia(
        nombre=data['nombre'], 
        profesor=data['profesor']
    )
    db.session.add(nueva_materia)
    db.session.commit()
    return jsonify({
        'id': nueva_materia.id, 
        'nombre': nueva_materia.nombre, 
        'profesor': nueva_materia.profesor
    }), 201
