import { Table } from "@chakra-ui/react";

// Types
export interface Column<T> {
  header: string;
  accessor?: string;
  textAlign?: "left" | "right" | "center";
}

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "line";
}

function CustomTable<T extends Record<string, any>>({
  data,
  columns,
  rowKey,
  onRowClick,
  size = "sm",
  variant = "outline",
}: CustomTableProps<T>) {
  return (
    <Table.Root size={size} variant={variant}>
      <Table.Header>
        {columns.map((col) => (
          <Table.ColumnHeader
            key={String(col.accessor || col.header)}
            textAlign={col.textAlign}
            fontWeight="bold"
            fontSize="sm"
            borderBottom="1px solid"
            borderColor="gray.200"
          >
            {col.header}
          </Table.ColumnHeader>
        ))}
      </Table.Header>

      <Table.Body>
        {data.length === 0 ? (
          <Table.Row>
            <Table.Cell
              colSpan={columns.length}
              textAlign="center"
              py={6}
              color="gray.500"
              fontSize="sm"
            >
              No hay datos disponibles
            </Table.Cell>
          </Table.Row>
        ) : (
          data.map((row) => (
            <Table.Row
              key={String(row[rowKey])}
              cursor={onRowClick ? "pointer" : undefined}
              _hover={onRowClick ? { bg: "gray.50" } : undefined}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => {
                if (!col.accessor) return null;

                const cell = row[col.accessor];
                return (
                  <Table.Cell
                    key={String(col.accessor)}
                    textAlign={col.textAlign}
                    py={3}
                  >
                    {cell}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  );
}
export { CustomTable as Table };
