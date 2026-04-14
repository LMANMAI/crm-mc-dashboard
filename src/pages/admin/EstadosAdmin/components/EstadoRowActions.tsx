import React from "react";
import { HStack, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { EstadoRow } from "../data";

interface EstadoRowActionsProps {
  row: EstadoRow;
  onEdit: (row: EstadoRow) => void;
  onDelete: (row: EstadoRow) => void;
}

const EstadoRowActions: React.FC<EstadoRowActionsProps> = ({ row, onEdit, onDelete }) => (
  <HStack justify="flex-end" gap={2}>
    <IconButton
      aria-label="Editar"
      size="xs"
      variant="subtle"
      onClick={() => onEdit(row)}
    >
      <FaEdit />
    </IconButton>
    <IconButton
      aria-label="Eliminar"
      size="xs"
      variant="subtle"
      colorPalette="red"
      onClick={() => onDelete(row)}
    >
      <FaTrash />
    </IconButton>
  </HStack>
);

export default EstadoRowActions;
