import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import {
  coreEventBus,
  AppEventType,
  Copy,
  CreateCopyDTO
} from '@mas-copies/core-contracts';

interface CopyState {
  copies: Copy[];
  addCopy: (dto: CreateCopyDTO) => void;
  getCopyById: (id: string) => Copy | undefined;
}

export const useCopyStore = create<CopyState>()(
  persist(
    (set, get) => ({
      copies: [],
      addCopy: (dto: CreateCopyDTO) => {
        const newCopy: Copy = {
          ...dto,
          id: uuidv4(),
          status: 'draft',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({ copies: [newCopy, ...state.copies] }));
        coreEventBus.publish(AppEventType.COPY_CREATED, newCopy);
        coreEventBus.publish(AppEventType.UI_NOTIFICATION, {
          type: 'success',
          message: `Copy "${newCopy.title}" creado y guardado localmente.`,
        });
      },
      getCopyById: (id: string) => get().copies.find((c) => c.id === id),
    }),
    { name: 'mc-editor-storage' }
  )
);
