import { Box, Button, Flex, HStack, Icon, Text, VStack, Image } from '@chakra-ui/react';
import { FaCog, FaTh } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <Box
      bg="white"
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
        <VStack spacing={7} alignItems="flex-start">

          <Button
            variant="ghost"
            colorScheme="blue"
            size="sm"
            w="100%"
            color="black"
            _hover={{ color: '#1B59F8' }}
          >
            <HStack alignItems="center" justifyContent="flex-start" spacing={0}>
              <FontAwesomeIcon icon={faArrowTrendUp} mr={2} />
              <Text p={5}>Reports</Text>
            </HStack>
          </Button>

          <Button
            variant="ghost"
            colorScheme="blue"
            size="sm"
            w="100%"
            color="black"
            _hover={{ color: '#1B59F8' }}
          >
            <HStack alignItems="center" justifyContent="flex-start" spacing={0}>
              <Icon as={FaTh} />
              <Text p={2}>Workspaces</Text>
            </HStack>
          </Button>

          <Button
            variant="ghost"
            colorScheme="blue"
            size="sm"
            w="100%"
            color="black"
            _hover={{ color: '#1B59F8' }}
          >
            <HStack alignItems="center" justifyContent="flex-start" spacing={0}>
              <Icon as={FaCog} />
              <Text p={5}>Settings</Text>
            </HStack>
          </Button>

        </VStack>
      </Flex>
    </Box>
  );
}

export default Sidebar;
