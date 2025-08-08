import React from "react";
import {
  Box,
  Button,
  Center,
  Input,
  Link,
  Stack,
  Image,
  InputGroup,
} from "@chakra-ui/react";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../../assets/logo_prueba.png";
import { useNavigate } from "react-router-dom";
import { Select } from "../../components";
import { login } from "../../features/auth";
import { useDispatch } from "react-redux";
import type { Rol } from "../../types";

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRol, setSelectedRol] = React.useState<Rol | "">("");

  const [loading, setLoading] = React.useState<boolean>(false);

  const userData = {
    user_cliente: {
      nombre: "Carlos",
      apellido: "García",
      dni: "22333444",
      email: "carlos@cliente.com",
    },
    user_admin: {
      nombre: "Lucía",
      apellido: "Martínez",
      dni: "33222444",
      email: "lucia@admin.com",
    },
    user_empleado: {
      nombre: "Pablo",
      apellido: "Lopez",
      dni: "34567890",
      email: "pablo@empleado.com",
    },
  };

  const handleChangeRol = (value: string) => {
    if (
      value === "user_admin" ||
      value === "user_cliente" ||
      value === "user_empleado"
    ) {
      setSelectedRol(value);
    } else {
      setSelectedRol("");
    }
  };

  const handleUserAuthenticated = async () => {
    if (!selectedRol || !(selectedRol in userData)) return;

    dispatch(
      login({
        ...userData[selectedRol],
        rol: selectedRol,
        token: "",
        id: "",
      })
    );

    setLoading(true);
    setTimeout(() => {
      navigate(`/`);
    }, 1500);
  };

  return (
    <Center minH="100vh" bg="gray.50" px={4}>
      <Box
        bg="white"
        p={{ base: 6, md: 8 }}
        rounded="md"
        shadow="lg"
        w={{ base: "100%", sm: "400px" }}
      >
        <Center mb={6}>
          <Image src={logo} alt="mascopies" objectFit="cover" />
        </Center>

        <Stack gap={4}>
          <Center>
            <Box as="h1" fontSize="2xl" fontWeight="bold">
              Iniciar Sesión
            </Box>
          </Center>

          <InputGroup startElement={<FaUser />}>
            <Input placeholder="Usuario o correo electronico" />
          </InputGroup>

          <InputGroup startElement={<FaLock />}>
            <Input placeholder="Contraseña" />
          </InputGroup>

          <Select
            label="Seleccion de perfil"
            options={[
              { label: "Cliente", value: "user_cliente" },
              { label: "Administrador", value: "user_admin" },
              { label: "Empleado", value: "user_empleado" },
            ]}
            value={selectedRol}
            onChange={handleChangeRol}
            multiple={false}
          />
          <Stack direction="row" gap={4} pt={2}>
            <Button
              flex={1}
              variant="outline"
              colorPalette="teal"
              disabled={loading}
            >
              Registrarme
            </Button>
            <Button
              flex={1}
              colorPalette="teal"
              onClick={() => {
                handleUserAuthenticated();
              }}
              disabled={loading}
              loading={loading}
            >
              Iniciar Sesión
            </Button>
          </Stack>

          <Center>
            <Link color="teal.500" href="#">
              ¿Olvidaste tu contraseña?
            </Link>
          </Center>
        </Stack>
      </Box>
    </Center>
  );
};

export default AuthPage;
