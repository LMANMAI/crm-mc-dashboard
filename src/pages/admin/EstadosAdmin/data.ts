export type EstadoRow = {
  id: number;
  nombre: string;
  colorHex: string;
  tipo: "Pendiente" | "En producción" | "Finalizado" | "Entregado" | "Error";
  inicial: boolean;
  inicialTienda: boolean;
  aplicaCtaCte: boolean;
};

export const MOCK_ESTADOS: EstadoRow[] = [
  { id: 1, nombre: "1. Pendiente", colorHex: "#f1e601", tipo: "Pendiente", inicial: true, inicialTienda: true, aplicaCtaCte: true },
  { id: 2, nombre: "2. Pendiente de Pago", colorHex: "#ffb300", tipo: "Pendiente", inicial: false, inicialTienda: false, aplicaCtaCte: true },
  { id: 3, nombre: "3. En Proceso", colorHex: "#8ef107", tipo: "En producción", inicial: false, inicialTienda: false, aplicaCtaCte: true },
  { id: 4, nombre: "4. Impresión", colorHex: "#2e8330", tipo: "En producción", inicial: false, inicialTienda: false, aplicaCtaCte: true },
  { id: 5, nombre: "5. Terminaciones", colorHex: "#708577", tipo: "En producción", inicial: false, inicialTienda: false, aplicaCtaCte: true },
  { id: 6, nombre: "6. Finalizado", colorHex: "#c0c0c0", tipo: "Finalizado", inicial: false, inicialTienda: false, aplicaCtaCte: true },
  { id: 7, nombre: "7. Para Entregar", colorHex: "#13c2e1", tipo: "Finalizado", inicial: false, inicialTienda: false, aplicaCtaCte: true },
  { id: 8, nombre: "8. Entregado", colorHex: "#7441fa", tipo: "Entregado", inicial: false, inicialTienda: false, aplicaCtaCte: true },
  { id: 9, nombre: "9. Error", colorHex: "#ff1111", tipo: "Error", inicial: false, inicialTienda: false, aplicaCtaCte: true },
];
