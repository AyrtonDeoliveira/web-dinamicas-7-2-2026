CREATE DATABASE negocio;
USE negocio5;

CREATE TABLE productos (
    codigo INT PRIMARY KEY,
    nombre VARCHAR(50),
    precio DECIMAL(10,2),
    fecha_alta DATE
);

INSERT INTO productos VALUES
(1,'Silla Gamer',35000,'2026-01-10'),
(2,'Silla Oficina',25000,'2026-01-11'),
(3,'Mesa',50000,'2026-01-12'),
(4,'Monitor',120000,'2026-01-13'),
(5,'Teclado',15000,'2026-01-14'),
(6,'Mouse',10000,'2026-01-15'),
(7,'Silla Infantil',18000,'2026-01-16'),
(8,'Notebook',500000,'2026-01-17'),
(9,'Auriculares',30000,'2026-01-18'),
(10,'Impresora',85000,'2026-01-19');

-- Mostrar todos los datos

SELECT * FROM productos;

-- Mostrar los productos con nombre "Mesa"

SELECT *
FROM productos
WHERE nombre = 'Mesa';

-- Mostrar productos que comienzan con S

SELECT *
FROM productos
WHERE nombre LIKE 'S%';

-- Mostrar nombre y precio de productos con precio mayor a 22

SELECT nombre, precio
FROM productos
WHERE precio > 22;

-- Precio promedio de productos cuyo nombre comienza con "Silla"

SELECT AVG(precio) AS precio_promedio
FROM productos
WHERE nombre LIKE 'Silla%';

-- Agregar campo categoria

ALTER TABLE productos
ADD categoria VARCHAR(30);

-- Cargar categorías de ejemplo

UPDATE productos
SET categoria = 'Muebles'
WHERE nombre LIKE 'Silla%'
   OR nombre = 'Mesa';

UPDATE productos
SET categoria = 'Informatica'
WHERE nombre IN (
    'Monitor',
    'Teclado',
    'Mouse',
    'Notebook',
    'Impresora'
);

UPDATE productos
SET categoria = 'Audio'
WHERE nombre = 'Auriculares';

-- Ver categorías sin repetir

SELECT DISTINCT categoria
FROM productos;

-- Ver cantidad de productos por categoría

SELECT categoria,
       COUNT(*) AS cantidad_productos
FROM productos
GROUP BY categoria;