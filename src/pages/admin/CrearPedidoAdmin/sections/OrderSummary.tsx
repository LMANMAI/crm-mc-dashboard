import React from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Grid,
  GridItem,
  Badge,
  Button,
  HStack,
  Separator,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

interface OrderSummaryProps {
  clienteLabel: string;
  productoLabel: string;
  subproductoLabel: string;
  cantidad: number;
  precioUnitario: number;
  observaciones: string;
  medioPagoLabel: string;
  comentariosPago: string;
  isSaving: boolean;
  onSave: () => void;
  onNuevoPedido: () => void;
}

const SummaryRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <GridItem>
    <Text fontSize="xs" color="gray.500" mb={0.5}>
      {label}
    </Text>
    <Text fontSize="sm" fontWeight="medium" color="gray.700">
      {value || "—"}
    </Text>
  </GridItem>
);

const OrderSummary: React.FC<OrderSummaryProps> = ({
  clienteLabel,
  productoLabel,
  subproductoLabel,
  cantidad,
  precioUnitario,
  observaciones,
  medioPagoLabel,
  comentariosPago,
  isSaving,
  onSave,
  onNuevoPedido,
}) => {
  const total = precioUnitario * cantidad;

  return (
    <Box maxW="2xl" mx="auto" py={8}>
      <Stack gap={6}>
        {/* Header */}
        <HStack gap={3}>
          <Box color="teal.500" fontSize="2xl">
            <FaCheckCircle />
          </Box>
          <Stack gap={0}>
            <Heading size="md" color="gray.800">
              Resumen del pedido
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Revisá los datos antes de confirmar
            </Text>
          </Stack>
        </HStack>

        {/* Detalle del producto */}
        <Box
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
        >
          <Box bg="teal.500" px={4} py={2}>
            <Text fontWeight="semibold" fontSize="sm" color="white">
              Detalle del producto
            </Text>
          </Box>
          <Box px={4} py={4}>
            <Grid templateColumns="1fr 1fr" gap={4}>
              <SummaryRow label="Cliente" value={clienteLabel} />
              <SummaryRow label="Producto" value={productoLabel} />
              <SummaryRow label="Subproducto" value={subproductoLabel} />
              <SummaryRow label="Cantidad" value={`${cantidad} unidades`} />
            </Grid>
            {observaciones && (
              <>
                <Separator my={3} />
                <Text fontSize="xs" color="gray.500" mb={0.5}>
                  Observaciones
                </Text>
                <Text fontSize="sm" color="gray.700">
                  {observaciones}
                </Text>
              </>
            )}
          </Box>
        </Box>

        {/* Detalle de pago */}
        <Box
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
        >
          <Box bg="teal.500" px={4} py={2}>
            <Text fontWeight="semibold" fontSize="sm" color="white">
              Información de pago
            </Text>
          </Box>
          <Box px={4} py={4}>
            <Grid templateColumns="1fr 1fr" gap={4}>
              <SummaryRow label="Medio de pago" value={medioPagoLabel} />
              <SummaryRow
                label="Precio unitario"
                value={`$ ${precioUnitario.toLocaleString("es-AR")}`}
              />
            </Grid>
            {comentariosPago && (
              <>
                <Separator my={3} />
                <Text fontSize="xs" color="gray.500" mb={0.5}>
                  Comentarios de pago
                </Text>
                <Text fontSize="sm" color="gray.700">
                  {comentariosPago}
                </Text>
              </>
            )}
          </Box>
        </Box>

        {/* Total */}
        <Box
          borderWidth="1px"
          borderRadius="md"
          px={4}
          py={4}
          bg="gray.50"
        >
          <HStack justify="space-between">
            <Stack gap={0}>
              <Text fontSize="xs" color="gray.500">
                Total a cobrar
              </Text>
              <Badge colorPalette="teal" variant="subtle" fontSize="xs">
                {cantidad} unidades × $ {precioUnitario.toLocaleString("es-AR")}
              </Badge>
            </Stack>
            <Text fontSize="2xl" fontWeight="bold" color="teal.600">
              $ {total.toLocaleString("es-AR")}
            </Text>
          </HStack>
        </Box>

        {/* Acciones */}
        <HStack>
          <Button
            colorPalette="teal"
            size="sm"
            loading={isSaving}
            onClick={onSave}
          >
            CONFIRMAR Y GUARDAR
          </Button>
          <Button variant="ghost" size="sm" onClick={onNuevoPedido} disabled={isSaving}>
            NUEVO PEDIDO
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default OrderSummary;
