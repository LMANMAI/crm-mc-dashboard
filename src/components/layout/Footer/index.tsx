import { Box, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../../ui/color-mode";

const Footer = () => {
  const bg = useColorModeValue("teal.500", "gray.800");
  // const color = useColorModeValue("gray.600", "gray.300");

  return (
    <Box bg={bg} py={4} textAlign="center">
      <Text fontSize="sm" color={"white"}>
        DattaGraf es un producto de <strong>Dattar</strong>.
      </Text>
    </Box>
  );
};

export default Footer;
