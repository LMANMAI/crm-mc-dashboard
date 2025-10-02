import { Box, Text, HStack } from "@chakra-ui/react";
import { FaDollarSign } from "react-icons/fa";

interface AccountStatusSummaryProps {
  balance: number;
}

const AccountStatusSummary = ({ balance }: AccountStatusSummaryProps) => {
  const isPositive = balance > 0;
  const isZero = balance === 0;

  const label = isPositive
    ? "Saldo a favor"
    : isZero
    ? "Saldo a favor"
    : "Saldo en contra";

  const color = isPositive || isZero ? "green.500" : "red.500";

  return (
    <Box mb={6}>
      <Text fontSize="xl" fontWeight="bold" mb={1}>
        Estado de cuenta:
      </Text>
      <HStack>
        <Text fontWeight="bold" color={color}>
          ${Math.abs(balance)}
        </Text>
        <Text>{label}</Text>
      </HStack>
      <Text fontSize="sm" color="gray.500" mt={1}>
        El Estado de cuenta es el resultado de todos los recibos - facturas
      </Text>
    </Box>
  );
};

export default AccountStatusSummary;
