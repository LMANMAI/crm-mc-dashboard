import { useState } from "react";
import { Box, VStack, Icon, Text, IconButton, Flex } from "@chakra-ui/react";
import {
  FaClipboardList,
  FaUser,
  FaBell,
  FaFileInvoice,
  FaStore,
  FaSignOutAlt,
  FaBars,
  FaAngleLeft,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Tooltip } from "../../ui/tooltip";

const links = [
  //{ label: "Nuevo pedido", icon: FaPlus, to: "/admin/new-order" },
  { label: "Mis pedidos", icon: FaClipboardList, to: "/pedidos" },
  { label: "Cuenta corriente", icon: FaFileInvoice, to: "/cuenta-corriente" },
  { label: "Mis datos", icon: FaUser, to: "/mis-datos" },
  { label: "Notificaciones", icon: FaBell, to: "/admin/notifications" },
  { label: "Comprobantes", icon: FaFileInvoice, to: "/comprobantes" },
  { label: "Ir a la tienda", icon: FaStore, to: "http://localhost:5173/" },
  { label: "Mis presupuestos", icon: FaClipboardList, to: "/presupuestos" },
  //{ label: "Reclamos", icon: FaCommentDots, to: "/admin/claims" },
  { label: "Salir", icon: FaSignOutAlt, to: "/logout" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      w={collapsed ? "70px" : "250px"}
      bg="gray.100"
      minH="calc(100vh - 56px)"
      p={3}
      transition="width 0.3s ease"
    >
      <IconButton
        variant="ghost"
        size="sm"
        mb={4}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <FaBars /> : <FaAngleLeft />}
      </IconButton>

      <VStack align="stretch" gap={2}>
        {links.map((link) => (
          <Tooltip key={link.label} content={link.label}>
            <NavLink
              to={link.to}
              style={() => ({
                textDecoration: "none",
              })}
            >
              {({ isActive }) => (
                <Flex
                  align="center"
                  gap={collapsed ? 0 : 3}
                  px={3}
                  py={2}
                  borderRadius="md"
                  justify={collapsed ? "center" : "flex-start"}
                  bg={isActive ? "teal.500" : "transparent"}
                  fontWeight={isActive ? "bold" : "normal"}
                  _hover={{ bg: isActive ? "teal.700" : "teal.100" }}
                >
                  <Icon as={link.icon} color={!isActive ? "teal" : "white"} />
                  {!collapsed && (
                    <Text fontSize="sm" color={!isActive ? "teal" : "white"}>
                      {link.label}
                    </Text>
                  )}
                </Flex>
              )}
            </NavLink>
          </Tooltip>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
