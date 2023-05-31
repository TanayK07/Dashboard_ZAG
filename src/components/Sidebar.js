import { Box, Flex,HStack, Icon, Text, VStack, Image } from '@chakra-ui/react';
import { FaCog, FaTh } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <Box
      bg="gray.200"
      w={230}
      h="100vh"
      position="fixed"
      top={0}
      left={0}
      overflowY="auto"
      px={0}
      py={6}
      boxShadow="lg"
      zIndex={10}
    >
      <Flex direction="column" alignItems="center">
        <Image src="logo.png" alt="Logo" boxSize={8} w={70} h={45} mr={2} mb={10} />
        <HStack alignItems="center" spacing={10} ml={0}>
        <VStack spacing={7} alignItems="center">
            <FontAwesomeIcon icon={faArrowTrendUp} />
            <Icon as={FaTh} boxSize={4} />
            <Icon as={FaCog} boxSize={4} />
          </VStack>
<VStack spacing={6} alignItems="left">

          <Text>Reports</Text>
          <Text>Workspaces</Text>
          <Text>Settings</Text>

          </VStack>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Sidebar;
