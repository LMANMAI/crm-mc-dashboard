import React from "react";
import { Box, Stack, Heading, Text, Button, HStack, Badge } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface OrderSuccessProps {
  orderId: string | number;
  clienteLabel: string;
  productoLabel: string;
  subproductoLabel: string;
  total: number;
  onNuevoPedido: () => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({
  orderId,
  clienteLabel,
  productoLabel,
  subproductoLabel,
  total,
  onNuevoPedido,
}) => {
  const navigate = useNavigate();

  return (
    <Box maxW="lg" mx="auto" py={16} textAlign="center">
      <Stack gap={6} align="center">
        <Box color="teal.500" fontSize="5xl">
          <FaCheckCircle />
        </Box>

        <Stack gap={1}>
          <Heading size="lg" color="gray.800">
            ¡Pedido creado con éxito!
          </Heading>
          <Text color="gray.500" fontSize="sm">
            El pedido fue registrado correctamente en el sistema.
          </Text>
        </Stack>

        <Badge colorPalette="teal" fontSize="sm" px={4} py={1}>
          Pedido #{orderId}
        </Badge>

        {/* Resumen rápido */}
        <Box
          borderWidth="1px"
          borderRadius="md"
          px={6}
          py={4}
          w="full"
          textAlign="left"
        >
          <Stack gap={2}>
            <HStack justify="space-between">
              <Text fontSize="xs" color="gray.500">Cliente</Text>
              <Text fontSize="sm" fontWeight="medium">{clienteLabel}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="xs" color="gray.500">Producto</Text>
              <Text fontSize="sm" fontWeight="medium">{productoLabel}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="xs" color="gray.500">Subproducto</Text>
              <Text fontSize="sm" fontWeight="medium">{subproductoLabel}</Text>
            </HStack>
            <HStack justify="space-between" borderTopWidth="1px" pt={2} mt={1}>
              <Text fontSize="sm" fontWeight="semibold" color="gray.700">Total</Text>
              <Text fontSize="lg" fontWeight="bold" color="teal.600">
                $ {total.toLocaleString("es-AR")}
              </Text>
            </HStack>
          </Stack>
        </Box>

        <HStack>
          <Button
            colorPalette="teal"
            size="sm"
            onClick={() => navigate("/pedidos-admin")}
          >
            VER PEDIDOS
          </Button>
          <Button variant="ghost" size="sm" onClick={onNuevoPedido}>
            NUEVO PEDIDO
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default OrderSuccess;
