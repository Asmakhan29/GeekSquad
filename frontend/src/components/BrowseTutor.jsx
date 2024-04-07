import { ActionIcon, Button, Card, Checkbox, Container, Divider, Flex, Grid, Input, RangeSlider, Stack, TextInput, Title, Tooltip, rem } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import TutorCard from './TutorCard';
import { IconSearch } from '@tabler/icons-react';
import { IconArrowRight } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

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

const subjects = [
    'Maths',
    'Physics',
    'Chemistry',
    'Computer',
    'Accountancy',
    'Economics'
]

const levelOptions = [
    'Pre-Primary',
    'Grades 1-5',
    'Grades 6-10',
    'Grades 11-12',
    'UG',
    'PG & Above'
];

const availabilityOptions = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

const timingOptions = [
    '6AM-9AM', '9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM', '9PM-12AM'
]

const BrowseTutor = () => {

    const [tutorList, setTutorList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [masterList, setMasterList] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 60, max: 1000 });
    const [selDays, setSelDays] = useState([]);
    const [selTimings, setSelTimings] = useState([]);
    const [selSubjects, setSelSubjects] = useState([]);
    const navigate = useNavigate();

    const { subject } = useParams();

    const fetchTutors = async () => {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tutor/getall`);
        const data = await response.json();
        console.log(data);
        setTutorList(data);
        setMasterList(data);
        setLoading(false);
        if (subject) {
            setSelSubjects([subject]);
        }
    }

    useEffect(() => {
        fetchTutors();
    }, [])

    const displayTutors = () => {
        if (tutorList.length) {
            return tutorList.map(tutor => (
                <Grid.Col span={{ md: 4 }} key={tutor._id}>
                    <TutorCard tutorData={tutor} onClick={() => {
                        navigate(`/details/${tutor._id}`)
                    }} />
                </Grid.Col>
            ))
        } else {
            return <Title order={1} mx="auto" my={50} c="dimmed">No Tutors Found</Title>
        }
    }

    const filterAvailability = () => {
        setTutorList(
            masterList.filter(tutor => {
                return selDays.every(day => tutor.availability.includes(day));
            }
            )
        )
    }

    const filterTimings = () => {
        setTutorList(
            masterList.filter(tutor => {
                return selTimings.every(timing => tutor.timings.includes(timing));
            }
            )
        )

    }

    const filterPrice = () => {
        setTutorList(
            masterList.filter(tutor => {
                return tutor.pricing >= priceRange.min && tutor.pricing <= priceRange.max;
            }
            )
        )

    }

    const filterSubjects = () => {
        if (selSubjects.length === 0) {
            setTutorList(masterList);
            return;
        }
        console.log(selSubjects);
        setTutorList(
            masterList.filter(tutor => {
                return selSubjects.some(subject => tutor.subject.toLowerCase().includes(subject.toLowerCase()));
            })
        )
    }

    useEffect(() => {
        filterAvailability();
    }, [selDays])

    useEffect(() => {
        filterTimings();
    }, [selTimings])

    useEffect(() => {
        filterPrice();
    }, [priceRange])

    useEffect(() => {
        filterSubjects();
    }, [selSubjects])

    return (
        <div>
            <div className='browse-header'>

                <Container size="md" my={20} py={50} className='browse-container' >
                    <Title order={1} align="center" mb={20}>Find a Tutor</Title>
                    <TextInput
                        onChange={e => (
                            setTutorList(
                                masterList.filter(tutor => tutor.name.toLowerCase().includes(e.target.value.toLowerCase()))
                            )
                        )}
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
                                {
                                    availabilityOptions.map(day => (
                                        <Tooltip label={day}>
                                            <ActionIcon w={'100%'}
                                                onClick={() => {
                                                    if (selDays.includes(day)) {
                                                        setSelDays(selDays.filter(d => d !== day));
                                                    } else {
                                                        setSelDays([...selDays, day]);
                                                    }
                                                }}
                                                variant={
                                                    selDays.includes(day) ? 'filled' : 'default'
                                                }
                                                size="lg"
                                                aria-label={day}>

                                                {day[0]}
                                            </ActionIcon>
                                        </Tooltip>
                                    ))
                                }
                            </ActionIcon.Group>
                            <Grid>
                                {
                                    timingOptions.map(timing => (
                                        <Grid.Col span={{ md: 6 }}>
                                            <Button
                                                w={'100%'}
                                                onClick={() => {
                                                    if (selTimings.includes(timing)) {
                                                        setSelTimings(selTimings.filter(t => t !== timing));
                                                    } else {
                                                        setSelTimings([...selTimings, timing]);
                                                    }

                                                }}
                                                variant={
                                                    selTimings.includes(timing) ? 'filled' : 'default'
                                                }>
                                                {timing}
                                            </Button>
                                        </Grid.Col>
                                    ))
                                }
                            </Grid>

                            <p>Times are shown in your local timezone (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
                            </p>

                            <Title order={4} my={10}>Price Range</Title>
                            <RangeSlider minRange={0.2} min={50} max={2000} step={20} defaultValue={[priceRange.min, priceRange.max]} onChange={([min, max]) => { setPriceRange({ min, max }) }} />
                            <Flex justify="space-between">
                                <TextInput size="sm" placeholder="Min" value={priceRange.min} onChange={v => { setPriceRange({ ...priceRange, min: v }); }} />
                                <TextInput size="sm" placeholder="Max" value={priceRange.max} onChange={v => { setPriceRange({ ...priceRange, max: v }); }} />
                            </Flex>

                            <Divider my={10} />

                            <Title order={4} my={10}>Subjects</Title>
                            {
                                subjects.map((option) => {
                                    return <Checkbox
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelSubjects([...selSubjects, option]);
                                            } else {
                                                setSelSubjects(selSubjects.filter(sub => sub.toLowerCase() !== option.toLowerCase()));
                                            }
                                        }}
                                        mb={5}
                                        label={option}
                                        checked={selSubjects.map(sub => sub.toLowerCase()).includes(option.toLowerCase())}
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