import { ActionIcon, Card, Checkbox, Container, Divider, Grid, Input, TextInput, Title, rem } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import TutorCard from './TutorCard';
import { IconSearch } from '@tabler/icons-react';
import { IconArrowRight } from '@tabler/icons-react';

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
                            <Input label="City" placeholder="Enter your Address" />
                            <Title order={4} mb={5}>Availability</Title>
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