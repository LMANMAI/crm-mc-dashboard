import React from "react";
import {
  Box,
  Button,
  Center,
  Input,
  Link,
  Stack,
  Image,
  Field,
  InputGroup,
} from "@chakra-ui/react";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../../assets/logo_prueba.png";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
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

          {/* Contraseña */}
          {/* <Field.Root invalid>
            <Field.Label>Contraseña</Field.Label>
            <Input placeholder="Ingresa tu contraseña" />
            {/* <Field.ErrorText>This field is required</Field.ErrorText> 
          </Field.Root> */}

          <InputGroup startElement={<FaLock />}>
            <Input placeholder="Contraseña" />
          </InputGroup>

          {/* Botones */}
          <Stack direction="row" gap={4} pt={2}>
            <Button flex={1} variant="outline" colorPalette="teal">
              Registrarme
            </Button>
            <Button
              flex={1}
              colorPalette="teal"
              onClick={() => {
                navigate(`/`);
              }}
            >
              Iniciar Sesión
            </Button>
          </Stack>

          {/* Olvidaste contraseña */}
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
