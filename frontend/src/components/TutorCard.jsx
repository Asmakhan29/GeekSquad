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
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
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
                4+ years of experience
            </Text>
            <Text ta="center" fz="sm" c="dimmed" mt="sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab nihil facilis voluptatem aliquid ad eos numquam, asperiores iste sunt sed!
            </Text>
            <Title ta="center" order={4} mt="md" mb="sm">
                Price {'₹150'}/60mins
            </Title>
            {/* <Group mt="md" justify="center" gap={30}>
                {items}
            </Group> */}
        </Card>
    );
}

export default TutorCard;