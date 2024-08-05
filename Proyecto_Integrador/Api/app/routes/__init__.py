from flask import Blueprint

# Crear blueprints
usuarios_bp = Blueprint('usuarios', __name__)
roles_bp = Blueprint('roles', __name__)
checador_bp = Blueprint('checador', __name__)
materias_bp = Blueprint('materias', __name__)
asistencia_bp = Blueprint('asistencia', __name__)
asistencia_alumnos_bp = Blueprint('asistencia_alumnos', __name__)

# Importar las rutas
from . import usuarios, roles, checador, materias, asistencia, asistencia_alumnos
