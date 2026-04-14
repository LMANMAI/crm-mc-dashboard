import { useState } from "react";
import {
  Box,
  VStack,
  Icon,
  Text,
  IconButton,
  Flex,
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
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
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
      section: "TABLAS OPERATIVAS",
      items: [
        { label: "Estados", icon: FaUsers, to: "/estados-admin" },
        { label: "Pedidos simples", icon: FaCog, to: "/pedidos-simples-admin" },
        { label: "Sectores", icon: FaUsers, to: "/sectores-admin" },
        { label: "Categorias", icon: FaCog, to: "/categorias-admin" },
        { label: "Insumos", icon: FaCog, to: "/insumos-admin" },
      ],
    },
    {
      section: "TABLAS ADMINISTRATIVAS",
      items: [
        { label: "Clientes", icon: FaUsers, to: "/clientes-admin" },
        { label: "Tipos de clientes", icon: FaCog, to: "/tipos-cliente-admin" },
        {
          label: "Configuracion de facturas",
          icon: FaUsers,
          to: "/config-facturas-admin",
        },
        { label: "Proveedores", icon: FaCog, to: "/proveedores-admin" },
        { label: "Medios de pago", icon: FaCog, to: "/medios-pago-admin" },
      ],
    },
    {
      section: "TABLAS GENERALES",
      items: [
        { label: "Usuarios", icon: FaUsers, to: "/usuarios-admin" },
        {
          label: "Niveles de usuario",
          icon: FaCog,
          to: "/tipos-usuarios-admin",
        },
        {
          label: "Tienda",
          icon: FaUsers,
          to: "/tienda-admin",
        },
        { label: "Configuraciones", icon: FaCog, to: "/configuraciones-admin" },
        { label: "Archivos", icon: FaCog, to: "/archivos-admin" },
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

const NavItem = ({
  link,
  showLabel,
}: {
  link: any;
  showLabel: boolean;
}) => (
  <NavLink to={link.to} style={{ textDecoration: "none" }}>
    {({ isActive }) => (
      <Flex
        align="center"
        justify={showLabel ? "flex-start" : "center"}
        gap={showLabel ? 3 : 0}
        px={showLabel ? 3 : 2}
        py={2}
        borderRadius="md"
        bg={isActive ? "teal.500" : "transparent"}
        fontWeight={isActive ? "bold" : "normal"}
        _hover={{ bg: isActive ? "teal.700" : "teal.100" }}
      >
        <Icon as={link.icon} color={isActive ? "white" : "teal.600"} />
        {showLabel && (
          <Text fontSize="sm" color={isActive ? "white" : "teal.700"}>
            {link.label}
          </Text>
        )}
      </Flex>
    )}
  </NavLink>
);

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const userRol = useSelector((state: RootState) => state.auth.user?.rol);
  const sections = menuByRole[userRol || "user_cliente"] || [];

  return (
    <Box
      w={collapsed ? "70px" : "250px"}
      bg="gray.100"
      minH="calc(100vh - 56px)"
      p={3}
      transition="width 0.3s ease"
      position="relative"
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

      <VStack align="stretch" gap={collapsed ? 1 : 4}>
        {sections.map((section, index) =>
          collapsed ? (
            // — COLLAPSED: 1 icon per section, flyout on hover —
            <Box
              key={index}
              position="relative"
              onMouseEnter={() => setHoveredSection(index)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {index > 0 && (
                <Box borderTop="1px solid" borderColor="gray.300" mb={1} />
              )}
              {/* Single representative icon for the section */}
              <Flex
                align="center"
                justify="center"
                px={2}
                py={2}
                borderRadius="md"
                cursor="default"
                _hover={{ bg: "teal.100" }}
              >
                <Icon as={section.items[0].icon} color="teal.600" />
              </Flex>

              {hoveredSection === index && (
                <Box
                  position="absolute"
                  left="calc(100% + 6px)"
                  top={0}
                  bg="white"
                  shadow="lg"
                  borderRadius="md"
                  p={2}
                  minW="190px"
                  zIndex={1000}
                  border="1px solid"
                  borderColor="gray.200"
                >
                  {section.section && (
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      color="gray.500"
                      px={2}
                      mb={1}
                    >
                      {section.section}
                    </Text>
                  )}
                  <VStack align="stretch" gap={1}>
                    {section.items.map((link: any) => (
                      <NavItem key={link.label} link={link} showLabel={true} />
                    ))}
                  </VStack>
                </Box>
              )}
            </Box>
          ) : (
            // — EXPANDED: sections always visible —
            <Box key={index}>
              {section.section && (
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="gray.500"
                  px={2}
                  mb={1}
                  letterSpacing="wide"
                >
                  {section.section}
                </Text>
              )}
              <VStack align="stretch" gap={1}>
                {section.items.map((link: any) => (
                  <NavItem key={link.label} link={link} showLabel={true} />
                ))}
              </VStack>
            </Box>
          )
        )}
      </VStack>
    </Box>
  );
};

export default Sidebar;
