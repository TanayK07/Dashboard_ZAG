import React, { useState } from 'react';
import { MinusIcon } from '@chakra-ui/icons';
import { VStack } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import { Stat, StatNumber } from "@chakra-ui/react";
import RenderOrders from './Orders';
import {
  Button,
  Flex,
  Box,
  Grid,
  Text,
  HStack
} from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import data from '../data.json';

function Dashboard() {
  // State hooks for managing data and UI state
  const [orders, ] = useState(data);
  const [filterStatus, ] = useState('All');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Filtering the orders based on the selected status
  const filteredOrders = filterStatus === 'All' ? orders : orders.filter(order => order.status === filterStatus);

  // Filtering the orders with the selected status for displaying in the header
  const filteredStatusOrders = filteredOrders.filter((order) => order.status === filterStatus);

  // Counting the number of confirmed orders
  const confirmedCount = filteredStatusOrders.filter((order) => order.status === "Confirmed").length;

  // Function to handle toggle collapse/expand of orders
  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box p={4}>
      <Grid templateColumns="230 1fr" gap={4} alignItems="flex-start">
        {/* Sidebar component */}
        <Sidebar />
        <Flex ml="230" justifyContent="space-between">
          <VStack spacing={4} align="start">
            {/* Orders section header */}
            <HStack justifyContent="space-between" width="100%">
              <Text fontSize="2xl" fontWeight="bold">Orders</Text>
              <Button bgColor={"#1B59F8"} color="white" leftIcon={<AddIcon />} variant="solid" >
                Add Orders
              </Button>
            </HStack>

            <VStack align="start" spacing={6}>
              {/* Confirmed orders section */}
              <HStack justifyContent="space-between" width="100%">
                <HStack>
                  <Text fontWeight="bold" fontSize="1.0625rem" ml={9}>
                    Confirmed
                  </Text>
                  {/* Displaying the count of confirmed orders */}
                  <Stat>
                    <StatNumber fontSize="1.0625rem" color="rgba(47, 47, 47, 0.4)" ml={1}>
                      {confirmedCount}
                    </StatNumber>
                  </Stat>
                </HStack>
                {/* Collapse/Expand icon */}
                <MinusIcon
                  aria-label="Decrease quantity"
                  icon={<MinusIcon />}
                  size="sm"
                  onClick={handleCollapseToggle}
                  mr={5}
                />
              </HStack>
              {/* Rendering the orders component */}
              {isCollapsed ? null : <RenderOrders />}
          
          </VStack>
          </VStack>

        </Flex>
      </Grid>
    </Box>
  );
}

export default Dashboard;
