from flask import request, jsonify
from . import materias_bp
from .. import db
from ..models import Materia

@materias_bp.route('/materia', methods=['GET'])
def get_usuarios():
    materia = Materia.query.all()
    return jsonify([{
        'id': materia.id, 
        'nombre': materia.nombre, 
        'profesor': materia.profesor
    } for materia in materia])

@materias_bp.route('/usuarios', methods=['POST'])
def add_usuario():
    data = request.get_json()
    nuevo_usuario = Materia(
        nombre=data['nombre'], 
        apellido_Materno=data['apellido_Materno'], 
        apellido_Paterno=data['apellido_Paterno'], 
        email=data['email'], 
        contrasena=data['contrasena'], 
        matricula=data['matricula'], 
        id_rol=data['id_rol']
    )
    db.session.add(nuevo_usuario)
    db.session.commit()
    return jsonify({
        'id': nuevo_usuario.id, 
        'nombre': nuevo_usuario.nombre, 
        'apellido_Materno': nuevo_usuario.apellido_Materno, 
        'apellido_Paterno': nuevo_usuario.apellido_Paterno, 
        'email': nuevo_usuario.email, 
        'matricula': nuevo_usuario.matricula, 
        'id_rol': nuevo_usuario.id_rol
    }), 201