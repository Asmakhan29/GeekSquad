import { Box, Button, Container, Grid, Rating, Textarea, Title, rem } from '@mantine/core';
import { IconMoodConfuzed, IconMoodConfuzedFilled, IconMoodEmpty, IconMoodEmptyFilled, IconMoodHappy, IconMoodHappyFilled, IconMoodSad, IconMoodSadFilled, IconMoodSmile, IconMoodSmileFilled } from '@tabler/icons-react';
import { enqueueSnackbar } from 'notistack';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const getIconStyle = (color) => ({
    width: rem(100),
    height: rem(100),
    color: color ? `var(--mantine-color-${color}-7)` : undefined,
});

const getEmptyIcon = (value) => {
    const iconStyle = getIconStyle();

    switch (value) {
        case 1:
            return <IconMoodSad stroke={1.5} style={iconStyle} />;
        case 2:
            return <IconMoodConfuzed stroke={1.5} style={iconStyle} />;
        case 3:
            return <IconMoodEmpty stroke={1.5} style={iconStyle} />;
        case 4:
            return <IconMoodSmile stroke={1.5} style={iconStyle} />;
        case 5:
            return <IconMoodHappy stroke={1.5} style={iconStyle} />;
        default:
            return null;
    }
};

const getFullIcon = (value) => {
    switch (value) {
        case 1:
            return <IconMoodSadFilled stroke={1.5} style={getIconStyle('red')} />;
        case 2:
            return <IconMoodConfuzedFilled stroke={1.5} style={getIconStyle('orange')} />;
        case 3:
            return <IconMoodEmptyFilled stroke={1.5} style={getIconStyle('yellow')} />;
        case 4:
            return <IconMoodSmileFilled stroke={1.5} style={getIconStyle('lime')} />;
        case 5:
            return <IconMoodHappyFilled stroke={1.5} style={getIconStyle('green')} />;
        default:
            return null;
    }
};

const Feedback = () => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem('user'))
    );

    const reviewRef = useRef();
    const [rating, setRating] = useState(5);
    const navigate = useNavigate();

    const submitReview = async () => {
        if (reviewRef.current.value === "") {
            enqueueSnackbar("Please enter a review", { variant: 'error' });
            return;
        } else {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/feedback/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    feedback: reviewRef.current.value,
                    rating: rating,
                    userId: currentUser._id
                }),
            });
            if (response.status === 200) {
                enqueueSnackbar("Feedback submitted successfully", { variant: 'success' });
                navigate('/home');
            } else {
                enqueueSnackbar("Failed to submit feedback", { variant: 'error' });
            }
        }
    }

    return (
        <Box>
            <Container size="lg">

                <Grid gutter={30}>
                    <Grid.Col span={{ sm: 12, md: 5 }}>
                        <img src='https://cdni.iconscout.com/illustration/premium/thumb/user-feedback-2725345-2261057.png' alt="Feedback" />
                    </Grid.Col>
                    <Grid.Col span={{ sm: 12, md: 7 }}>

                        <Title order={1} align="center" mt="xl">Feedback</Title>
                        <Rating mx="auto"
                            my={40}
                            defaultValue={5}
                            emptySymbol={getEmptyIcon}
                            fullSymbol={getFullIcon}
                            onChange={v => setRating(v)}
                            highlightSelectedOnly
                        />
                        <Textarea
                            withAsterisk
                            width="100%"
                            rows={5}
                            ref={reviewRef}
                            label="Feedback"
                            placeholder="Enter Feedback here"
                        />

                        <Button onClick={submitReview} color="blue" size="lg" fullWidth mt="xl">Submit</Button>


                    </Grid.Col>
                </Grid>
            </Container>
        </Box>
    )
}

export default Feedback