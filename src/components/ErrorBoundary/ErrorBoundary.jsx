import { Component } from "react";
import "./ErrorBoundary.css"; // Importamos los estilos CSS

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error capturado:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>🚧 Mantenimiento en proceso 🚧</h1>
          <p>Estamos mejorando nuestra plataforma. Vuelve más tarde.</p>
          <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
