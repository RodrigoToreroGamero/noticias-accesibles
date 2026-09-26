import '../styles/Footer.css'
export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-info">
          <h4>Portal de Noticias Accesible</h4>
          <p><b>Curso:</b> Interacción Hombre-Máquina</p>
          <p><b>Desarrolladores:</b> Luis Guillermo Solidoro Cueto & Juan Rodrigo Torero Gamero</p>
        </div>

        <div className="footer-accessibility">
          <p>Diseño optimizado para adultos mayores y personas con Parkinson</p>
          <p>Proyecto UTP Agosto 2026</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Noticias Accesibles. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}