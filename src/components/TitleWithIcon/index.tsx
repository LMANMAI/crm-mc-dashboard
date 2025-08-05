import { Box, Flex, Text, Stack } from "@chakra-ui/react";
import { type ReactNode } from "react";

interface TitleWithIconProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}

const TitleWithIcon = ({ icon, title, subtitle }: TitleWithIconProps) => (
  <Stack gap={1} mb={6}>
    <Flex align="center">
      <Box fontSize="2xl" mr={2} display="inline-block">
        {icon}
      </Box>
      <Text fontSize="2xl" fontWeight="bold">
        {title}
      </Text>
    </Flex>
    {subtitle && (
      <Text fontSize="sm" color="gray.600" ml={10}>
        {subtitle}
      </Text>
    )}
  </Stack>
);

export default TitleWithIcon;
