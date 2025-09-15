import React from "react";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  LinkBox,
  LinkOverlay,
  Icon,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaBookOpen, FaImage } from "react-icons/fa";

type TileProps = {
  to: string;
  icon: React.ElementType;
  label: string;
};

const Tile: React.FC<TileProps> = ({ to, icon, label }) => (
  <LinkBox
    as={Box}
    role="group"
    rounded="md"
    bg="teal.500"
    color="white"
    h="120px"
    px={6}
    py={6}
    display="flex"
    alignItems="center"
    gap={4}
    _hover={{ bg: "teal.600" }}
    transition="background 0.15s ease"
    shadow="sm"
  >
    <Icon as={icon} boxSize={10} opacity={0.95} />
    <Box>
      <Text as={RouterLink} /*to={to}*/>
        <Text fontWeight="semibold">{label}</Text>
      </Text>
    </Box>
  </LinkBox>
);

const TiendaAdminPage: React.FC = () => {
  return (
    <Box p={4}>
      <Flex align="center" mb={4}>
        <Heading as="h2" size="md">
          Tienda
        </Heading>
      </Flex>

      <Box bg="white" rounded="md" shadow="sm" borderWidth="1px">
        <Box
          bg="teal.500"
          color="white"
          roundedTop="md"
          px={4}
          py={2}
          fontWeight="medium"
        >
          Tienda
        </Box>

        <Box p={6}>
          <SimpleGrid columns={{ base: 1, sm: 2 }} gap={6} maxW="700px">
            <Tile to="/tienda/slider" icon={FaBookOpen} label="Slider" />
            <Tile to="/tienda/imagenes" icon={FaImage} label="Imágenes" />
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default TiendaAdminPage;
