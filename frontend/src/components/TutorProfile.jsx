import { Badge, Box, Button, Card, CheckIcon, Combobox, Divider, Drawer, Flex, Grid, Group, Pill, PillsInput, Progress, SegmentedControl, Select, Stack, Tabs, Text, TextInput, Textarea, Title, rem, useCombobox } from '@mantine/core';
import { IconMessage, IconSettings } from '@tabler/icons-react';
import { IconMessageCircle, IconPhoto } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { DatePickerInput } from '@mantine/dates';
import { FileUploader } from './FileUploader';
import { enqueueSnackbar } from 'notistack';
import ChatPage from './ChatPage';
import { useDisclosure } from '@mantine/hooks';

const iconStyle = { width: rem(12), height: rem(12) };

const grades = [
  'Pre-Primary',
  'Grades 1-5',
  'Grades 6-10',
  'Grades 11-12'
];


const locations = [
  'Zone A', 'Zone B', 'Zone C', 'Zone D'
]

const subjects = [
  'Maths',
  'Physics',
  'Chemistry',
  'Computer',
  'Accountancy',
  'Economics'
]

const TutorProfile = () => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('tutor')));
  const [paymentList, setPaymentList] = useState([]);

  const [selLocation, setSelLocation] = useState('');
  const [selSubject, setSelSubject] = useState('');

  const [chatOpened, toggleChat] = useDisclosure(false);

  const getPaymentInfo = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/payment/getbytutor/${currentUser._id}`);
    const data = await res.json();
    console.log(data);
    setPaymentList(data);
  }

  useEffect(() => {
    getPaymentInfo()
  }, [])


  const updateProfile = (dataToUpdate, alertMsg="Profile updated successfully") => {
    dataToUpdate.location = selLocation;
    fetch(`${import.meta.env.VITE_API_URL}/tutor/update/${currentUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToUpdate)
    }).then(res => {
      if (res.status === 200) {
        console.log(res.status);
        enqueueSnackbar(alertMsg, { variant: 'success' });
        res.json()
          .then((data) => {
            sessionStorage.setItem('tutor', JSON.stringify(data));
            setCurrentUser(data);
            console.log(data);
          })
      }
    })
  }

  const uploadFile = (files, updateCB) => {
    let file = files[0];
    const fd = new FormData();
    fd.append('myfile', file);
    fetch(`${import.meta.env.VITE_API_URL}/util/uploadfile`, {
      method: 'POST',
      body: fd
    }).then(res => {
      if (res.status === 200) {
        console.log('file uploaded');
        updateCB();
      }
    });

  }

  // useEffect(() => {
  //   if (currentUser !== null) {
  //     const { name, email, avatar, cover, bio } = currentUser;
  //     setTutorPersonalData({ name, email, avatar, cover, bio });
  //   }
  // }, []);


  // const getProfileStatus = () => {
  //   return
  // }

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'busy':
        return <Badge color='orange'>Busy</Badge>
      case 'available':
        return <Badge color='green'>Available</Badge>
      case 'not available':
        return <Badge color='red'>Not Available</Badge>
      default:
        return <Badge color='gray'>Unknown</Badge>
    }
  }

  // const personalForm = useForm

  return (
    <div className='profile-header'>
      <Drawer opened={chatOpened} onClose={toggleChat.close} title="Chat with Student" position='right'>
        <ChatPage />
      </Drawer>
      <div className="container ">
        <div className='dash-head'>
          <h3>Hi, {currentUser.name}, welcome to your dashboard!</h3>
          <h5>Overview at glance</h5>
        </div>


        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Flex justify={'space-between'}>

            <Title order={3}>Number of Students : {paymentList.length}</Title>
            <Button color='blue' onClick={toggleChat.open} leftSection={<IconMessage size={24} />} variant="filled">
              Open Chat
            </Button>
          </Flex>

          {/* <Button variant="filled" mt={'lg'} color="blue">Complete Onboarding</Button>

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
          </Grid> */}
        </Card>

        <Card mt={'lg'} shadow="sm" padding="lg" radius="md" withBorder>
          <Flex align={'center'} gap={10}>
            <Text size="md" fw={'bold'}>Status: </Text>
            {getStatusIcon(currentUser.status)}
            <SegmentedControl data={['available', 'not available', 'busy']} onChange={
              (v) => {updateProfile({status: v}, "Status updated successfully")}
            } />
          </Flex>
          <Title order={2} align="center" my="lg">Edit Your Profile</Title>
          <Button onClick={() => {
            updateProfile(currentUser)
          }} variant="outline" color="blue">Save Profile</Button>
          <Tabs defaultValue="personal">
            <Tabs.List>
              <Tabs.Tab value="personal" leftSection={<IconPhoto style={iconStyle} />}>
                Personal Details
              </Tabs.Tab>
              <Tabs.Tab value="teaching" leftSection={<IconMessageCircle style={iconStyle} />}>
                Teaching
              </Tabs.Tab>
              {/* <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
                Settings
              </Tabs.Tab> */}
            </Tabs.List>

            <Tabs.Panel value="personal">
              <Box mt={20}>
                <Box mb={10}>
                  <Title order={3}>Profile Picture</Title>
                  <Grid>
                    <Grid.Col span={{ md: 6, sm: 12 }}>
                      <img className='profile-avatar-upload' src={`${import.meta.env.VITE_API_URL}/${currentUser.avatar}`} alt={currentUser.name} />
                    </Grid.Col>
                    <Grid.Col span={{ md: 6, sm: 12 }}>
                      <FileUploader uploadFile={
                        (files) => uploadFile(files, () => {
                          updateProfile({ avatar: files[0].name });
                        })
                      } label={'Upload Profile Image'} />
                    </Grid.Col>
                  </Grid>
                </Box>

                {/* <Box mb={10}>
                  <Title order={3}>Cover Picture</Title>
                  <Grid>
                    <Grid.Col span={{ md: 6, sm: 12 }}>
                      <img style={{ width: '100%' }} src={`${import.meta.env.VITE_API_URL}/${currentUser.cover}`} alt={currentUser.name} />
                    </Grid.Col>
                    <Grid.Col span={{ md: 6, sm: 12 }}>
                      <FileUploader uploadFile={
                        (files) => uploadFile(files, () => {
                          updateProfile({ cover: files[0].name });
                        }
                        )
                      } label={'Upload Cover Image'} />
                    </Grid.Col>
                  </Grid>
                </Box> */}

                <Box mb={10}>
                  <Title order={3}>Bio</Title>
                  <Textarea
                    onChange={e => setCurrentUser({ ...currentUser, bio: e.target.value })}
                    value={currentUser.bio}
                    placeholder="Bio"
                    rows={4}
                  />
                </Box>

                <Box mb={10}>
                  <Title order={3}>Education</Title>
                  <TextInput
                    placeholder="Degree"
                  />
                  {/* <Textarea
                    placeholder="Institution Details"
                  /> */}
                </Box>
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value="teaching">
              <Box mt={20}>
                <Box mb={10}>
                  <Title order={3}>Public Description</Title>
                  <Textarea
                    onChange={e => setCurrentUser({ ...currentUser, description: e.target.value })}
                    value={currentUser.description}
                    placeholder="Public Description"
                    rows={4}
                  />
                </Box>

                <Box mb={10}>
                  <Title order={3}>Experience</Title>
                  <TextInput
                    onChange={e => setCurrentUser({ ...currentUser, experience: e.target.value })}
                    value={currentUser.experience}
                    placeholder="Experience"
                    type="number"
                  />

                </Box>
                <Box mb={10}>
                  <Title order={3}>Select Grades Taught</Title>
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

                {/* <Box mt={10}>
                  <Title order={3}>Select Curriculam</Title>
                  <Combobox store={curriculamCombobox} onOptionSubmit={handleCurriculamValueSelect}>
                    <Combobox.DropdownTarget>
                      <PillsInput onClick={() => curriculamCombobox.openDropdown()}>
                        <Pill.Group>
                          {curriculamValues}

                          <Combobox.EventsTarget>
                            <PillsInput.Field
                              onFocus={() => curriculamCombobox.openDropdown()}
                              onBlur={() => curriculamCombobox.closeDropdown()}
                              value={curriculamSearch}
                              placeholder="Search Curriculam"
                              onChange={(event) => {
                                curriculamCombobox.updateSelectedOptionIndex();
                                setCurriculamSearch(event.currentTarget.value);
                              }}
                              onKeyDown={(event) => {
                                if (event.key === 'Backspace' && search.length === 0) {
                                  event.preventDefault();
                                  handleCurriculamValueRemove(value[value.length - 1]);
                                }
                              }}
                            />
                          </Combobox.EventsTarget>
                        </Pill.Group>
                      </PillsInput>
                    </Combobox.DropdownTarget>

                    <Combobox.Dropdown>
                      <Combobox.Options>
                        {curriculamOptions.length > 0 ? curriculamOptions : <Combobox.Empty>Nothing found...</Combobox.Empty>}
                      </Combobox.Options>
                    </Combobox.Dropdown>
                  </Combobox>
                </Box> */}

                <Box mt={10}>

                  <Title order={3}>Select Location</Title>
                  <Select
                    placeholder="Pick Location"
                    data={locations}
                    value={currentUser.location}
                    onChange={v => setCurrentUser({ ...currentUser, location: v })}
                  />

                </Box>
                <Box mt={10}>

                  <Title order={3}>Select Subject Taught</Title>

                  <Select
                    data={subjects}
                    value={currentUser.subject}
                    onChange={v => setCurrentUser({ ...currentUser, subject: v })}
                  />

                </Box>
                <Box mt={10}>

                  <Title order={3}>Fees per hour</Title>
                  <TextInput
                    onChange={e => setCurrentUser({ ...currentUser, pricing: e.target.value })}
                    value={currentUser.pricing}
                    placeholder="Fees per hour"
                    type="number"
                  />

                </Box>

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