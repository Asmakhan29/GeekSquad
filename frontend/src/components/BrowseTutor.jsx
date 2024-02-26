import { ActionIcon, Button, Card, Checkbox, Container, Divider, Grid, Input, RangeSlider, Stack, TextInput, Title, rem } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import TutorCard from './TutorCard';
import { IconSearch } from '@tabler/icons-react';
import { IconArrowRight } from '@tabler/icons-react';

const curriculamOptions = [
    'CBSE',
    'ICSE',
    'CAMBINT',
    'IB',
    'IGCSE',
    'State Board - AP/TS',
    'State Board - KA',
    'State Board - MH',
    'State Board - TN',
    'State Board - UP',
    'Others'
];

const levelOptions = [
    'Pre-Primary',
    'Grades 1-5',
    'Grades 6-10',
    'Grades 11-12',
    'UG',
    'PG & Above'
]

const BrowseTutor = () => {

    const [tutorList, setTutorList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [masterList, setMasterList] = useState([]);

    const fetchTutors = async () => {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tutor/getall`);
        const data = await response.json();
        console.log(data);
        setTutorList(data);
        setMasterList(data);
        setLoading(false);
    }

    useEffect(() => {
        // fetchTutors();
    }, [])

    const displayTutors = () => {

    }

    return (
        <div>
            <div style={{ backgroundColor: '#444' }}>

                <Container size="md" my={20} py={50}>
                    <Title order={1} align="center" mb={20}>Find a Tutor</Title>
                    <TextInput
                        radius="xl"
                        size="md"
                        placeholder="Search questions"
                        rightSectionWidth={42}
                        leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                        rightSection={
                            <ActionIcon size={32} radius="xl" color='blue' variant="filled">
                                <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                            </ActionIcon>
                        }
                    />
                </Container>
            </div>
            <Container size="xl" my={20}>

                <Grid>
                    <Grid.Col span={{ md: 3 }}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Title order={4} mt={10} mb={5}>Location</Title>
                            <Checkbox
                                defaultChecked
                                label="Online"
                            />
                            <Divider my={10} />
                            <Input mb={10} label="City" placeholder="Enter your Address" />
                            <Stack>
                                <Checkbox
                                    defaultChecked
                                    label="Teacher's Studio"
                                />
                                <Checkbox
                                    defaultChecked
                                    label="Student's Home"
                                />
                            </Stack>
                            <Title order={4} my={10}>Availability</Title>
                            <ActionIcon.Group w={'100%'} mb={10}>
                                <ActionIcon w={'100%'} variant="default" size="lg" aria-label="Sunday">
                                    S
                                </ActionIcon>
                                <ActionIcon w={'100%'} variant="default" size="lg" aria-label="Monday">
                                    M
                                </ActionIcon>

                                <ActionIcon w={'100%'} variant="filled" size="lg" aria-label="Tuesday">
                                    T
                                </ActionIcon>

                                <ActionIcon w={'100%'} variant="default" size="lg" aria-label="Wednesday">
                                    W
                                </ActionIcon>

                                <ActionIcon w={'100%'} variant="filled" size="lg" aria-label="Thursday">
                                    T
                                </ActionIcon>

                                <ActionIcon w={'100%'} variant="default" size="lg" aria-label="Friday">
                                    F
                                </ActionIcon>

                                <ActionIcon w={'100%'} variant="default" size="lg" aria-label="Saturday">
                                    S
                                </ActionIcon>
                            </ActionIcon.Group>
                            <Button.Group w={'100%'} mb={10}>
                                <Button w={'100%'} variant="default">6AM - 9AM</Button>
                                <Button w={'100%'} variant="default">9AM - 12PM</Button>
                            </Button.Group>
                            <Button.Group w={'100%'} mb={10}>
                                <Button w={'100%'} variant="default">12PM - 3PM</Button>
                                <Button w={'100%'} variant="default">3PM - 6PM</Button>
                            </Button.Group>

                            <Button.Group w={'100%'} mb={10}>
                                <Button w={'100%'} variant="default">6PM - 9PM</Button>
                                <Button w={'100%'} variant="default">9PM -12AM</Button>
                            </Button.Group>

                            <p>Times are shown in your local timezone (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
                            </p>

                            <RangeSlider minRange={0.2} min={0} max={1} step={0.0005} defaultValue={[0.1245, 0.5535]} />

                            <Divider my={10} />

                            <Title order={4} my={10}>Curriculam</Title>
                            {
                                curriculamOptions.map((option) => {
                                    return <Checkbox
                                        mb={5}
                                        defaultChecked
                                        label={option}
                                    />
                                })
                            }
                            <Divider my={10} />
                            <Title order={4} my={10}>Levels Taught</Title>
                            {
                                levelOptions.map((option) => {
                                    return <Checkbox
                                        mb={5}
                                        defaultChecked
                                        label={option}
                                    />
                                })
                            }

                        </Card>
                    </Grid.Col>
                    <Grid.Col span={{ md: 9 }}>
                        <Grid>
                            <Grid.Col span={{ md: 4 }}>
                                <TutorCard />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4 }}>
                                <TutorCard />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4 }}>
                                <TutorCard />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4 }}>
                                <TutorCard />
                            </Grid.Col>
                            <Grid.Col span={{ md: 4 }}>
                                <TutorCard />
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                </Grid>
            </Container>
        </div>
    )
}

export default BrowseTutor