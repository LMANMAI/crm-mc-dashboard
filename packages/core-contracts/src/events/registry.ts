   import { Copy } from '../domain/copy';
    
    export enum AppEventType {
       COPY_CREATED = 'COPY_CREATED',
       COPY_UPDATED = 'COPY_UPDATED',
       UI_NOTIFICATION = 'UI_NOTIFICATION'
     }
    
    export interface NotificationPayload {
      type: 'success' | 'error' | 'info' | 'warning';
      message: string;
      duration?: number;
    }
   
    // Mapa que vincula el Tipo de Evento con su Payload
    export interface AppEventMap {
      [AppEventType.COPY_CREATED]: Copy;
      [AppEventType.COPY_UPDATED]: Partial<Copy> & { id: string };
      [AppEventType.UI_NOTIFICATION]: NotificationPayload;
    }