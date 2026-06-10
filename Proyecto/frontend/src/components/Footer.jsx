function Footer() {
    return (
        <footer className="text-center mt-5 py-3" style={{ background: "#f8f9fa", borderTop: "1px solid #dee2e6" }}>
            <p className="mb-0">IKADENIN - Sistema de Gestión de Inventario</p>
            <small className="text-muted">© {new Date().getFullYear()} - Todos los derechos reservados</small>
        </footer>
    );
}

export default Footer;