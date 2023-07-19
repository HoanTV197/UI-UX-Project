import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Text,Box } from "@chakra-ui/react";

// Custom components
// import { HorizonLogo } from "components/icons/Icons";
// import { HSeparator } from "components/separator/Separator";
import {HorizonLogo, SlackLogo} from "../../icons/Icons"
import {HSeparator} from "../../separator/Separator"

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <SlackLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      {/* <Text fontSize='3xl'>Manage Task</Text> */}
      <Box h='26px' w='175px' my='32px' color={logoColor}>
         <Text fontSize='28px' fontWeight='500'> Alien App </Text>
      </Box>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
