// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "../../../Components/separator/Separator";
import DefaultAuth from "../../../layouts/auth/Default"
// // Assets
import illustration from "../../../assets/img/auth/auth.png"

import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Loginfunction } from "../../../Redux/AuthContext/actions";

import { saveData } from "../../../Utils/localStorageData";

import { useReducer } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

const userIsValidateInitialState = {
  mailID: "",
  checkValidate: true,
};

const userIsvalidateReducer = (state, action) => {
  switch (action.type) {
    case "mailID":
      return {
        ...state,
        mailID: action.payload,
      };
    case "checkValidate":
      return {
        ...state,
        checkValidate: action.payload,
      };
    default:
      return state;
  }
};

 function Login() {
   // Chakra color mode
   const textColor = useColorModeValue("navy.700", "white");
   const textColorSecondary = "gray.400";
   const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
   const textColorBrand = useColorModeValue("brand.500", "white");
   const brandStars = useColorModeValue("brand.500", "brand.400");
   const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
   const googleText = useColorModeValue("navy.700", "white");
   const googleHover = useColorModeValue(
     { bg: "gray.200" },
     { bg: "whiteAlpha.300" }
   );
   const googleActive = useColorModeValue(
     { bg: "secondaryGray.300" },
     { bg: "whiteAlpha.200" }
   );
   const [show, setShow] = React.useState(false);
   const handleClick = () => setShow(!show);


  const [userValidateState, setUserValidateState] = useReducer(
    userIsvalidateReducer,
    userIsValidateInitialState
  );
  const [showPassword, setShowPassword] = useState(false);
  const [userObj, setUserObj] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth } = useSelector((state) => {
    return {
      isAuth: state.AuthReducer.isAuth,
    };
  });
  // console.log(isAuth);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const history = useHistory();

  useEffect(() => {
    if (isAuth) {
      const redirectTimeout = setTimeout(() => {
        history.push("/admin/dashboard");
      }, 1500);
  
      return () => clearTimeout(redirectTimeout); // Xóa timeout nếu component bị unmount trước khi timeout kết thúc
    }
  }, [isAuth, history]);

  // useEffect(() => {
  //   if (isAuth) {
  //     setTimeout(() => {
  //       Redirect("/mytask/dashboard");
  //     }, 1500);
  //   }
  // }, [isAuth]);

  useEffect(() => {
    axios
      .get("https://6398b39329930e2bb3bf7dcf.mockapi.io/users")
      .then((response) => {
        setUserObj(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const SendSignInRequest = () => {
    let checkEmail = userObj.filter((el)=>{
       return el.userEmail === email;
    })
    if(checkEmail.length > 0){
       let checkPassword = userObj.filter((el)=>{
        return el.userEmail === email && el.password === password;
       })
       if(checkPassword.length > 0){
         let check = userObj.filter((el)=>{
           return el.userEmail === email && el.password === password;
         })
        if (check.length > 0) {
            saveData("loggedUser", { ...check[0], password });
            // addCheckPointHandler();
            dispatch(
              Loginfunction({
                ...check[0],
              })
            );
          localStorage.setItem("userEmail", email);
       }
    }
    setEmail("");
    setPassword("");
    };
  }
  return (
    <>
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Sign In
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='16px'
            bg={googleBg}
            color={googleText}
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}>
            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
            Sign in with Google
          </Button>
          <Flex align='center' mb='25px'>
            <HSeparator />
            <Text color='gray.400' mx='14px'>
              or
            </Text>
            <HSeparator />
          </Flex>
          <FormControl>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='mail@simmmple.com'
              mb='24px'
              fontWeight='500'
              size='lg'
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'
              
              >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                fontSize='sm'
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  me='10px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to='/auth/forgot-password'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              onClick={SendSignInRequest}
              >
              Sign In
            </Button>
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Not registered yet?
              <NavLink to='/auth/sign-up'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>     
    </>
  );
}
export default Login;
