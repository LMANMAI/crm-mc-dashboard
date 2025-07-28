import { useState } from "react";
import {
  Box,
  VStack,
  Icon,
  Text,
  Link as ChakraLink,
  IconButton,
} from "@chakra-ui/react";
import {
  FaPlus,
  FaClipboardList,
  FaUser,
  FaBell,
  FaFileInvoice,
  FaStore,
  FaCommentDots,
  FaSignOutAlt,
  FaBars,
  FaAngleLeft,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Tooltip } from "../../ui/tooltip";

const links = [
  { label: "Nuevo pedido", icon: FaPlus, to: "/admin/new-order" },
  { label: "Mis pedidos", icon: FaClipboardList, to: "/admin/orders" },
  { label: "Cuenta corriente", icon: FaFileInvoice, to: "/admin/account" },
  { label: "Mis datos", icon: FaUser, to: "/admin/profile" },
  { label: "Notificaciones", icon: FaBell, to: "/admin/notifications" },
  { label: "Comprobantes", icon: FaFileInvoice, to: "/admin/invoices" },
  { label: "Ir a la tienda", icon: FaStore, to: "/shop" },
  { label: "Mis presupuestos", icon: FaClipboardList, to: "/admin/quotes" },
  { label: "Reclamos", icon: FaCommentDots, to: "/admin/claims" },
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
      {/* <IconButton
        aria-label="Toggle Sidebar"
        icon={collapsed ? <FaBars /> : <FaAngleLeft />}
        size="sm"
        mb={4}
        onClick={() => setCollapsed(!collapsed)}
        variant="ghost"
      /> */}
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
          <Tooltip
            key={link.label}
            content={link.label}
            //placement="right"
            //hasArrow
          >
            <ChakraLink
              as={NavLink}
              //to={link.to}
              display="flex"
              alignItems="center"
              gap={collapsed ? 0 : 3}
              px={3}
              py={2}
              borderRadius="md"
              justifyContent={collapsed ? "center" : "flex-start"}
              _hover={{ bg: "teal.100" }}
              //_activeLink={{ bg: "teal.200", fontWeight: "bold" }}
            >
              <Icon as={link.icon} />
              {!collapsed && <Text fontSize="sm">{link.label}</Text>}
            </ChakraLink>
          </Tooltip>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
