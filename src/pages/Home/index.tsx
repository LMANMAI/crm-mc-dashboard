import React from "react";
import {
  coreEventBus,
  AppEventType,
} from "../../../packages/core-contracts/src/index";
// Traemos el hook que creaste en el shell
import { useGlobalNotifications } from "../../../apps/shell/src/hooks/useGlobalNotifications";

export const HomePage: React.FC = () => {
  // Inicializamos el orquestador de eventos para esta vista
  useGlobalNotifications();

  const handleSimulateAction = () => {
    // STAFF ENGINEER NOTE: Emitimos el evento de UI
    coreEventBus.publish(AppEventType.UI_NOTIFICATION, {
      type: "success",
      message: "¡Arquitectura de Eventos validada con éxito en Mas Copies!",
      duration: 5000,
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      <h1>Mas Copies - Dashboard</h1>
      <p>Probando la comunicación Event-Driven:</p>
      <button
        onClick={handleSimulateAction}
        style={{
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          cursor: "pointer",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Disparar Notificación Global
      </button>
    </div>
  );
};

// 👇 ESTO ES LO QUE ARREGLA LA PANTALLA BLANCA 👇
export default HomePage;
