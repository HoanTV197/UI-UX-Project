// Chakra imports
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Checkbox,
} from "@chakra-ui/react";
// Custom components
import Card from "../../../../Components/card/Card";
import Menu from "../../../../Components/menu/MainMenu";
import IconBox from "../../../../Components/icons/IconBox";

// Assets
import { MdCheckBox, MdDragIndicator } from "react-icons/md";
import React from "react";

export default function Conversion(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
  const brandColor = useColorModeValue("brand.500", "brand.400");
  return (
    <Card p='20px' align='center' direction='column' w='100%' {...rest}>
      <Flex alignItems='center' w='100%' mb='30px'>
        <IconBox
          me='12px'
          w='38px'
          h='38px'
          bg={boxBg}
          icon={<Icon as={MdCheckBox} color={brandColor} w='24px' h='24px' />}
        />

        <Text color={textColor} fontSize='lg' fontWeight='700'>
          Tasks
        </Text>
        <Menu ms='auto' />
      </Flex>
      <Box px='11px'>
        <Flex mb='20px'>
          <Checkbox me='16px' colorScheme='brandScheme' />
          <Text
            fontWeight='bold'
            color={textColor}
            fontSize='md'
            textAlign='start'>
            Bài Tập UI/UX
          </Text>
          <Icon
            ms='auto'
            as={MdDragIndicator}
            color='secondaryGray.600'
            w='24px'
            h='24px'
          />
        </Flex>
        <Flex mb='20px'>
          <Checkbox me='16px' defaultChecked colorScheme='brandScheme' />
          <Text
            fontWeight='bold'
            color={textColor}
            fontSize='md'
            textAlign='start'>
            Dự Án Công Ty
          </Text>
          <Icon
            ms='auto'
            as={MdDragIndicator}
            color='secondaryGray.600'
            w='24px'
            h='24px'
          />
        </Flex>
        <Flex mb='20px'>
          <Checkbox defaultChecked me='16px' colorScheme='brandScheme' />
          <Text
            fontWeight='bold'
            color={textColor}
            fontSize='md'
            textAlign='start'>
             Dự Án Mobile App 
          </Text>
          <Icon
            ms='auto'
            as={MdDragIndicator}
            color='secondaryGray.600'
            w='24px'
            h='24px'
          />
        </Flex>
        <Flex mb='20px'>
          <Checkbox me='16px' colorScheme='brandScheme' />
          <Text
            fontWeight='bold'
            color={textColor}
            fontSize='md'
            textAlign='start'>
            Memory Solution
          </Text>
          <Icon
            ms='auto'
            as={MdDragIndicator}
            color='secondaryGray.600'
            w='24px'
            h='24px'
          />
        </Flex>
        <Flex mb='20px'>
          <Checkbox defaultChecked me='16px' colorScheme='brandScheme' />
          <Text
            fontWeight='bold'
            color={textColor}
            fontSize='md'
            textAlign='start'>
            Thiết Kế Độc Quyền
          </Text>
          <Icon
            ms='auto'
            as={MdDragIndicator}
            color='secondaryGray.600'
            w='24px'
            h='24px'
          />
        </Flex>
      </Box>
    </Card>
  );
}
