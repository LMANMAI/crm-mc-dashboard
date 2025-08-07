import {
  Box,
  Flex,
  Spacer,
  Text,
  Icon,
  MenuRoot,
  MenuTrigger,
  Portal,
  MenuPositioner,
  MenuContent,
  MenuItem,
} from "@chakra-ui/react";
import { FaUser, FaShoppingCart, FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <Box bg="#00b2a9" color="white" py={3} px={6}>
      <Flex align="center">
        <Text fontWeight="bold">mascopies</Text>
        <Spacer />
        <Flex gap={6} align="center">
          <Flex align="center" gap={1}>
            <MenuRoot>
              <MenuTrigger asChild>
                <Icon as={FaBell} cursor={"pointer"} />
              </MenuTrigger>
              <Portal>
                <MenuPositioner>
                  <MenuContent>No hay notificaciones</MenuContent>
                </MenuPositioner>
              </Portal>
            </MenuRoot>
          </Flex>

          <Flex align="center" gap={1}>
            <Icon as={FaUser} />
            <Text fontSize="sm">GoldEyes</Text>
          </Flex>
          <Flex align="center" gap={1}>
            <Icon as={FaShoppingCart} />
            <Text fontSize="sm">$0</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
