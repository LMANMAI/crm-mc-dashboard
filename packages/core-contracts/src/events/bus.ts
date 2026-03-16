  // packages/core-contracts/src/events/bus.ts
     import { AppEventType, AppEventMap } from './registry';
    
     type Handler<T> = (data: T) => void;
    
     export class EventBus {
       private static instance: EventBus;
       private subscribers: Map<AppEventType, Handler<any>[]> = new Map();
    
      private constructor() {}
   
      public static getInstance(): EventBus {
        if (!EventBus.instance) {
          EventBus.instance = new EventBus();
        }
        return EventBus.instance;
      }
   
      public publish<K extends AppEventType>(event: K, data: AppEventMap[K]): void {
        const handlers = this.subscribers.get(event);
        if (handlers) {
          handlers.forEach((handler) => handler(data));
        }
      }
   
      public subscribe<K extends AppEventType>(
        event: K,
        handler: Handler<AppEventMap[K]>
      ): () => void {
        const handlers = this.subscribers.get(event) || [];
        this.subscribers.set(event, [...handlers, handler]);
   
        // Retorna una función de limpieza (Unsubscribe)
        return () => {
          const currentHandlers = this.subscribers.get(event) || [];
          this.subscribers.set(
            event,
            currentHandlers.filter((h) => h !== handler)
          );
        };
      }
    }
   
    // Exportamos una instancia única para todo el Monorepo
    export const coreEventBus = EventBus.getInstance();