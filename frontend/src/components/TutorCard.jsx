import { Card, Avatar, Text, Group, Button, Title } from '@mantine/core';
import classes from './tutorcard.module.css';

const stats = [
    { value: '34K', label: 'Followers' },
    { value: '187', label: 'Follows' },
    { value: '1.6K', label: 'Posts' },
];

function TutorCard({ tutorData }) {
    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text ta="center" fz="lg" fw={500}>
                {stat.value}
            </Text>
            <Text ta="center" fz="sm" c="dimmed" lh={1}>
                {stat.label}
            </Text>
        </div>
    ));

    return (
        <Card withBorder padding="xl" radius="md" className={classes.card}>
            <Card.Section
                h={140}
                style={{
                    backgroundImage: `url(${import.meta.env.VITE_API_URL}/${tutorData.cover})`,
                    backgroundPosition:'center',
                    backgroundSize:'cover'
                }}
            />
            <Avatar
                src={`http://localhost:5000/${tutorData.avatar}`}
                size={80}
                radius={80}
                mx="auto"
                mt={-30}
                className={classes.avatar}
            />
            <Text ta="center" fz="lg" fw={500} mt="sm">
                {tutorData.name}
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
                {tutorData.experience}+ years of experience
            </Text>
            <Text ta="center" fz="sm" c="dimmed" mt="sm">
                {tutorData.description}
            </Text>
            <Title ta="center" order={4} mt="md" mb="sm">
                Price ₹{tutorData.pricing} per hour
            </Title>
            {/* <Group mt="md" justify="center" gap={30}>
                {items}
            </Group> */}
        </Card>
    );
}

export default TutorCard;