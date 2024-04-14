import { ActionIcon, Flex, Group, Paper, TextInput, rem } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { io } from "socket.io-client";

const ChatPage = () => {
    const hasConnected = useRef(false);

    const messageRef = useRef(null);

    const [messageList, setMessageList] = useState([]);

    const socket = useMemo(() => io("http://localhost:5000"), []);
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) | JSON.parse(localStorage.getItem("tutor"))
    )

    useEffect(() => {
        // if (!hasConnected.current) {
        //     socket.emit("connect-user", currentUser._id);
        //     hasConnected.current = true;
        // }
    }, [])
    socket.on("rec-message", ({ senderData, message }) => {
        console.log({ senderData, message });
        setMessageList([...messageList, { senderData, message, sent: false }]);
    })

    const sendMessage = () => {
        console.log(messageList);
        socket.emit("send-message", {
            message: messageRef.current.value,
            senderData: currentUser
        });
        setMessageList([...messageList, { senderData: currentUser, message: messageRef.current.value, sent: true }]);
        messageRef.current.value = '';
    }

    
     


    return (
        <Paper h={'90vh'} >
            <Flex direction={'column'} justify={'end'} mah={'85vh'}>
                {
                    messageList.map((message, index) => (
                        <div key={index} className={`message ${message.sent? 'sent-msg' : 'rec-msg' }`}>
                            <p>{message.message}</p>
                        </div>
                    ))
                }
            </Flex>
            <TextInput
            ref={messageRef}
                mt={'auto'}
                radius="xl"
                size="md"
                placeholder="Search questions"
                rightSectionWidth={42}
                rightSection={
                    <ActionIcon onClick={sendMessage} size={32} radius="xl" color='blue' variant="filled">
                        <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                }
            />
        </Paper>
    )
}

export default ChatPage;