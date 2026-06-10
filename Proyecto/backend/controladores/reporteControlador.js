import PDFDocument from 'pdfkit';
import conexion from '../config/conexion.js';

export const generarReporteProductos = async (req, res) => {
    try {
        const [productos] = await conexion.query(`
            SELECT p.*, c.nombre as categoria 
            FROM productos p
            LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
            WHERE p.estado = 1
        `);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_productos.pdf');

        const doc = new PDFDocument({ margin: 50 });
        doc.pipe(res);

        doc.fontSize(20).text('Reporte de Productos', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'right' });
        doc.moveDown(2);

        const tableTop = 150;
        let y = tableTop;

        doc.fontSize(10);
        doc.text('Nombre', 50, y);
        doc.text('Categoría', 200, y);
        doc.text('Precio', 350, y);
        doc.text('Stock', 450, y);
        
        y += 20;
        doc.lineWidth(0.5).moveTo(50, y).lineTo(550, y).stroke();

        productos.forEach(producto => {
            y += 20;
            if (y > 700) {
                doc.addPage();
                y = 50;
            }
            doc.text(producto.nombre.substring(0, 30), 50, y);
            doc.text(producto.categoria || 'Sin categoría', 200, y);
            doc.text(`$${producto.precio}`, 350, y);
            doc.text(producto.stock.toString(), 450, y);
        });
        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: error.message });
    }
};