from flask import request, jsonify
from . import usuarios_bp
from .. import db
from ..models import Usuario

@usuarios_bp.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([{
        'id': usuario.id, 
        'nombre': usuario.nombre, 
        'apellido_Materno': usuario.apellido_Materno, 
        'apellido_Paterno': usuario.apellido_Paterno, 
        'email': usuario.email, 
        'matricula': usuario.matricula, 
        'id_rol': usuario.id_rol
    } for usuario in usuarios])

@usuarios_bp.route('/usuarios', methods=['POST'])
def add_usuario():
    data = request.get_json()
    nuevo_usuario = Usuario(
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
