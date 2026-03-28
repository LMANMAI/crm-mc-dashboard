import React from "react";
import { Stack, Text, Box } from "@chakra-ui/react";

interface PriceSummaryProps {
  cantidad: number;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ cantidad }) => {
  return (
    <Stack gap={4}>
      <Stack gap={1} color="gray.500" fontSize="xs">
        <Text>x</Text>
        <Text>{cantidad} impresiones</Text>
      </Stack>

      <Box borderTopWidth="1px" />
      <Text fontSize="xl" fontWeight="semibold" color="gray.700">
        Total: $ 0
      </Text>
    </Stack>
  );
};

export default PriceSummary;
