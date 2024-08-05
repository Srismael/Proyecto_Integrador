from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    CORS(app)  # Habilitar CORS en la aplicación Flask
    
    db.init_app(app)
    
    with app.app_context():
        from . import models
        from .routes import usuarios_bp, roles_bp, checador_bp, materias_bp, asistencia_bp, asistencia_alumnos_bp
        
        # Registrar los Blueprints
        app.register_blueprint(usuarios_bp)
        app.register_blueprint(roles_bp)
        app.register_blueprint(checador_bp)
        app.register_blueprint(materias_bp)
        app.register_blueprint(asistencia_bp)
        app.register_blueprint(asistencia_alumnos_bp)
        
        db.create_all()
        
    return app
