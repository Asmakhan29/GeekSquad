import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie, IconUserCheck, IconForms, IconCreditCard } from '@tabler/icons-react';
import classes from './homeFeatures.module.css';
// import { Dots } from '../Dots';
// import dotClasses from '../Dots/dots.module.css';

const mockdata = [
  {
    title: 'Create an Account',
    description:
      'Create an account with us. It is free and will always be. We will never share your information with anyone',
    icon: IconUserCheck,
  },
  {
    title: 'Search Tutor',
    description:
      'Filter to find a tutor by bio, subject category, price, review rating and more.',
    icon: IconForms,
  },
  {
    title: 'Connect',
    description:
      "Chat with tutors to see if they meet your needs, then arrange a lesson!",
    icon: IconCreditCard,
  },
];

export function HomeFeatures() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">

      {/* <Group justify="center">
          <Badge variant="filled" size="lg">
            Credit
          </Badge>
        </Group> */}

      <Title order={2} className={classes.title} ta="center" mt="sm">
      Perfect tutor for your needs
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
      Find the perfect tutor for your needs in 3 steps. Our innovative teacher matching service connects you with qualified instructors tailored to your on-demand learning needs. Say goodbye to the hassle of searching and hello to personalized learning.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}