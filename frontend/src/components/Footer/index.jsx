import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './footer.module.css';

const data = [
  {
    title: 'About',
    links: [
      { label: 'Contact', link: '#' },
      // { label: 'Pricing', link: '#' },
      // { label: 'Support', link: '#' },
      // { label: 'Forums', link: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Use', link: '#' },
      { label: 'Privacy', link: '#' },
      // { label: 'Changelog', link: '#' },
      // { label: 'Releases', link: '#' },
    ],
  },
  {
    title: 'Help Center',
    links: [
      { label: 'Support Center', link: '#' },
      { label: 'Report a Concern', link: '#' },
      // { label: 'Email newsletter', link: '#' },
      // { label: 'GitHub discussions', link: '#' },
    ],
  },
];

export function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text component="a"
        key={index}
        className={classes.link}
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          {/* <MantineLogo size={30} /> */}
          <h2>Geek Squad</h2>
          <Text size="xs" c="dimmed" className={classes.description}>
            Find tutor fast and effectively.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © Geek Squad
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}