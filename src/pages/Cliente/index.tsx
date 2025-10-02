import { Button, Grid, Flex, Stack, Input } from "@chakra-ui/react";
import { Table, TitleWithIcon, SectionBox } from "../../components";
import { FaUserEdit, FaFileAlt } from "react-icons/fa";

const ClienteScreen = () => {
  const constanciaColumns = [
    { header: "Numero", accessor: "numero" as const },
    { header: "Descripción", accessor: "descripcion" as const },
    { header: "Archivo", accessor: "archivo" as const },
  ];

  const constanciaData: any[] = [];

  return (
    <Stack gap={6} p={6}>
      <TitleWithIcon icon={FaUserEdit} title="Módulo de clientes" />
      <SectionBox title="Mis datos">
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <Input placeholder="Nombre *" defaultValue="javier chang" />
          <Input placeholder="Empresa" />
          <Input placeholder="Razón social" />
          <Input
            placeholder="C.U.I.T. (Solo números)"
            defaultValue="20403896900"
          />

          <Input placeholder="D.N.I. (Solo números)" defaultValue="40389690" />
          <Input placeholder="Dirección" defaultValue="sabatini 1070" />
          <Input placeholder="Ciudad" />
          <Input placeholder="Provincia" />

          <Input placeholder="Teléfono" defaultValue="01140260773" />
          <Input placeholder="Celular" />
          <Input placeholder="Contacto" />
          <Input placeholder="Email" defaultValue="javi.c97@hotmail.com" />

          <Input placeholder="Contraseña" type="password" />
          <Input placeholder="Repetir contraseña" type="password" />
        </Grid>
        <Flex justify="flex-end" mt={6} gap={3}>
          <Button colorPalette="teal">Cancelar</Button>
          <Button colorPalette="teal">Guardar</Button>
        </Flex>
      </SectionBox>

      <SectionBox
        title="Constancias"
        icon={FaFileAlt}
        actionButton={{ label: "+ Nuevo", onClick: () => {} }}
      >
        <Table
          data={constanciaData}
          columns={constanciaColumns}
          rowKey="numero"
        />
      </SectionBox>
    </Stack>
  );
};

export default ClienteScreen;
