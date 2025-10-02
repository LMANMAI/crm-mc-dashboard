import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import { AccountSection, AccountStatusSummary } from "../../components";
import { FaCheckCircle, FaDollarSign, FaTimesCircle } from "react-icons/fa";

const CuentaCorrientePageCliente = () => {
  const balance = 0;

  return (
    <Stack gap={6} p={4}>
      <AccountStatusSummary balance={balance} />

      <Text fontSize="xl" fontWeight="bold">
        Estado de cuenta:
      </Text>

      <AccountSection
        title="Cuenta corriente de Javier Chang"
        icon={<FaDollarSign />}
        color="teal.600"
        tableColumns={[
          { header: "Fecha", accessor: "fecha" },
          { header: "Monto", accessor: "monto" },
          { header: "Descripción", accessor: "descripcion" },
        ]}
        tableData={[]}
      />

      <AccountSection
        title="Facturas Adeudadas"
        icon={<FaTimesCircle />}
        color="gray.500"
        tableColumns={[
          { header: "Número", accessor: "numero" },
          { header: "Tipo", accessor: "tipo" },
          { header: "Fecha", accessor: "fecha" },
          { header: "Monto", accessor: "monto" },
          { header: "Órdenes", accessor: "ordenes" },
          { header: "Recibos", accessor: "recibos" },
          { header: "Saldo", accessor: "saldo" },
        ]}
        tableData={[]}
      />

      <AccountSection
        title="Facturas Saldadas"
        icon={<FaCheckCircle />}
        color="green.600"
        tableColumns={[
          { header: "Número", accessor: "numero" },
          { header: "Tipo", accessor: "tipo" },
          { header: "Fecha", accessor: "fecha" },
          { header: "Monto", accessor: "monto" },
          { header: "Órdenes", accessor: "ordenes" },
          { header: "Recibos", accessor: "recibos" },
        ]}
        tableData={[]}
      />
    </Stack>
  );
};

export default CuentaCorrientePageCliente;
