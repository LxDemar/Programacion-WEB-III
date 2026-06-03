CREATE DATABASE basededatos;
USE basededatos;

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    categoriaId INT,
    FOREIGN KEY (categoriaId)
        REFERENCES categorias(id)
        ON DELETE CASCADE
);

INSERT INTO categorias (nombre, descripcion)
VALUES
('Electrónica', 'Dispositivos electrónicos y gadgets'),
('Oficina', 'Material y accesorios de oficina');

INSERT INTO productos(nombre, precio, fecha_vencimiento, categoriaId)
VALUES
('Leche', 15, '2026-05-01', 2),
('Pollito', 90, '2026-05-26', 1),
('Yogurt', 8, '2026-06-20', 2);