import { ActionIcon, Button, Card, Checkbox, Container, Divider, Flex, Grid, Input, RangeSlider, Stack, TextInput, Title, rem } from '@mantine/core';
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
    const [priceRange, setPriceRange] = useState({ min: 60, max: 1000 });

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
        fetchTutors();
    }, [])

    const displayTutors = () => {
        return tutorList.map(tutor => (
            <Grid.Col span={{ md: 4 }} key={tutor._id}>
                <TutorCard tutorData={tutor} />
            </Grid.Col>
        ))
    }

    return (
        <div>
            <div className='browse-header'>

                <Container size="md" my={20} py={50} className='browse-container' >
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

                            <Title order={4} my={10}>Price Range</Title>
                            <RangeSlider minRange={0.2} min={50} max={2000} step={20} defaultValue={[priceRange.min, priceRange.max]} onChange={([min, max]) => { setPriceRange({ min, max }) }} />
                            <Flex justify="space-between">
                                <TextInput size="sm" placeholder="Min" value={priceRange.min} onChange={v => { setPriceRange({ ...priceRange, min: v }); }} />
                                <TextInput size="sm" placeholder="Max" value={priceRange.max} onChange={v => { setPriceRange({ ...priceRange, max: v }); }} />
                            </Flex>

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
                            {displayTutors()}
                        </Grid>
                    </Grid.Col>
                </Grid>
            </Container>
        </div>
    )
}

export default BrowseTutor