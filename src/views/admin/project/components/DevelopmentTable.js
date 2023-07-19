/* eslint-disable */
import {
    Flex,
    Progress,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Avatar,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalFooter,
    Box,
    Heading,
    Stack,
    List,
    ListItem,
    ListIcon,
    Badge,
    Button,
  } from "@chakra-ui/react";
  import { MdCheckCircle, MdSettings } from "react-icons/md";
  // Custom components
  import Card from "../../../../Components/card/Card";
  import { AndroidLogo, AppleLogo, WindowsLogo } from "../../../../Components/icons/Icons";
  import Menu from "../../../../Components/menu/MainMenu";
  import React, { useMemo } from "react";
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";
  
  export default function DevelopmentTable(props) {
    const { columnsData, tableData } = props;
  
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
  
    const tableInstance = useTable(
      {
        columns,
        data,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      initialState,
    } = tableInstance;
    initialState.pageSize = 11;

    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const iconColor = useColorModeValue("secondaryGray.500", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    return (
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}
        onClick={onOpen}
        >
        
        <Flex px='25px' justify='space-between' mb='20px' align='center'>
          <Text
            color={textColor}
            fontSize='22px'
            fontWeight='700'
            lineHeight='100%'>
            List Project
          </Text>
          <Menu />
        </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor={borderColor}
                    >
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color='gray.400'>
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "NAME") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "MEMBER") {
                      data = (
                        <Flex align='center'>
                          {cell.value.map((item, key) => {
                            if (item === "apple") {
                              return (
                                <Avatar w='20px' h='20px' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                              );
                            } else if (item === "android") {
                              return (
                                <Avatar w='20px' h='20px' name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                              );
                            } else if (item === "windows") {
                              return (
                                <Avatar w='20px' h='20px' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                              );
                            }
                          })}
                        </Flex>
                      );
                    } else if (cell.column.Header === "DATE") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "PROGRESS") {
                      data = (
                        <Flex align='center'>
                          <Text
                            me='10px'
                            color={textColor}
                            fontSize='sm'
                            fontWeight='700'>
                            {cell.value}%
                          </Text>
                          <Progress
                            variant='table'
                            colorScheme='brandScheme'
                            h='8px'
                            w='63px'
                            value={cell.value}
                          />
                        </Flex>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
            
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Project Information</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box>
                    <Flex gap='20px'>
                      <Heading size='xs' textTransform='uppercase'>
                       NAME
                     </Heading>
                     <Heading size='xs' >
                       UI/UX
                     </Heading>
                    </Flex>
                  </Box>
                 
                  <Box pt='2.5'>
                    <Heading size='xs' textTransform='uppercase'>
                      List Task
                    </Heading>
                    <List spacing={1} size='sm' fontSize='14px' padding='5px 0 0 0'>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                           Thiết kế giao diện
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                           Vẽ biểu đồ tương tác
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                           Code giao diện
                        </ListItem>
                    </List>
                  </Box>
                  
                  <Box pt='2.5'>
                    <Flex gap='140px'>
                      <Box>
                        <Heading size='xs' textTransform='uppercase'>
                          LEADER
                        </Heading>
                        <Flex gap='5px' padding='5px 0 0 0'>
                           <Avatar w='25px' h='25px' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                        </Flex>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase'>
                          MEMBER
                        </Heading>
                        <Flex gap='5px' marginTop='5px'>
                           <Avatar w='25px' h='25px' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                           <Avatar w='25px' h='25px' name='Dan Abrahmov' src='https://bit.ly/ryan-florence' />
                           <Avatar w='25px' h='25px' name='Dan Abrahmov' src='https://bit.ly/kent-c-dodds' />
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                 
                  <Box pt='2.5'>
                    <Flex gap='120px'>
                      <Box>
                         <Heading size='xs' textTransform='uppercase'>
                           End Date
                         </Heading>
                         <Text fontSize='sm'>
                            27/06/2023
                         </Text>
                         
                      </Box>
                       <Box>
                         <Heading size='xs' textTransform='uppercase'>
                           PROGRESS
                         </Heading>
                         <Flex align='center'>
                               <Text
                                 me='10px'
                                 color={textColor}
                                 fontSize='sm'
                                 fontWeight='700'>
                                 {75.5}%
                               </Text>
                               <Progress
                                 variant='table'
                                 colorScheme='brandScheme'
                                 h='8px'
                                 w='63px'
                                 value={75.5}
                               />
                        </Flex>
                      </Box>                      
                    </Flex>
                  </Box>
                 
                  <Box paddingTop='10px'>
                    <Heading size='xs' textTransform='uppercase'>
                      priority
                    </Heading>
                    <Badge variant='solid' colorScheme='green'>High</Badge>
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                    
                </ModalFooter>

            </ModalContent>
            </Modal>

      </Card>
    );
  }
  