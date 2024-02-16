import { Card, Checkbox, Container, Divider, Grid, Input, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react'

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
            <Container my={20}>
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
                    <Grid.Col span={{ md: 9 }}></Grid.Col>
                </Grid>
            </Container>
        </div>
    )
}

export default BrowseTutor