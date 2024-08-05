# Proyecto_Integrador

'''
use checador;

SELECT 
    a.fecha,
    a.horaEntrada,
    a.horaSalida,
    u.nombre,
    u.apellido_Paterno,
    u.apellido_Materno,
    au.asistencia
FROM 
    asistencia_Usuarios au
JOIN 
    usuario u ON au.id_Usuario = u.id
JOIN 
    Asistencia a ON au.id_Asistencia = a.id;


-- Create database
CREATE DATABASE checador;

-- Use the newly created database
USE checador;

-- Create tables with AUTO_INCREMENT starting at 1
CREATE TABLE rol_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(255)
) AUTO_INCREMENT=1;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido_Materno VARCHAR(255),
    apellido_Paterno VARCHAR(255), 
    email VARCHAR(255),
    contrasena VARCHAR(255),
    matricula VARCHAR(255),
    uid VARCHAR(255),
    id_rol INT,
    FOREIGN KEY (id_rol) REFERENCES rol_usuario(id)
) AUTO_INCREMENT=1;

CREATE TABLE checador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    CDE VARCHAR(255),
    ubicacion VARCHAR(255)
) AUTO_INCREMENT=1;

CREATE TABLE materia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    profesor VARCHAR(255) NOT NULL
) AUTO_INCREMENT=1;

CREATE TABLE Asistencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    horaEntrada TIME NOT NULL,
    horaSalida TIME NOT NULL,
    materia_id INT,
    FOREIGN KEY (materia_id) REFERENCES materia(id)
) AUTO_INCREMENT=1;

CREATE TABLE asistencia_Usuarios (
    id_Usuario INT,
    id_Asistencia INT,
    asistencia BOOLEAN,
    FOREIGN KEY (id_Usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_Asistencia) REFERENCES Asistencia(id),
    PRIMARY KEY (id_Usuario, id_Asistencia)
);

-- Insert reference data
INSERT INTO rol_usuario (rol) VALUES
('Admin'),
('Profesor'),
('Alumno');

INSERT INTO usuario (nombre, apellido_Materno, apellido_Paterno, email, contrasena, matricula, id_rol) VALUES
('Juan', 'Martínez', 'López', 'juan.lopez@example.com', 'password123', 'A12345', 1),
('Ana', 'García', 'Pérez', 'ana.garcia@example.com', 'password456', 'A12346', 2),
('Luis', 'Hernández', 'González', 'luis.hernandez@example.com', 'password789', 'A12347', 3);

INSERT INTO checador (CDE, ubicacion) VALUES
('CDE001', 'Aula 101'),
('CDE002', 'Aula 102'),
('CDE003', 'Aula 103');

INSERT INTO materia (nombre, profesor) VALUES
('Matemáticas', 'Dr. Juan Pérez'),
('Física', 'Dra. Ana Gómez'),
('Química', 'Dr. Luis Rodríguez');

INSERT INTO Asistencia (fecha, horaEntrada, horaSalida, materia_id) VALUES
('2023-07-01', '08:00:00', '10:00:00', 1),
('2023-07-02', '10:00:00', '12:00:00', 2),
('2023-07-03', '12:00:00', '14:00:00', 3);

INSERT INTO asistencia_Usuarios (id_Usuario, id_Asistencia, asistencia) VALUES
(3, 1, TRUE),
(3, 2, FALSE),
(3, 3, TRUE);


'''