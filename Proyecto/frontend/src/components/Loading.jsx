function Loading() {
    return (
        <div className="spinner-overlay">
            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-only">Cargando...</span>
            </div>
        </div>
    );
}

export default Loading;