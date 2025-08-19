import { useState } from "react";
import {
  Box,
  VStack,
  Icon,
  Text,
  IconButton,
  Flex,
  Collapsible,
} from "@chakra-ui/react";
import {
  FaClipboardList,
  FaUser,
  FaFileInvoice,
  FaStore,
  FaSignOutAlt,
  FaBars,
  FaAngleLeft,
  FaShoppingCart,
  FaChartLine,
  FaBox,
  FaUsers,
  FaCog,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Tooltip } from "../../ui/tooltip";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

const menuByRole: Record<string, any[]> = {
  user_cliente: [
    {
      section: "",
      items: [
        { label: "Mis pedidos", icon: FaClipboardList, to: "/pedidos" },
        {
          label: "Cuenta corriente",
          icon: FaFileInvoice,
          to: "/cuenta-corriente",
        },
        { label: "Mis datos", icon: FaUser, to: "/mis-datos" },
        { label: "Comprobantes", icon: FaFileInvoice, to: "/comprobantes" },
        {
          label: "Ir a la tienda",
          icon: FaStore,
          to: "http://localhost:5174/",
        },
        {
          label: "Mis presupuestos",
          icon: FaClipboardList,
          to: "/presupuestos",
        },
        { label: "Salir", icon: FaSignOutAlt, to: "/auth" },
      ],
    },
  ],
  user_empleado: [
    {
      section: "OPERATIVO",
      items: [
        { label: "Crear pedido", icon: FaShoppingCart, to: "/crear-pedido" },

        { label: "Cotizador digital", icon: FaShoppingCart, to: "/cotizador" },
        { label: "Pedidos", icon: FaClipboardList, to: "/pedidos" },
        { label: "Proyectos", icon: FaBox, to: "/proyectos" },
        { label: "Fleteros", icon: FaBox, to: "/fleteros" },
      ],
    },
    {
      section: "ADMINISTRATIVO",
      items: [
        { label: "Cajas", icon: FaBox, to: "/cajas" },
        { label: "Stock", icon: FaBox, to: "/stock" },
      ],
    },
    {
      section: "",
      items: [{ label: "Salir", icon: FaSignOutAlt, to: "/auth" }],
    },
  ],
  user_admin: [
    {
      section: "OPERATIVO",
      items: [
        { label: "Crear pedido", icon: FaShoppingCart, to: "/crear-pedido" },
        { label: "Cotizador digital", icon: FaShoppingCart, to: "/cotizador" },
        { label: "Pedidos", icon: FaClipboardList, to: "/pedidos-admin" },
        { label: "Proyectos", icon: FaBox, to: "/proyectos" },
        { label: "Nuevo pedido", icon: FaShoppingCart, to: "/nuevo-pedido" },
        { label: "historial", icon: FaShoppingCart, to: "/historial-admin" },
      ],
    },
    {
      section: "ADMINISTRATIVO",
      items: [
        { label: "Cajas", icon: FaBox, to: "/cajas" },
        { label: "Compras", icon: FaBox, to: "/compras" },
        { label: "Stock", icon: FaBox, to: "/stock" },
      ],
    },
    {
      section: "TABLAS",
      items: [
        { label: "Clientes", icon: FaUsers, to: "/clientes" },
        { label: "Configuraciones", icon: FaCog, to: "/configuraciones" },
      ],
    },
    {
      section: "REPORTES",
      items: [{ label: "Reportes", icon: FaChartLine, to: "/reportes" }],
    },
    {
      section: "",
      items: [{ label: "Salir", icon: FaSignOutAlt, to: "/auth" }],
    },
  ],
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const userRol = useSelector((state: RootState) => state.auth.user?.rol);
  const sections = menuByRole[userRol || "user_cliente"] || [];

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

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
        aria-label="Toggle sidebar"
      >
        {collapsed ? <FaBars /> : <FaAngleLeft />}
      </IconButton>

      <VStack align="stretch" gap={2}>
        {sections.map((section, index) => (
          <Box key={index}>
            {collapsed ? (
              <VStack align="stretch" gap={1}>
                {section.items.map((link: any) => (
                  <Tooltip key={link.label} content={link.label}>
                    <NavLink
                      to={link.to}
                      style={() => ({ textDecoration: "none" })}
                    >
                      {({ isActive }) => (
                        <Flex
                          align="center"
                          justify="center"
                          px={2}
                          py={2}
                          borderRadius="md"
                          bg={isActive ? "teal.500" : "transparent"}
                          _hover={{ bg: isActive ? "teal.700" : "teal.100" }}
                        >
                          <Icon
                            as={link.icon}
                            color={!isActive ? "teal" : "white"}
                          />
                        </Flex>
                      )}
                    </NavLink>
                  </Tooltip>
                ))}
              </VStack>
            ) : section.section ? (
              <Collapsible.Root open={openSections[section.section]}>
                <Collapsible.Trigger
                  onClick={() => toggleSection(section.section)}
                  paddingY="3"
                >
                  <Flex align="center" justify="space-between" px={2}>
                    <Text fontSize="xs" fontWeight="bold" color="gray.600">
                      {section.section}
                    </Text>
                    <Icon
                      as={
                        openSections[section.section]
                          ? FaChevronDown
                          : FaChevronRight
                      }
                      boxSize={3}
                    />
                  </Flex>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <VStack align="stretch" pl={2} gap={1} mt={1}>
                    {section.items.map((link: any) => (
                      <Tooltip key={link.label} content={link.label}>
                        <NavLink
                          to={link.to}
                          style={() => ({ textDecoration: "none" })}
                        >
                          {({ isActive }) => (
                            <Flex
                              align="center"
                              gap={3}
                              px={3}
                              py={2}
                              borderRadius="md"
                              bg={isActive ? "teal.500" : "transparent"}
                              fontWeight={isActive ? "bold" : "normal"}
                              _hover={{
                                bg: isActive ? "teal.700" : "teal.100",
                              }}
                            >
                              <Icon
                                as={link.icon}
                                color={!isActive ? "teal" : "white"}
                              />
                              <Text
                                fontSize="sm"
                                color={!isActive ? "teal" : "white"}
                              >
                                {link.label}
                              </Text>
                            </Flex>
                          )}
                        </NavLink>
                      </Tooltip>
                    ))}
                  </VStack>
                </Collapsible.Content>
              </Collapsible.Root>
            ) : (
              <VStack align="stretch" pl={2} gap={1} mt={1}>
                {section.items.map((link: any) => (
                  <Tooltip key={link.label} content={link.label}>
                    <NavLink
                      to={link.to}
                      style={() => ({ textDecoration: "none" })}
                    >
                      {({ isActive }) => (
                        <Flex
                          align="center"
                          gap={3}
                          px={3}
                          py={2}
                          borderRadius="md"
                          bg={isActive ? "teal.500" : "transparent"}
                          fontWeight={isActive ? "bold" : "normal"}
                          _hover={{ bg: isActive ? "teal.700" : "teal.100" }}
                        >
                          <Icon
                            as={link.icon}
                            color={!isActive ? "teal" : "white"}
                          />
                          <Text
                            fontSize="sm"
                            color={!isActive ? "teal" : "white"}
                          >
                            {link.label}
                          </Text>
                        </Flex>
                      )}
                    </NavLink>
                  </Tooltip>
                ))}
              </VStack>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
