import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, RadioGroup, VStack, Radio } from "@chakra-ui/react";
import { faChevronUp, faChevronDown, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { AddIcon } from '@chakra-ui/icons';
import { Stat, StatNumber } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import {
  ChakraProvider,
  extendTheme,
  Stack,
  Button,
  Flex,
  Box,
  Grid,
  Image,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  HStack,
} from '@chakra-ui/react';
import Sidebar from './components/Sidebar';
import data from './data.json';

const theme = extendTheme({
  colors: {
    blue: {
      500: '#3182CE',
    },
  },
  fonts: {
    body: "'Lato', sans-serif",
  },
});
const GlobalStyles = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        src: local('Lato Regular'), local('Lato-Regular'),
          url(https:
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
    `}
  />
);


function Dashboard() {
  const [orders, setOrders] = useState(data);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editOrder, setEditOrder] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = filterStatus === 'All' ? orders : orders.filter(order => order.status === filterStatus);

  const sortOrders = () => {
    const sorted = [...filteredOrders].sort((a, b) => {
      const aValue = a.price;
      const bValue = b.price;
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  
    setOrders(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const filteredStatusOrders = filteredOrders.filter(
    (order) => order.status === filterStatus
  );
  const confirmedCount = filteredStatusOrders.filter(
    (order) => order.status === "Confirmed"
  ).length;

  const sortOrdersPlacedon = () => {
    const sorted = [...filteredOrders].sort((a, b) => {
      const aValue = a.placed_on;
      const bValue = b.placed_on;
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  
    setOrders(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  

  const handleStatusToggle = (status) => {
    setFilterStatus(status);
  };

  const handleEditOrder = (order) => {
    setEditOrder(order);
  };

  const handleSaveEdit = () => {
    const updatedOrders = orders.map((o) => {
      if (o.item === editOrder.item) {
        return {
          ...o,
          brand_name: editOrder.brand_name,
        };
      }
      return o;
    });
    setOrders(updatedOrders);
    setEditOrder(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSearchOrders = filteredOrders.filter(order => {
    return (
      order.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.placed_on.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const statusOptions = [
    { label: 'Confirmed', value: 'Confirmed' },
    { label: 'Delivered', value: 'Delivered' },
    { label: 'Refund Completed', value: 'Refund Completed' },
    { label: 'Pending', value: 'Pending' },
  ];

  return (
    <Box p={4}>
      <Grid templateColumns="230 1fr" gap={4} alignItems="flex-start">
        <Sidebar />
        <Flex ml="230" justifyContent="space-between">
          <VStack spacing={4} align="start">
            <HStack justifyContent="space-between" width="100%">
              <Text fontSize="2xl" fontWeight="bold">Orders</Text>
              <Button colorScheme="blue" leftIcon={<AddIcon />} variant="solid" ml="auto">Add Orders</Button>
            </HStack>
            <VStack align="start" spacing={2}>
              <HStack>
              {/* <Flex justifyContent="space-between" width="100%"> */}
                <Text fontSize="lg" fontWeight="bold" ml={9}>
                  Confirmed
                </Text>
                <Stat>
                  {/* <StatLabel>Status</StatLabel> */}
                  <StatNumber ml={2}>{confirmedCount}</StatNumber>
                </Stat>
                </HStack>
              {/* </Flex> */}
            <Table mt={-5} variant="simple">
              <Thead>
                <Tr>
                  <Th>
                    <Input type="text" placeholder="Search" onChange={handleSearch} />
                  </Th>
                  <Th></Th>
                  <Th>
                    <Flex alignItems="center">
                      Active&nbsp;Orders{' '}
                      <Popover placement="bottom-end">
                        <PopoverTrigger>
                          <FontAwesomeIcon
                            icon={faChevronUp}
                            color="grey"
                          />
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverBody>
                            <VStack align="start" spacing={2}>
                              <RadioGroup colorScheme='gray' value={filterStatus} onChange={handleStatusToggle}>
                                <Stack direction='column'>
                                  {statusOptions.map((option) => (
                                    <Radio
                                      key={option.value}
                                      value={option.value}
                                      fontSize="sm"
                                      alignItems="center"
                                      lineHeight="1.2"
                                    >
                                      <Text>{option.label}</Text>
                                    </Radio>
                                  ))}
                                </Stack>
                              </RadioGroup>
                            </VStack>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Flex>
                  </Th>
                  <Th>
                    <Flex alignItems="center">
                      Amount{' '}
                      <FontAwesomeIcon
                        icon={sortOrder === 'asc' ? faChevronUp : faChevronDown}
                        size="sm"
                        color="gray"
                        onClick={sortOrders}
                      />
                    </Flex>
                  </Th>
                  <Th>
                    <Flex alignItems="center">
                      <Text mr={2}>Placed&nbsp;On</Text>
                      <FontAwesomeIcon
                        icon={sortOrder === 'asc' ? faChevronUp : faChevronDown}
                        size="sm"
                        color="gray"
                        onClick={sortOrdersPlacedon}
                      />
                    </Flex>
                  </Th>
                  <Th>
                    <Flex alignItems="center">
                      Options 
                      <FontAwesomeIcon 
                        size="sm"
                        icon={faCaretDown}
                        color="#9098A3"
                      />
                    </Flex>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredSearchOrders.map((order) => (
                  <Tr key={order.item}>
                    <Td>
                      <Flex alignItems="center" spacing={4}>
                        <FontAwesomeIcon icon={faCircle} size="sm" color="gray" />
                        <Image src={order.logo} alt={order.brand_name} ml={50} />
                        <VStack align="start" spacing={1} ml={3}>
                          <Text fontWeight="bold" color="black">
                            {order.brand_name}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            {order.brand_tagline}
                          </Text>
                        </VStack>
                      </Flex>
                    </Td>
                    <Td></Td>
                    <Td>{order.quantity}</Td>
                    <Td>{order.price}</Td>
                    <Td>{order.placed_on}</Td>
                    <Td>
                      <Th textAlign="center">
                        <FontAwesomeIcon 
                          icon={faEllipsis}
                          onClick={() => handleEditOrder(order)}
                          size={"lg"}
                        />
                      </Th>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Modal isOpen={!!editOrder} onClose={() => setEditOrder(null)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Order</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Brand Name</FormLabel>
                    <Input defaultValue={editOrder?.brand_name} onChange={(event) => setEditOrder({...editOrder, brand_name: event.target.value})} />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
                    Save
                  </Button>
                  <Button onClick={() => setEditOrder(null)}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            </VStack>
          </VStack>
        </Flex>
      </Grid>
    </Box>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyles />
      <Dashboard />
    </ChakraProvider>
  );
}

export default App;
