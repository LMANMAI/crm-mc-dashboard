import React from "react";
import { Stack, Text, Box } from "@chakra-ui/react";

interface PriceSummaryProps {
  cantidad: number;
  precioUnitario: number;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ cantidad, precioUnitario }) => {
  const total = precioUnitario * cantidad;

  return (
    <Stack gap={4}>
      <Stack gap={1} color="gray.500" fontSize="xs">
        <Text>$ {precioUnitario.toLocaleString("es-AR")} x unidad</Text>
        <Text>{cantidad} impresiones</Text>
      </Stack>

      <Box borderTopWidth="1px" />
      <Text fontSize="xl" fontWeight="semibold" color="gray.700">
        Total: $ {total.toLocaleString("es-AR")}
      </Text>
    </Stack>
  );
};

export default PriceSummary;
