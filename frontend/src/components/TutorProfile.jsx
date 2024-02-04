import { Badge, Button, Card, Divider, Flex, Grid, Progress, Stack, Tabs, Text, Title, rem } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { IconMessageCircle, IconPhoto } from '@tabler/icons-react';
import React, { useState } from 'react'

const iconStyle = { width: rem(12), height: rem(12) };

const TutorProfile = () => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('tutor')));

  const getProfileStatus = () => {
    return
  }

  return (
    <div>
      <div className="container">
        <h3>Hi, {currentUser.name}, welcome to your dashboard!</h3>
        <h5>Overview at glance</h5>


        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2}>Profile</Title>
          <Badge
            size="md"
            variant="gradient"
            gradient={{ from: 'pink', to: 'pink', deg: 90 }}
          >
            Profile is not live
          </Badge>
          <Button variant="filled" mt={'lg'} color="blue">Complete Onboarding</Button>

          <Text mt="lg" size="sm" color="dimmed">
            You must complete all mandatory fields marked red in each of the sections below to be “Live”. You will be visible to students only if your profile is Live.
          </Text>

          <Divider my="md" />
          <Grid align='flex-end' justify='space-between'>
            <Grid.Col span={{ md: 6, sm: 12 }}>
              <Stack gap="md" align="space-between" direction="column" padding="md" radius="md" shadow="sm" withBorder color="gray" size="xl" >
                <Title size={'lg'} >30%</Title>
                <div>
                  <Text size="lg" >Profile Completion</Text>
                  <Progress value={30} />
                </div>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ md: 4, sm: 12 }}>
              <Button fullWidth variant="outline" color="blue">Edit Profile</Button>
            </Grid.Col>
          </Grid>
          <Divider my="md" />
          <Grid align='flex-end' justify='space-between'>
            <Grid.Col span={{ md: 6, sm: 12 }}>
              <Stack gap="md" align="space-between" direction="column" padding="md" radius="md" shadow="sm" withBorder color="gray" size="xl" >
                <Title size={'lg'} >0%</Title>
                <div>
                  <Text size="lg" >Subject Completion</Text>
                  <Progress value={0} />
                </div>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ md: 4, sm: 12 }}>
              <Button fullWidth variant="outline" color="blue">Add Subject</Button>
            </Grid.Col>
          </Grid>
          <Divider my="md" />
          <Grid align='flex-end' justify='space-between'>
            <Grid.Col span={{ md: 6, sm: 12 }}>
              <Stack gap="md" align="space-between" direction="column" padding="md" radius="md" shadow="sm" withBorder color="gray" size="xl" >
                <Title size={'lg'} >0%</Title>
                <div>
                  <Text size="lg" >Working Hours Completion</Text>
                  <Progress value={0} />
                </div>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ md: 4, sm: 12 }}>
              <Button fullWidth variant="outline" color="blue">Add Working Hours</Button>
            </Grid.Col>
          </Grid>
        </Card>

        <Card mt={'lg'} shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2}>Analytics</Title>
          <Tabs defaultValue="gallery">
            <Tabs.List>
              <Tabs.Tab value="gallery" leftSection={<IconPhoto style={iconStyle} />}>
                Gallery
              </Tabs.Tab>
              <Tabs.Tab value="messages" leftSection={<IconMessageCircle style={iconStyle} />}>
                Messages
              </Tabs.Tab>
              <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
                Settings
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery">
              Gallery tab content
            </Tabs.Panel>

            <Tabs.Panel value="messages">
              Messages tab content
            </Tabs.Panel>

            <Tabs.Panel value="settings">
              Settings tab content
            </Tabs.Panel>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

export default TutorProfile;