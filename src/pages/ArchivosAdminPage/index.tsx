import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Heading,
  Text,
  Input,
  InputGroup,
  InputElement,
  Button,
  Icon,
  Table,
  Checkbox,
  HStack,
  Separator as Divider,
} from "@chakra-ui/react";
import { FiSearch, FiTrash2 } from "react-icons/fi";

type FileRow = {
  id: string;
  name: string;
  date: string;
  size: string;
};

const MOCK_FILES: FileRow[] = Array.from({ length: 58 }).map((_, i) => ({
  id: `f-${i + 1}`,
  name: `86348_${(Math.random() * 1e8).toFixed(0)}_${Date.now() + i}.pdf`,
  date: "28/08/2025 11:06",
  size: `${(Math.random() * 30 + 0.5).toFixed(2)}MB`,
}));

const PAGE_SIZE = 20;

const ArchivosAdminPage: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_FILES;
    return MOCK_FILES.filter((f) => f.name.toLowerCase().includes(q));
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const current = filtered.slice(start, start + PAGE_SIZE);

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pageTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  const allOnPageSelected =
    current.length > 0 && current.every((r) => selected[r.id]);
  const someOnPageSelected =
    current.some((r) => selected[r.id]) && !allOnPageSelected;

  const toggleAllOnPage = () => {
    const copy = { ...selected };
    if (allOnPageSelected) {
      current.forEach((r) => delete copy[r.id]);
    } else {
      current.forEach((r) => (copy[r.id] = true));
    }
    setSelected(copy);
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const anySelected = Object.values(selected).some(Boolean);

  const handleBulkDelete = () => {
    const after = { ...selected };
    Object.keys(after).forEach((k) => delete after[k]);
    setSelected(after);
  };

  return (
    <Box p={6}>
      <Heading size="md" mb={4}>
        Archivos
      </Heading>

      <HStack justify="space-between" mb={4} gap={4}>
        <InputGroup maxW="400px">
          {/* <InputElement
            placement="start"
            pointerEvents="none"
            children={<Icon as={FiSearch} />}
          /> */}
          <Input
            placeholder="Buscar..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </InputGroup>
        <Button
          colorPalette="red"
          onClick={handleBulkDelete}
          disabled={!anySelected}
        >
          <Icon as={FiTrash2} style={{ marginRight: 6 }} />
          Eliminar seleccionados
        </Button>
        <Button
          colorPalette="red"
          onClick={handleBulkDelete}
          disabled={!anySelected}
        >
          <Icon as={FiSearch} style={{ marginRight: 6 }} />
          Eliminar seleccionados
        </Button>
      </HStack>

      <Card.Root>
        <Card.Header>
          <Stack gap={1}>
            <Text fontWeight="bold">
              Espacio utilizado: <Text as="span">12.56GB</Text>
            </Text>
            <Text>
              Espacio total: <Text as="span">15.00GB</Text>
            </Text>
            <Text>
              Espacio libre: <Text as="span">2.44GB</Text>
            </Text>
          </Stack>
        </Card.Header>

        <Divider />

        <Card.Body p={0}>
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row bg="gray.50">
                <Table.ColumnHeader w="48px">
                  <Checkbox.Root
                    checked={allOnPageSelected || someOnPageSelected}
                    onCheckedChange={toggleAllOnPage}
                    aria-label="Seleccionar todos"
                  >
                    <Checkbox.Control
                      data-state={
                        someOnPageSelected && !allOnPageSelected
                          ? "indeterminate"
                          : undefined
                      }
                    />
                  </Checkbox.Root>
                </Table.ColumnHeader>
                <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                <Table.ColumnHeader w="220px">Fecha</Table.ColumnHeader>
                <Table.ColumnHeader w="140px">Tamaño</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {current.map((row) => {
                const isChecked = !!selected[row.id];
                return (
                  <Table.Row key={row.id} _hover={{ bg: "gray.50" }}>
                    <Table.Cell>
                      <Checkbox.Root
                        checked={isChecked}
                        onCheckedChange={() => toggleOne(row.id)}
                        aria-label={`Seleccionar ${row.name}`}
                      >
                        <Checkbox.Control />
                      </Checkbox.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <Text fontSize="sm">{row.name}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text fontSize="sm">{row.date}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text fontSize="sm">{row.size}</Text>
                    </Table.Cell>
                  </Table.Row>
                );
              })}

              {current.length === 0 && (
                <Table.Row>
                  <Table.Cell
                    colSpan={4}
                    py={10}
                    textAlign="center"
                    color="gray.500"
                  >
                    No hay archivos que coincidan con la búsqueda
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </Card.Body>
      </Card.Root>

      <HStack mt={4} justify="flex-end" gap={1}>
        <Button
          size="xs"
          variant="subtle"
          onClick={() => pageTo(1)}
          disabled={page === 1}
        >
          «
        </Button>
        <Button
          size="xs"
          variant="subtle"
          onClick={() => pageTo(page - 1)}
          disabled={page === 1}
        >
          ‹
        </Button>

        <Text fontSize="sm" mx={2}>
          Página {page} de {totalPages}
        </Text>

        <Button
          size="xs"
          variant="subtle"
          onClick={() => pageTo(page + 1)}
          disabled={page === totalPages}
        >
          ›
        </Button>
        <Button
          size="xs"
          variant="subtle"
          onClick={() => pageTo(totalPages)}
          disabled={page === totalPages}
        >
          »
        </Button>
      </HStack>
    </Box>
  );
};

export default ArchivosAdminPage;
