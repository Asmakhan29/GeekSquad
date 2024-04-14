import { ActionIcon, Flex, Group, Paper, Text, TextInput, rem } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { io } from "socket.io-client";
import ReactTimeAgo from 'react-time-ago'

const ChatPage = () => {
    const hasConnected = useRef(false);

    const messageRef = useRef(null);

    const [messageList, setMessageList] = useState([]);

    const socket = useMemo(() => io("http://localhost:5000"), []);
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("tutor"))
    );

    useEffect(() => {
        if (!hasConnected.current) {
            socket.emit("connect-user", currentUser._id);
            hasConnected.current = true;
        }
    }, [])
    socket.on("rec-message", ({ senderData, message, date }) => {
        console.log({ senderData, message, date });
        setMessageList([...messageList, { senderData, message, sent: false, date }]);
    })

    const sendMessage = () => {
        console.log(messageList);
        socket.emit("send-message", {
            message: messageRef.current.value,
            senderData: currentUser,
            date: new Date()
        });
        setMessageList([...messageList, { senderData: currentUser, message: messageRef.current.value, sent: true, date: new Date() }]);
        messageRef.current.value = '';
    }





    return (
        <Paper h={'90vh'} >
            <Flex direction={'column'} justify={'end'} h={'85vh'} style={{overflowY: 'scroll'}}>
                {
                    messageList.map((message, index) => (
                        <>
                            <div key={index} className={`message ${message.sent ? 'sent-msg' : 'rec-msg'}`} >
                                <Text fw={'bold'} c={'dimmed'} size='sm'>{message.senderData.name}</Text>
                                <p className='inner-text'>{message.message}</p>
                                <Text c={'dimmed'} size='sm'>
                                    <ReactTimeAgo date={new Date(message.date)} locale="en-US" />
                                </Text>
                            </div>
                        </>
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