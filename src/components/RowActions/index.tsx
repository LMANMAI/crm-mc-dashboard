import {
  IconButton,
  Menu,
  Portal,
  MenuRoot,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
  MenuItem,
  HStack,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import {
  FaAngleDown,
  FaTrash,
  FaEye,
  FaPrint,
  FaFileAlt,
  FaExclamation,
  FaCheckSquare,
  FaIndent,
} from "react-icons/fa";
import { Tooltip } from "../ui/tooltip";

type Props = {
  rowId: number;
};

const RowActions = ({ rowId }: Props) => {
  return (
    <HStack gap={2} justify="center">
      <Tooltip key={rowId} content="Previsualizar">
        <Button size="xs" variant="plain" colorPalette="teal">
          <FaIndent />
        </Button>
      </Tooltip>

      <Tooltip key={rowId} content="Previsualizar">
        <Button size="xs" variant="plain" colorPalette="teal">
          <FaCheckSquare />
        </Button>
      </Tooltip>

      <MenuRoot>
        <MenuTrigger asChild>
          <Button size="xs" variant="solid" colorPalette="teal">
            Acciones <FaAngleDown />
          </Button>
        </MenuTrigger>
        <Portal>
          <MenuPositioner>
            <MenuContent>
              <MenuItem value="preview">Previsualizar</MenuItem>
              <MenuItem value="print">Imprimir</MenuItem>
              <MenuItem value="reprint">Reimprimir</MenuItem>
              <MenuItem value="delete-order">Eliminar orden</MenuItem>
              <MenuItem value="delete-file">Eliminar archivo</MenuItem>
              <MenuItem value="important">Marcar como importante</MenuItem>
            </MenuContent>
          </MenuPositioner>
        </Portal>
      </MenuRoot>
    </HStack>
  );
};

export default RowActions;
