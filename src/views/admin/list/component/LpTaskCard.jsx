import {
    Badge,
    Box,
    Flex,
    Text,
    Stack,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalFooter,
    Select,
    useToast,
    FormControl,
    FormLabel,
    Input,
    useDisclosure
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTasks, getTasks,updateTasks } from "../../../../Redux/AppContext/actions";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const LpTaskCard = ({ id, title, description,task_status, tags, Date, colorScheme }) => {

    const dispatch = useDispatch();
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const deleteTaskHandler = (id) => {
        dispatch(deleteTasks(id))
            .then(() => toast({
                title: 'Task deleted !',
                description: "We've deleted your task.",
                status: 'success',
                duration: 1500,
                position: "top",
                isClosable: true,
            }))
            .then(() => dispatch(getTasks()));
    };

    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDescription, setTaskDescription] = useState(description);
    const [taskStatus, setTaskStatus] = useState(task_status);
    const [taskTags, setTaskTags] = useState(tags);
    const [taskDate,setTaskDate] = useState(Date)

    const updateFunc = ()=>{
        dispatch(
            updateTasks(id, {
              title: taskTitle,
              description: taskDescription,
              Date: taskDate,
              tags :taskTags,
              task_status: taskStatus,
            })
          ).then(() => dispatch(getTasks()));

    }
    return (
        <Box
            width={{ base: "80%", sm: "90%", md: "90%", lg: "90%", xl: "90%" }}
            margin="auto"
            marginTop="3%"
            marginBottom="3%"
            borderRadius='lg'
            padding="5%"
            backgroundColor="white"
            boxShadow="rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
        >
            <Box>
                <Flex>
                    <Text mt='1'
                         fontWeight='semibold'
                         fontSize="20px"
                         as='h4'
                         lineHeight='tight'
                         noOfLines={1}>{title}
                    </Text>
                </Flex>
            </Box>
            <Box>
                <Stack
                    direction={{ base: "column", sm: "column", md: "column", lg: "row", xl: "row" }}
                    width="fit-content"
                >
                    <Badge fontWeight='bold' fontSize="12px" colorScheme={colorScheme}>{tags}</Badge>
                </Stack>
            </Box>
            <Box>
                <Flex>
                    <Text
                        fontWeight="500"
                        marginTop="3%"
                        marginBottom="3%"
                    >{description}</Text>
                </Flex>
            </Box>
            <Box>
                <Flex>
                    <Text
                        fontWeight="500"
                        marginTop="3%"
                        marginBottom="3%"
                    >{Date}
                    </Text>

                </Flex>
            </Box>
            <Box>
                <Flex
                    padding="4%"
                    paddingTop="7%"
                    justifyContent="space-between">
                    <Box color="blue">
                        <EditIcon onClick={onOpen} fontSize="100%" cursor="pointer" />
                    </Box>
                    <Box color="red">
                        <DeleteIcon fontSize="100%" onClick={() => deleteTaskHandler(id)} cursor="pointer" />
                    </Box>
                </Flex>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    {/* title  */}

                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            placeholder="Enter Title"
                            value={taskTitle}
                            onChange={(e)=>{ setTaskTitle(e.target.value)}}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                            <Input
                                placeholder="Enter description"
                                value={taskDescription}
                                onChange={(e)=>{ setTaskDescription(e.target.value)}}
                                // onChange={(e) => setTaskState({ type: 'description', payload: e.target.value })}
                            />
                    </FormControl>
                    <FormControl mt={4}>
                       <FormLabel>End Date</FormLabel>
                       <Input
                         name="start-date"
                         type="date"
                         value={taskDate}
                         onChange={(e)=>{ setTaskDate(e.target.value)}}
                        //  onChange={(e) => setTaskState({ type: 'Date', payload: e.target.value })}
                        />
                    </FormControl>

                    {/* Task Status  */}

                    <Box mb="0.5rem">
                        <FormLabel>Task Status</FormLabel>
                        <Select
                            placeholder="Select Status"
                            value={taskStatus}
                            onChange={(e)=>{ setTaskStatus(e.target.value)}}
                            // onChange={(e) => setTaskState({ type: 'task_status', payload: e.target.value })}
                        >
                            <option value="todo">Todo</option>
                            <option value="progress">In-Progress</option>
                            <option value="done">Done</option>
                        </Select>
                    </Box>

                    {/* Tags  */}

                    <Box mb="0.5rem">
                        <FormLabel>Select Tags</FormLabel>
                        <Select
                            placeholder="Select Tags"
                            value={taskTags}
                            onChange={(e)=>{ setTaskTags(e.target.value)}}
                            // onChange={(e) => setTaskState({ type: 'tags', payload: e.target.value })}
                        >
                            <option value="Personal">Personal</option>
                            <option value="Teams">Teams</option>
                        </Select>
                    </Box>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={updateFunc}>Update Task</Button>
                </ModalFooter>

            </ModalContent>
            </Modal>

            
        </Box>
    );
};

export { LpTaskCard };
