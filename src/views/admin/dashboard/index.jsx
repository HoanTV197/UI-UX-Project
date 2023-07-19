// Chakra imports
import {
    Avatar,
    Box,
    Flex,
    FormLabel,
    Icon,
    Select,
    SimpleGrid,
    useColorModeValue,
  } from "@chakra-ui/react";
  // Custom components
  import MiniCalendar from "../../../Components/calendar/MiniCalendar";
  import MiniStatistics from "../../../Components/card/MiniStatistics";
  import IconBox from "../../../Components/icons/IconBox";
  import React from "react";
  import {
    MdAddTask,
    MdClear,
    MdDone,
    MdWarning,
  } from "react-icons/md";
  import DailyTraffic from "../dashboard/components/DailyTraffic"
  import PieCard from "../dashboard/components/PieCard"
  import CheckTable from "../dashboard/components/CheckTable";
  import ComplexTable from "../dashboard/components/ComplexTable";
  import Tasks from "../dashboard/components/Tasks";
  import {
    columnsDataCheck,
    columnsDataComplex,
  } from "./variables/columnsData";
  import tableDataCheck from "./variables/tableDataCheck.json";
  import tableDataComplex from "./variables/tableDataComplex.json";
  export default function UserReports() {
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4, "2xl": 6 }}
          gap='20px'
          mb='20px'>
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={
                  <Icon w='32px' h='32px' as={MdDone} color={brandColor} />
                }
              />
            }
            name='Completed Task'
            value='50'
          />
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={
                  <Icon w='32px' h='32px' as={MdWarning} color={brandColor} />
                }
              />
            }
            name='Incompleted Task'
            value='100'
          />
          <MiniStatistics
            startContent={
                <IconBox
                  w='56px'
                  h='56px'
                  bg={boxBg}
                  icon={
                    <Icon w='32px' h='32px' as={MdClear} color={brandColor} />
                  }
                />
              }
            name='Overdue Task'
            value='200'
          />
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
              />
            }
            name='Total Task'
            value='154'
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
      </Box>
    );
  }
  