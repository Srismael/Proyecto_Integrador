from flask import request, jsonify
from . import roles_bp
from .. import db
from ..models import RolUsuario

@roles_bp.route('/roles', methods=['GET'])
def get_roles():
    roles = RolUsuario.query.all()
    return jsonify([{
        'id': rol.id, 
        'rol': rol.rol
    } for rol in roles])

@roles_bp.route('/roles', methods=['POST'])
def add_rol():
    data = request.get_json()
    nuevo_rol = RolUsuario(
        rol=data['rol']
    )
    db.session.add(nuevo_rol)
    db.session.commit()
    return jsonify({
        'id': nuevo_rol.id, 
        'rol': nuevo_rol.rol
    }), 201
