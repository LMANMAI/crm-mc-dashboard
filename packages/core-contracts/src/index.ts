
// 1. Exportar Entidades de Dominio
export * from './domain/copy';

// 2. Exportar Registro de Eventos
export { AppEventType } from './events/registry';
export type { AppEventMap, NotificationPayload } from './events/registry';

// 3. Exportar el Bus de Comunicación
export { coreEventBus } from './events/bus';