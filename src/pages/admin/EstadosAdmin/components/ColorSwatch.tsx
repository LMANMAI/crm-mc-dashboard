import React from "react";
import { Box, Badge, HStack } from "@chakra-ui/react";

interface ColorSwatchProps {
  hex: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ hex }) => (
  <HStack gap={2}>
    <Box
      w="16px"
      h="16px"
      rounded="sm"
      border="1px solid"
      borderColor="gray.300"
      style={{ backgroundColor: hex }}
      flexShrink={0}
    />
    <Badge variant="subtle">{hex}</Badge>
  </HStack>
);

export default ColorSwatch;
