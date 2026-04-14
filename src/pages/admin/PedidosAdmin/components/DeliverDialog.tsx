import React from 'react';
import {
  Box,
  Button,
  Dialog,
  HStack,
  Portal,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import type { PedidoRow } from '../data';

interface DeliverDialogProps {
  open: boolean;
  step: 'confirm' | 'success';
  isLoading: boolean;
  pendingRows: PedidoRow[];
  onConfirm: () => void;
  onClose: () => void;
}

const DeliverDialog: React.FC<DeliverDialogProps> = ({
  open,
  step,
  isLoading,
  pendingRows,
  onConfirm,
  onClose,
}) => (
  <Dialog.Root open={open} onOpenChange={(e) => { if (!e.open) onClose(); }}>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          {step === 'confirm' ? (
            <>
              <Dialog.Header>
                <Dialog.Title>Marcar como entregado</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={3}>
                  <Text fontSize="sm" color="gray.600">
                    Confirmá que los siguientes pedidos fueron entregados:
                  </Text>
                  <Stack gap={2}>
                    {pendingRows.map((r) => (
                      <Box key={r.id} borderWidth="1px" borderRadius="md" px={3} py={2}>
                        <HStack justify="space-between">
                          <Stack gap={0}>
                            <Text fontSize="sm" fontWeight="medium">
                              #{r.nro} — {r.cliente}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              {r.titulo} · {r.producto}
                            </Text>
                          </Stack>
                          <Text fontSize="sm" fontWeight="semibold" color="teal.600">
                            {r.precio}
                          </Text>
                        </HStack>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <HStack gap={2}>
                  <Button colorPalette="teal" size="sm" loading={isLoading} onClick={onConfirm}>
                    CONFIRMAR ENTREGA
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
                    CANCELAR
                  </Button>
                </HStack>
              </Dialog.Footer>
            </>
          ) : (
            <>
              <Dialog.Body py={8}>
                <Stack gap={4} align="center" textAlign="center">
                  <Box color="teal.500" fontSize="4xl">
                    <FaCheckCircle />
                  </Box>
                  <Stack gap={1}>
                    <Text fontSize="lg" fontWeight="bold" color="gray.800">
                      {pendingRows.length === 1
                        ? '¡Pedido marcado como entregado!'
                        : `¡${pendingRows.length} pedidos marcados como entregados!`}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      El estado fue actualizado correctamente.
                    </Text>
                  </Stack>
                  <Stack gap={1} w="full">
                    {pendingRows.map((r) => (
                      <HStack key={r.id} justify="space-between" px={2}>
                        <Text fontSize="sm" color="gray.600">#{r.nro} — {r.cliente}</Text>
                        <Tag.Root size="sm" colorPalette="green">
                          <Tag.Label>Entregado</Tag.Label>
                        </Tag.Root>
                      </HStack>
                    ))}
                  </Stack>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer justifyContent="center">
                <Button colorPalette="teal" size="sm" onClick={onClose}>CERRAR</Button>
              </Dialog.Footer>
            </>
          )}
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
);

export default DeliverDialog;
