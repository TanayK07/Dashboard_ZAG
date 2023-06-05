import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faCaretDown, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import {
  Stack,
  Button,
  Flex,
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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  RadioGroup,
  VStack,
  Radio,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import data from '../data.json';

function RenderOrders() {
  const [orders, setOrders] = useState(data);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editOrder, setEditOrder] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editOrderIndex, setEditOrderIndex] = useState(null);
  const filteredOrders = filterStatus === 'All' ? orders : orders.filter((order) => order.status === filterStatus);

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

  const filteredStatusOrders = filteredOrders.filter((order) => order.status === filterStatus);
  const confirmedCount = filteredStatusOrders.filter((order) => order.status === 'Confirmed').length;

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
    const index = filteredOrders.findIndex((o) => o.item === order.item);
    setEditOrder(order);
    setEditOrderIndex(index);
  };

  const handleSaveEdit = () => {
    const updatedOrders = orders.map((order, index) => {
      if (index === editOrderIndex) {
        return {
          ...order,
          brand_name: editOrder.brand_name,
        };
      }
      return order;
    });

    setOrders(updatedOrders);
    setEditOrder(null);
    setEditOrderIndex(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSearchOrders = filteredOrders.filter((order) => {
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
    <>
      <Table mt={-5} variant="simple">
        <Thead>
          <Tr>
            <Th>
              <HStack alignItems="center">
                <SearchIcon boxSize={5} color="gray.500" />
                <Input type="text" placeholder="Search" onChange={handleSearch} />
              </HStack>
            </Th>
            <Th></Th>
            <Th justifyContent="flex-end">
              <Flex alignItems="center" justifyContent="flex-end">
                Active&nbsp;Orders{' '}
                <Popover placement="bottom-end">
                  <PopoverTrigger>
                    <FontAwesomeIcon icon={faChevronUp} color="grey" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverBody>
                      <VStack align="start" spacing={2}>
                        <RadioGroup colorScheme="gray" value={filterStatus} onChange={handleStatusToggle}>
                          <Stack direction="column">
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
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    fontSize: '0.875rem',
                                    lineHeight: '1.0625rem',
                                    letterSpacing: '-0.154px',
                                    color: '#000000',
                                    textTransform: 'capitalize',
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
                <FontAwesomeIcon size="sm" icon={faCaretDown} color="#9098A3" />
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredSearchOrders.map((order) => (
            <Tr key={order.item}>
              <Td>
                <Flex alignItems="center" spacing={4}>
                  <FontAwesomeIcon icon={farCircle} size="sm" color="gray" />
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
              <Td textAlign="right">{order.quantity}</Td>
              <Td textAlign="right">{order.price}</Td>
              <Td textAlign="right">{order.placed_on}</Td>
              <Td>
                <Th textAlign="center">
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    onClick={() => handleEditOrder(order)}
                    size={'lg'}
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
              <Input
                defaultValue={editOrder?.brand_name}
                onChange={(event) =>
                  setEditOrder({ ...editOrder, brand_name: event.target.value })
                }
              />
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
    </>
  );
}

export default RenderOrders;
