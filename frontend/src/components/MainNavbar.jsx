import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
    Modal,
    Title,
    Menu,
    Avatar,
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconHeart,
    IconStar,
    IconSwitchHorizontal,
    IconPlayerPause,
    IconTrash,
} from '@tabler/icons-react';
import classes from './mainNavbar.module.css';
import UserAuthenticate from './UserAuthenticate';
import TutorRegister from './TutorRegister';
import TutorAuthenticate from './TutorAuthenticate';
import useTutorContext from '../Context/TutorContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IconMessage } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';
import { IconLogout } from '@tabler/icons-react';
import cx from 'clsx';
import useUserContext from '../Context/UserContext';

const mockdata = [
    {
        icon: IconCode,
        title: 'Maths',
        link: '/browse/Maths',
        // description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconCoin,
        title: 'Physics',
        link: '/browse/Physics',
        // description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
        icon: IconBook,
        title: 'Chemistry',
        link: '/browse/Chemistry',
        // description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
        icon: IconFingerprint,
        title: 'Computer',
        link: '/browse/Computer',
        // description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
        icon: IconChartPie3,
        title: 'Accountancy',
        link: '/browse/Accountancy',
        // description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
        icon: IconNotification,
        title: 'Economics',
        link: '/browse/Economics',
        // description: 'Combusken battles with the intensely hot flames it spews',
    },
];

export function MainNavbar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
    const [modalOpened, toggleModal] = useDisclosure(false);
    const [userModalOpened, userToggleModal] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);



    const { tutorLoggedIn, tutorLogout, currentTutor } = useTutorContext();
    const { loggedIn, logout, currentUser } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        // setCurrentUser(
        //     JSON.parse(sessionStorage.getItem('tutor'))
        // )

    }, [])


    // const [modalOpened, toggleModal] = useDisclosure(false);

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" p={10} align="center" onClick={
                () => navigate(item.link)
            }>
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
                </ThemeIcon>
                <Box>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </Box>
            </Group>
        </UnstyledButton>
    ));

    const displayMenu = (userData, profileLink, logoutFn) => {
        return <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
                    <Group gap={7}>
                        <Avatar src={'http://localhost:5000/' + userData.avatar} alt={userData.name} radius="xl" size={20} />
                        <Text fw={500} size="sm" lh={1} mr={3}>
                            {userData.name}
                        </Text>
                        <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                    onClick={e => navigate(profileLink)}
                    leftSection={
                        <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                >
                    Profile
                </Menu.Item>
                <Menu.Item
                    onClick={e => navigate('payment-history')}
                    leftSection={
                        <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                >
                    Payment History
                </Menu.Item>
                <Menu.Item
                    onClick={logoutFn}
                    color='red'
                    leftSection={
                        <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    }
                >
                    Logout
                </Menu.Item>


            </Menu.Dropdown>
        </Menu>
    }

    const displayLoginOptions = () => {
        if (tutorLoggedIn) {
            return displayMenu(currentTutor, 'tutorprofile', tutorLogout)
        } else if (loggedIn) {
            return displayMenu(currentUser, 'userprofile', logout)
        } else {
            return <Group visibleFrom="sm">
                <Button variant="default" onClick={toggleModal.open}>Tutor</Button>
                <Button onClick={userToggleModal.open}>Student</Button>
            </Group>
        }
    }

    return (
        <Box>
            <Modal opened={modalOpened} onClose={toggleModal.close}>
                <TutorAuthenticate closeModal={toggleModal.close} />
            </Modal>
            <Modal opened={userModalOpened} onClose={userToggleModal.close}>
                <UserAuthenticate closeModal={userToggleModal.close} />
            </Modal>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <Title order={1} className={classes.logo} style={{ fontSize: '1.5rem' }}>
                        GeekSquad
                    </Title>

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <NavLink to="/" className={classes.link}>
                            Home
                        </NavLink>
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Features
                                        </Box>
                                        <IconChevronDown
                                            style={{ width: rem(16), height: rem(16) }}
                                            color={theme.colors.blue[6]}
                                        />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                                <Group justify="space-between" px="md">
                                    <Text fw={500}>Features</Text>
                                    <Anchor component={Link} to="/browse" fz="xs">
                                        View all
                                    </Anchor>
                                </Group>

                                <Divider my="sm" />

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>

                                <div className={classes.dropdownFooter}>
                                    <Group justify="space-between">
                                        <div>
                                            <Text fw={500} fz="sm">
                                                Get started
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                {/* Their food sources have decreased, and their numbers */}
                                                Connect with tutors to grow in a single click
                                            </Text>
                                        </div>
                                        <Button variant="default">Get started</Button>
                                    </Group>
                                </div>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <a href="#" className={classes.link}>
                            Learn
                        </a>
                        <a href="#" className={classes.link}>
                            Academy
                        </a>
                    </Group>
                    {
                        displayLoginOptions()
                    }

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />

                    <a href="#" className={classes.link}>
                        Home
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                Features
                            </Box>
                            <IconChevronDown
                                style={{ width: rem(16), height: rem(16) }}
                                color={theme.colors.blue[6]}
                            />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="#" className={classes.link}>
                        Learn
                    </a>
                    <a href="#" className={classes.link}>
                        Academy
                    </a>

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        <Button variant="default" onClick={toggleModal.open}>Tutor</Button>
                        <Button onClick={userToggleModal.open}>Student</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}