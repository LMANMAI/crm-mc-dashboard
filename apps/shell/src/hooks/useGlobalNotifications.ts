import { useEffect } from 'react';
import { coreEventBus, AppEventType } from '@mas-copies/core-contracts';

export const useGlobalNotifications = () => {
  useEffect(() => {
    const unsubscribe = coreEventBus.subscribe(
      AppEventType.UI_NOTIFICATION,
      (payload) => {
        console.log(`[EVENT_BUS] Notificación recibida en el Shell:`, payload);
      }
    );
    return () => unsubscribe();
  }, []);
};
