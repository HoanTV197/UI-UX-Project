import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getCheckPoint, getTasks } from "../../../Redux/AppContext/actions";
import { LpTaskCard } from "./component/LpTaskCard";
import LpSideBar from "./component/LpSidebar"
export default function MyListTask(){
    const tasks = useSelector((store) => store.AppReducer.tasks);
    const checkPoints = useSelector((store) => store.AppReducer.checkPoint);
    const [checkedUserId, setCheckedUserId] = useState("");
    // const [searchParams] = useSearchParams();
    const [tagsInTheParams, setTagsInTheParams] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tags = params.getAll('tags');
        setTagsInTheParams(tags);
      }, []);
    const filterByParamTags = (task) => {
        // const tagsInTheParams = searchParams.getAll("tags");
        if (tagsInTheParams.includes("All") || tagsInTheParams.length === 0) {
            return task;
        }
        const data = task.tags.filter((elem) => {
            if (tagsInTheParams.includes(elem)) {
                return true;
            }
            return false;
        });
        if (data.length) {
            return task;
        }
        return false;
    };

    useEffect(() => {
        if (checkPoints.length === 0) {
            dispatch(getCheckPoint());
        }
    }, [dispatch, checkPoints.length]);


    useEffect(() => {
        checkPoints.length > 0 &&
            checkPoints.map((elem) => {
                if (elem.checkValidate === true) {
                    setCheckedUserId(elem.mailID);
                }
            });
    }, [checkPoints.length]);

    useEffect(() => {
        if (tasks.length === 0) {
            dispatch(getTasks());
        }
        tasks.length = 0;
    }, [dispatch, tasks, tasks.length]);


    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    return (
        <>
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Box >
                <LpSideBar/>
            </Box>
            <Flex
                direction={{
                    base: "column",
                    sm: "column",
                    md: "column",
                    lg: "row",
                    xl: "row",
                }}
                justifyContent="space-around"
            >
                {/* PENDING TASKS  */}
                <Box
                    width={{ base: "100%", sm: "100%", md: "100%", lg: "32%", xl: "32%" }}
                    height="auto"
                    border="1px solid rgba(0,0,0,0.3)"
                >
                    <Box backgroundColor="red.500">
                        <Text textAlign="center" fontWeight="bold">
                            To Do
                        </Text>
                    </Box>

                    {/* PROGRESSED TASKS  */}

                    <Box
                        display={{
                            base: "grid",
                            sm: "grid",
                            md: "grid",
                            lg: "flex",
                            xl: "flex",
                        }}
                        flexDirection="column"
                        gridTemplateColumns={{
                            base: "repeat(1, 1fr)",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(1, 1fr)",
                            xl: "repeat(1, 1fr)",
                        }}
                    >
                        {tasks.length > 0 &&
                            tasks
                                .filter(
                                    (item) =>
                                        item.task_status === "todo" && item.userID === localStorage.getItem("userEmail")
                                )
                                .filter(filterByParamTags)
                                .map((item) => {
                                    return (
                                        <LpTaskCard key={item.id} {...item} colorScheme="red" />
                                    );
                                })}
                    </Box>
                </Box>

                <Box
                    width={{ base: "100%", sm: "100%", md: "100%", lg: "32%", xl: "32%" }}
                    height="auto"
                    border="1px solid rgba(0,0,0,0.3)"
                >
                    <Box backgroundColor="yellow.500">
                        <Text textAlign="center" fontWeight="bold">
                            Doing
                        </Text>
                    </Box>
                    <Box
                        display={{
                            base: "grid",
                            sm: "grid",
                            md: "grid",
                            lg: "flex",
                            xl: "flex",
                        }}
                        flexDirection="column"
                        gridTemplateColumns={{
                            base: "repeat(1, 1fr)",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(1, 1fr)",
                            xl: "repeat(1, 1fr)",
                        }}
                    >
                        {tasks.length > 0 &&
                            tasks
                                .filter(
                                    (item) =>
                                        item.task_status === "progress" &&
                                        item.userID === localStorage.getItem("userEmail")
                                ) // && item.isValidate === true
                                .filter(filterByParamTags)
                                .map((item) => {
                                    return (
                                        <LpTaskCard key={item.id} {...item} colorScheme="yellow" />
                                    );
                                })}
                    </Box>
                </Box>

                {/* TASKS DONE  */}
                <Box
                    width={{ base: "100%", sm: "100%", md: "100%", lg: "32%", xl: "32%" }}
                    height="auto"
                    border="1px solid rgba(0,0,0,0.3)"
                >
                    <Box backgroundColor="teal.500">
                        <Text textAlign="center" fontWeight="bold">
                            Done
                        </Text>
                    </Box>
                    <Box
                        display={{
                            base: "grid",
                            sm: "grid",
                            md: "grid",
                            lg: "flex",
                            xl: "flex",
                        }}
                        flexDirection="column"
                        gridTemplateColumns={{
                            base: "repeat(1, 1fr)",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(1, 1fr)",
                            xl: "repeat(1, 1fr)",
                        }}
                    >
                        {tasks.length > 0 &&
                            tasks
                                .filter(
                                    (item) =>
                                        item.task_status === "done" && item.userID === localStorage.getItem("userEmail")
                                )
                                .filter(filterByParamTags)
                                .map((item) => {
                                    return (
                                        <LpTaskCard key={item.id} {...item} colorScheme="green" />
                                    );
                                })}
                    </Box>
                </Box>

                {/*OVERDUE*/}
                <Box
                    width={{ base: "100%", sm: "100%", md: "100%", lg: "32%", xl: "32%" }}
                    height="auto"
                    border="1px solid rgba(0,0,0,0.3)"
                >
                    <Box backgroundColor="teal.100">
                        <Text textAlign="center" fontWeight="bold">
                            Overdue
                        </Text>
                    </Box>
                    <Box
                        display={{
                            base: "grid",
                            sm: "grid",
                            md: "grid",
                            lg: "flex",
                            xl: "flex",
                        }}
                        flexDirection="column"
                        gridTemplateColumns={{
                            base: "repeat(1, 1fr)",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(1, 1fr)",
                            xl: "repeat(1, 1fr)",
                        }}
                    >
                        {tasks.length > 0 &&
                            tasks
                                .filter(
                                    (item) =>
                                        item.task_status === "overdue" && item.userID === localStorage.getItem("userEmail")
                                )
                                .filter(filterByParamTags)
                                .map((item) => {
                                    return (
                                        <LpTaskCard key={item.id} {...item} colorScheme="green" />
                                    );
                                })}
                    </Box>
                </Box>
            </Flex>
        </Box>      
        </>
    )
}