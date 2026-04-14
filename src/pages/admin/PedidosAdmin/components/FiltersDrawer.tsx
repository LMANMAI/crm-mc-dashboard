import React from 'react';
import {
  Box,
  Button,
  Drawer,
  Grid,
  Input,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Select } from '../../../../components';
import { monthOptions, yearOptions } from '../data';

interface FiltersDrawerProps {
  open: boolean;
  onClose: () => void;
  month: string;
  setMonth: (v: string) => void;
  year: string;
  setYear: (v: string) => void;
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize="xs" fontWeight="semibold" color="teal.600" textTransform="uppercase" letterSpacing="wide">
    {children}
  </Text>
);

const FiltersDrawer: React.FC<FiltersDrawerProps> = ({
  open,
  onClose,
  month,
  setMonth,
  year,
  setYear,
}) => (
  <Drawer.Root open={open} onOpenChange={(e) => { if (!e.open) onClose(); }} placement="end" size="sm">
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header borderBottomWidth="1px">
            <Drawer.Title>Filtros y Exportar</Drawer.Title>
            <Drawer.CloseTrigger asChild>
              <Button size="xs" variant="ghost" position="absolute" top={3} right={3}>✕</Button>
            </Drawer.CloseTrigger>
          </Drawer.Header>

          <Drawer.Body overflowY="auto">
            <Stack gap={6} py={2}>

              <Stack gap={3}>
                <SectionTitle>Exportar</SectionTitle>
                <Stack gap={2}>
                  <Select options={monthOptions} value={month} onChange={setMonth} multiple={false} />
                  <Select options={yearOptions} value={year} onChange={setYear} multiple={false} />
                  <Button size="sm" colorPalette="teal" w="fit-content">Exportar</Button>
                </Stack>
              </Stack>

              <Box borderTopWidth="1px" />

              <Stack gap={3}>
                <SectionTitle>Filtros</SectionTitle>
                <Stack gap={3}>
                  <Input placeholder="Número" size="sm" />
                  <Select
                    options={[
                      { label: 'Seleccione un cliente', value: '' },
                      { label: 'Morph (f)', value: 'morph' },
                      { label: 'Octavio Felic', value: 'octavio' },
                    ]}
                    value={''} onChange={() => {}} multiple={false}
                  />
                  <Select
                    options={[
                      { label: 'Seleccione una terminación', value: '' },
                      { label: 'Anillado', value: 'anillado' },
                      { label: 'Laminado', value: 'laminado' },
                    ]}
                    value={''} onChange={() => {}} multiple={false}
                  />
                  <Input placeholder="Estado" size="sm" />
                  <Select
                    options={[
                      { label: 'Seleccione un producto', value: '' },
                      { label: 'Bajada Laser B&N', value: 'bn' },
                      { label: 'Bajada Laser Color', value: 'color' },
                    ]}
                    value={''} onChange={() => {}} multiple={false}
                  />
                  <Select
                    options={[
                      { label: 'Seleccione un sector', value: '' },
                      { label: 'Impresión', value: 'impresion' },
                      { label: 'Terminaciones', value: 'terminaciones' },
                    ]}
                    value={''} onChange={() => {}} multiple={false}
                  />
                  <Select
                    options={[
                      { label: 'Filtrar por papel', value: '' },
                      { label: 'Ilustración 170g', value: 'il170' },
                      { label: 'Obra 80g', value: 'obra80' },
                    ]}
                    value={''} onChange={() => {}} multiple={false}
                  />
                  <Select
                    options={[
                      { label: 'Seleccione un usuario', value: '' },
                      { label: 'Carlos', value: 'carlos' },
                      { label: 'Lucía', value: 'lucia' },
                    ]}
                    value={''} onChange={() => {}} multiple={false}
                  />
                  <Grid templateColumns="1fr 1fr" gap={2}>
                    <Input type="date" size="sm" />
                    <Input type="date" size="sm" />
                  </Grid>
                  <Select
                    options={[
                      { label: 'Seleccione un color', value: '' },
                      { label: 'B&N', value: 'bn' },
                      { label: 'Full Color', value: 'cmky' },
                    ]}
                    value={''} onChange={() => {}} multiple={false}
                  />
                  <Input placeholder="Cantidad" size="sm" />
                </Stack>
              </Stack>
            </Stack>
          </Drawer.Body>

          <Drawer.Footer borderTopWidth="1px" gap={2}>
            <Button size="sm" colorPalette="teal" flex={1}>Aplicar filtros</Button>
            <Button size="sm" variant="outline" flex={1}>Exportar filtrados</Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  </Drawer.Root>
);

export default FiltersDrawer;
