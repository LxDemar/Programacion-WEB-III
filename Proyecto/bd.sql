CREATE DATABASE IKADENIN;
USE IKADENIN;
CREATE TABLE usuarios(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('ADMIN','EMPLEADO') DEFAULT 'EMPLEADO',
    estado TINYINT DEFAULT 1
);

CREATE TABLE categorias(
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    estado TINYINT DEFAULT 1
);

CREATE TABLE proveedores(
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(100),
    estado TINYINT DEFAULT 1
);

CREATE TABLE productos(
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    imagen VARCHAR(255),
    id_categoria INT,
    id_proveedor INT,
    estado TINYINT DEFAULT 1,

    FOREIGN KEY(id_categoria)
    REFERENCES categorias(id_categoria),

    FOREIGN KEY(id_proveedor)
    REFERENCES proveedores(id_proveedor)
);

CREATE TABLE clientes(
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100),
    telefono VARCHAR(20),
    estado TINYINT DEFAULT 1
);

CREATE TABLE cotizaciones(
    id_cotizacion INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('PENDIENTE','APROBADA','RECHAZADA') DEFAULT 'PENDIENTE',

    FOREIGN KEY(id_cliente)
    REFERENCES clientes(id_cliente)
);

CREATE TABLE detalle_cotizacion(
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_cotizacion INT,
    id_producto INT,
    cantidad INT,
    precio DECIMAL(10,2),

    FOREIGN KEY(id_cotizacion)
    REFERENCES cotizaciones(id_cotizacion),

    FOREIGN KEY(id_producto)
    REFERENCES productos(id_producto)
);

CREATE TABLE logs_acceso(
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    ip VARCHAR(100),
    browser VARCHAR(255),
    evento ENUM('INGRESO','SALIDA'),
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(id_usuario)
    REFERENCES usuarios(id_usuario)
);