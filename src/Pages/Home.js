import { useState } from 'react';
import { ChakraProvider, Box, Grid, GridItem, Image, Text, Select, Table, Thead, Tbody, Tr, Th, Td, Button, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';
import data from './data.json';
import Sidebar from './components/Sidebar';

function Dashboard() {
    const [orders, setOrders] = useState(data);
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortProperty, setSortProperty] = useState('placed_on');
    const [sortOrder, setSortOrder] = useState('asc');
    const [editOrder, setEditOrder] = useState(null);
  
    const filteredOrders = filterStatus === 'All' ? orders : orders.filter(order => order.status === filterStatus);
  
    const sortOrders = () => {
      const sorted = [...filteredOrders].sort((a, b) => {
        const aValue = a[sortProperty];
        const bValue = b[sortProperty];
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      setOrders(sorted);
    };
  
    const handleEditOrder = (order) => {
      setEditOrder(order);
    };
  
    const handleSaveEdit = () => {
      // Save the edited order
      setEditOrder(null);
    };
  
    return (
      <Box p={4}>
        <Grid templateColumns="230px 1fr" gap={4} alignItems="center">
          <Sidebar />
          <Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} alignItems="center">
              <Box>
                <Image src="/path/to/logo.png" alt="Logo" boxSize={8} mr={2} />
                <Text fontWeight="bold">Brand Name</Text>
              </Box>
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </Select>
            </Grid>
            <Table mt={4} variant="simple">
              <Thead>
                <Tr>
                  <Th>Logo</Th>
                  <Th>Brand Name</Th>
                  <Th>Status</Th>
                  <Th>Item</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
                  <Th>Placed On</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredOrders.map((order) => (
                  <Tr key={order.item}>
                    <Td><Image src={order.logo} alt={order.brand_name} boxSize={8} /></Td>
                    <Td>{order.brand_name}</Td>
                    <Td>{order.status}</Td>
                    <Td>{order.item}</Td>
                    <Td>{order.quantity}</Td>
                    <Td>{order.price}</Td>
                    <Td>{order.placed_on}</Td>
                    <Td>
                      <IconButton
                        icon={<i className="fa fa-ellipsis-v" />}
                        variant="ghost"
                        onClick={() => handleEditOrder(order)}
                      />
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
                    <Input defaultValue={editOrder?.brand_name} />
                  </FormControl>
                  {/* Add more fields for editing */}
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
                    Save
                  </Button>
                  <Button onClick={() => setEditOrder(null)}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Grid>
      </Box>
    );
  }
  export default Dashboard;