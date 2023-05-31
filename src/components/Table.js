import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faChevronUp, faChevronDown, faCaretDown, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Image, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const OrderTable = ({ orders, sortOrder, sortOrders, handleEditOrder }) => {
  return (
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
  );
};

export default OrderTable;
