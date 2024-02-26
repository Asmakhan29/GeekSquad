import { Badge, Box, Button, Card, CheckIcon, Combobox, Divider, Flex, Grid, Group, Pill, PillsInput, Progress, Stack, Tabs, Text, Title, rem, useCombobox } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { IconMessageCircle, IconPhoto } from '@tabler/icons-react';
import React, { useState } from 'react'

const iconStyle = { width: rem(12), height: rem(12) };

const grades = [
  'Pre-Primary',
  'Grades 1-5',
  'Grades 6-10',
  'Grades 11-12',
  'UG',
  'PG & Above'
];

const curriculams = [
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

const TutorProfile = () => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('tutor')));

  const getProfileStatus = () => {
    return
  }

  const gradeCombobox = useCombobox({
    onDropdownClose: () => gradeCombobox.resetSelectedOption(),
    onDropdownOpen: () => gradeCombobox.updateSelectedOptionIndex('active'),
  });

  const curriculamCombobox = useCombobox({
    onDropdownClose: () => curriculamCombobox.resetSelectedOption(),
    onDropdownOpen: () => curriculamCombobox.updateSelectedOptionIndex('active'),
  });

  const [gradeSearch, setGradeSearch] = useState('');
  const [gradeValue, setGradeValue] = useState([]);

  const handleValueSelect = (val) =>
    setGradeValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    );

  const handleGradeValueRemove = (val) =>
    setGradeValue((current) => current.filter((v) => v !== val));

  const gradeValues = gradeValue.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleGradeValueRemove(item)}>
      {item}
    </Pill>
  ));

  const gradeOptions = grades
    .filter((item) => item.toLowerCase().includes(gradeSearch.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={gradeValue.includes(item)}>
        <Group gap="sm">
          {gradeValue.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <div>
      <div className="container">
        <h3>Hi, {currentUser.name}, welcome to your dashboard!</h3>
        <h5>Overview at glance</h5>


        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2}>Onboarding</Title>
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
          <Button variant="outline" color="blue">Save Profile</Button>
          <Tabs defaultValue="gallery">
            <Tabs.List>
              <Tabs.Tab value="gallery" leftSection={<IconPhoto style={iconStyle} />}>
                Skills
              </Tabs.Tab>
              <Tabs.Tab value="teaching" leftSection={<IconMessageCircle style={iconStyle} />}>
                Teaching
              </Tabs.Tab>
              <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
                Settings
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery">
              Gallery tab content
            </Tabs.Panel>

            <Tabs.Panel value="teaching">
              <Box>
                <Title order={3}>Select Grade</Title>
                <Combobox store={gradeCombobox} onOptionSubmit={handleValueSelect}>
                  <Combobox.DropdownTarget>
                    <PillsInput onClick={() => gradeCombobox.openDropdown()}>
                      <Pill.Group>
                        {gradeValues}

                        <Combobox.EventsTarget>
                          <PillsInput.Field
                            onFocus={() => gradeCombobox.openDropdown()}
                            onBlur={() => gradeCombobox.closeDropdown()}
                            value={gradeSearch}
                            placeholder="Search Grade"
                            onChange={(event) => {
                              gradeCombobox.updateSelectedOptionIndex();
                              setGradeSearch(event.currentTarget.value);
                            }}
                            onKeyDown={(event) => {
                              if (event.key === 'Backspace' && search.length === 0) {
                                event.preventDefault();
                                handleGradeValueRemove(value[value.length - 1]);
                              }
                            }}
                          />
                        </Combobox.EventsTarget>
                      </Pill.Group>
                    </PillsInput>
                  </Combobox.DropdownTarget>

                  <Combobox.Dropdown>
                    <Combobox.Options>
                      {gradeOptions.length > 0 ? gradeOptions : <Combobox.Empty>Nothing found...</Combobox.Empty>}
                    </Combobox.Options>
                  </Combobox.Dropdown>
                </Combobox>
              </Box>
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