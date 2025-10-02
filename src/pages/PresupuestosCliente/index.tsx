import React from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  IconButton,
  Stack,
  Tag,
} from "@chakra-ui/react";
import { FaSearch, FaClipboardList, FaChevronDown } from "react-icons/fa";
import { TitleWithIcon, SectionBox } from "../../components";
import { Table } from "../../components";
import { Menu as CMenu, Portal } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";

const columns = [
  { header: "Nro", accessor: "numero" as const, textAlign: "left" as const },
  { header: "Fecha", accessor: "fecha" as const, textAlign: "left" as const },
  {
    header: "Producto",
    accessor: "producto" as const,
    textAlign: "left" as const,
  },
  {
    header: "Estado",
    accessor: "estado" as const,
    textAlign: "center" as const,
  },
  { header: "", accessor: "acciones" as const, textAlign: "right" as const },
];

export const PresupuestosPageCliente: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");

  const mockData = [
    {
      numero: (
        <NavLink
          to={`/presupuestos/${5687}`}
          style={() => ({
            textDecoration: "none",
          })}
        >
          5687
        </NavLink>
      ),
      fecha: "29/07/2025",
      producto: "Talonarios por duplicado",
      estado: <Tag.Root colorPalette="green">Aprobado</Tag.Root>,
      acciones: (
        <HStack gap={2}>
          <IconButton
            aria-label="Previsualizar"
            //icon={<FaClipboardList />}
            size="sm"
            colorPalette="teal"
            variant={"ghost"}
          >
            <FaClipboardList />
          </IconButton>
          <CMenu.Root>
            <CMenu.Trigger asChild>
              <Button
                size="sm" //rightIcon={<FaClipboardList />}
                colorPalette="teal"
                variant={"ghost"}
              >
                Acciones
                <FaChevronDown />
              </Button>
            </CMenu.Trigger>
            <Portal>
              <CMenu.Positioner>
                <CMenu.Content>
                  <CMenu.Item
                    value="ver"
                    onClick={() => {
                      navigate(`/presupuestos/${5687}`);
                    }}
                  >
                    Ver
                  </CMenu.Item>
                  <CMenu.Item value="editar">Editar</CMenu.Item>
                  <CMenu.Item value="borrar">Eliminar</CMenu.Item>
                </CMenu.Content>
              </CMenu.Positioner>
            </Portal>
          </CMenu.Root>
        </HStack>
      ),
    },
  ];

  return (
    <Box p={6}>
      <TitleWithIcon
        icon={<FaClipboardList />}
        title="Módulo de presupuestos"
      />

      <SectionBox title="Todos los presupuestos">
        <Stack gap={4}>
          <HStack justify="flex-end">
            <Input
              placeholder="Buscar"
              size="sm"
              maxW="300px"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton
              aria-label="Buscar presupuestos"
              size="sm"
              colorPalette="teal"
              onClick={() => {}}
            >
              <FaSearch />{" "}
            </IconButton>
          </HStack>

          <Box overflowX="auto">
            <Table data={mockData} columns={columns} rowKey="numero" />
          </Box>
        </Stack>
      </SectionBox>
    </Box>
  );
};

export default PresupuestosPageCliente;
