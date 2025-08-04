import { Box, Flex, Text } from "@chakra-ui/react";

interface TitleWithIconProps {
  icon: any;
  title: string;
}
const TitleWithIcon = ({ icon, title }: TitleWithIconProps) => (
  <Flex align="center" mb={4}>
    <Box as={icon} fontSize="2xl" mr={2} />
    <Text fontSize="2xl" fontWeight="bold">
      {title}
    </Text>
  </Flex>
);
export default TitleWithIcon;
