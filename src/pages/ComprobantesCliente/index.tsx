import React from "react";
import { Box, HStack, Input, IconButton, Stack } from "@chakra-ui/react";
import { FaSearch, FaReceipt } from "react-icons/fa";
import { Table, TitleWithIcon, SectionBox } from "../../components";

const columns = [
  { header: "Número", accessor: "numero" as const },
  { header: "Pto. de vta.", accessor: "ptoVenta" as const },
  { header: "Fecha", accessor: "fecha" as const },
  { header: "Fecha vencimiento", accessor: "vencimiento" as const },
  { header: "Monto", accessor: "monto" as const, textAlign: "right" as const },
  { header: "Saldo", accessor: "saldo" as const, textAlign: "right" as const },
];

const data: Array<Record<string, any>> = [];

const ComprobantesPageCliente: React.FC = () => {
  const [search, setSearch] = React.useState("");

  return (
    <Box p={6}>
      <TitleWithIcon icon={FaReceipt} title="Listado de comprobantes" />
      <SectionBox title="Comprobantes">
        <Stack gap={4}>
          <HStack justify="flex-end">
            <Input
              placeholder="Buscar..."
              size="sm"
              maxW="300px"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton
              aria-label="Buscar comprobantes"
              //icon={<FaSearch />}
              size="sm"
              colorPalette="teal"
              onClick={() => {}}
            >
              <FaSearch />
            </IconButton>
          </HStack>
          <Box overflowX="auto">
            <Table columns={columns} data={data} rowKey="numero" />
          </Box>
        </Stack>
      </SectionBox>
    </Box>
  );
};

export default ComprobantesPageCliente;
