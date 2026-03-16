import { useGlobalNotifications } from "./hooks/useGlobalNotifications";
//import { CopyForm } from "@mas-copies/editor-copys";

export const App = () => {
  // 1. Inicializamos el orquestador de eventos globales del Shell
  useGlobalNotifications();

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      <h1>Mas Copies - Orquestador (Shell)</h1>
      <p>
        Este es el contenedor principal. Abajo se renderiza la Feature aislada:
      </p>
      <hr style={{ margin: "20px 0" }} />
      asdasd
      {/* 2. Rend  <CopyForm />erizamos el componente de dominio encapsulado */}
    </div>
  );
};

export default App;
