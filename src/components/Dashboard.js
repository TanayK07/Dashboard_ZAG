import React, { useState } from 'react';
import { MinusIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, RadioGroup, VStack, Radio } from "@chakra-ui/react";
import { faChevronUp, faChevronDown, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { Stat, StatNumber } from "@chakra-ui/react";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import {
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
    HStack
} from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import data from '../data.json';
function Dashboard() {
    const [orders, setOrders] = useState(data);
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortOrder, setSortOrder] = useState('asc');
    const [editOrder, setEditOrder] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false); 
  
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
  
    const handleCollapseToggle = () => {
      setIsCollapsed(!isCollapsed);
    };
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
      { label: "Confirmed", value: 'Confirmed' },
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
                <Button bgColor={"#1B59F8"}  color="white"   leftIcon={<AddIcon />} variant="solid" ml="auto">Add Orders</Button>
              </HStack>
              <VStack align="start" spacing={6}>
                <HStack justifyContent="space-between" width="100%">
                <HStack>
                {/* <Flex justifyContent="space-between" width="100%"> */}
                <Text fontWeight="bold" fontSize="1.0625rem" ml={9}>
    Confirmed
  </Text>
                  <Stat>
                    {/* <StatLabel>Status</StatLabel> */}
                    <StatNumber fontSize="1.0625rem" color="rgba(47, 47, 47, 0.4)" ml={1}>{confirmedCount}</StatNumber>
                  </Stat>
                  </HStack>
                  <MinusIcon
    aria-label="Decrease quantity"
    icon={<MinusIcon />}
    size="sm"
    onClick={handleCollapseToggle} 
  
    mr={5}
  />
                  </HStack>
                {/* </Flex> */}
              <Table mt={-5} variant="simple">
                <Thead>
                  <Tr>
                    <Th>
                    <HStack alignItems="center">
                          <SearchIcon boxSize={5} color="gray.500" />
                          <Input type="text" placeholder="Search" onChange={handleSearch} />
                        </HStack>                  </Th>
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
  <Text 
    style={{ 
      fontFamily: 'Lato', 
      fontStyle: 'normal',
  
      fontWeight: 400, 
      fontSize: '0.875rem', 
      lineHeight: '1.0625rem', 
      letterSpacing: '-0.154px', 
      color: '#000000',
      textTransform: 'capitalize' 
  
    }}
  >
    {option.label}
  </Text>       
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
  export default Dashboard;