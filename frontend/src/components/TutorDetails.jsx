import { Text, Title, TextInput, Button, Image, Box, Container, BackgroundImage, Center, Grid, Rating, Divider, ActionIcon, Paper, Group, Avatar, TypographyStylesProvider, Textarea, Flex, Stack } from '@mantine/core';
// import image from './image.svg';
import classes from './tutordetails.module.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { IconAt, IconCoin, IconTrash, IconTrashFilled } from '@tabler/icons-react';
import { enqueueSnackbar } from 'notistack';
import ReactTimeAgo from 'react-time-ago'

function TutorDetails() {

  const { id } = useParams();
  const [tutorDetails, setTutorDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [rating, setRating] = useState(3);
  const reviewRef = useRef();

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('user'))
  )

  const fetchTutorData = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tutor/getbyid/${id}`);
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    setTutorDetails(data);
    setLoading(false);
  }

  const fetchReviews = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/review/getbytutor/${id}`);
    // console.log(response.status);
    const data = await response.json();
    console.log(data);
    setReviewList(data);
  }

  const calculateAverageRating = () => {
    let total = 0;
    reviewList.forEach(review => {
      total += review.rating;
    });
    return total / reviewList.length;

  }

  useEffect(() => {
    fetchTutorData();
    fetchReviews();
  }, [])

  const displayTutorDetails = () => {
    if (!loading && tutorDetails) {
      return (
        <>
          <Image
            src={`${import.meta.env.VITE_API_URL}/${tutorDetails.cover}`}
            radius="md"
            h={300}
          />
          <Container mt={'lg'}>
            <Grid gutter={30}>
              <Grid.Col span={{ sm: 12, md: 4 }}>

                <Image
                  src={`${import.meta.env.VITE_API_URL}/${tutorDetails.avatar}`}
                  radius="md"
                  w={'100%'}
                  className={classes.avatar}
                />
              </Grid.Col>
              <Grid.Col span={{ sm: 12, md: 8 }}>
                <Flex justify="space-between">
                  <Box>

                    <Text size="lg" fw={'bold'}>{tutorDetails.experience}+ years of experience</Text>
                    <Title order={1}>{tutorDetails.name}</Title>
                    <Text size="lg" c={'dimmed'}> <IconAt /> {tutorDetails.email}</Text>
                    <Text size="lg">{tutorDetails.description}</Text>
                    <Rating value={calculateAverageRating()} size={'lg'} fractions={3} readOnly />
                    <Text size="lg">{reviewList.length} Reviews</Text>
                  </Box>
                  <Button component={Link} to={"/checkout/"+tutorDetails._id} color='green' leftSection={<IconCoin size={24} />} variant="filled">
                    Pay Tutor
                  </Button>
                </Flex>
                <Divider my={20} />
                <Text size="xl" fw={'bold'}>Pricing: ₹{tutorDetails.pricing}/hour</Text>
                <Text size="lg">Subject: {tutorDetails.subject}</Text>
                <Text size="lg">Avalaible Days</Text>
                <ActionIcon.Group my={20}>
                  {
                    tutorDetails.availability.map((day, index) => (
                      <ActionIcon key={index} color="blue" title={day} variant="default" w={'100%'}>
                        {day}
                      </ActionIcon>
                    ))
                  }
                </ActionIcon.Group>
                <Text size="lg">Avalaible Timings</Text>
                <ActionIcon.Group my={20}>
                  {
                    tutorDetails.timings.map((time, index) => (
                      <ActionIcon key={index} color="blue" title={time} variant="default" w={'100%'}>
                        {time}
                      </ActionIcon>
                    ))
                  }
                </ActionIcon.Group>

                <Text size="lg">Preferred Locations: {tutorDetails.preferredLocation.join(',')}</Text>
              </Grid.Col>
            </Grid>

          </Container>
        </>
      )
    }
  }

  const deleteReview = async (reviewId) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/review/delete/${reviewId}`, {
      method: 'DELETE'
    });
    if (response.status === 200) {
      fetchReviews();
      enqueueSnackbar('Review deleted successfully', { variant: 'success' });
    }
  }

  const displayReviews = () => {
    return reviewList.map((review) => (
      <Paper key={review._id} withBorder p={20} radius="md" mt={20}>
        <Flex justify="space-between" align={'start'}>

          <Group>
            <Avatar
              src={`${import.meta.env.VITE_API_URL}/${review.user.avatar}`}
              alt={review.user.name}
              radius="xl"
            />
            <div>
              <Text fz="sm">{review.user.name}</Text>
              <Text fz="xs" c="dimmed">
                <ReactTimeAgo date={new Date()} locale="en-US" />
              </Text>
            </div>
          </Group>
          <Stack direction="horizontal" justify='flex-end'>
            <Rating value={review.rating} color='blue' size="sm" readOnly />
            {
              currentUser && currentUser._id === review.user._id && (
                <ActionIcon color="red" title={'delete'} size={'sm'} variant="filled" onClick={
                  () => deleteReview(review._id)
                }>
                  <IconTrashFilled size={'xs'} />
                </ActionIcon>
              )
            }
          </Stack>
        </Flex>
        <Text mt={10}>{review.review}</Text>
      </Paper>
    ))
  }

  const submitReview = async () => {
    if (!currentUser) {
      enqueueSnackbar('Please login to leave a review', { variant: 'error' });
      return;
    }
    const review = reviewRef.current.value;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/review/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tutor: id,
        review,
        rating,
        user: currentUser._id
      })
    });
    if (response.status === 200) {
      fetchReviews();
      enqueueSnackbar('Review submitted successfully', { variant: 'success' });
    }
  }

  const ratingForm = () => {
    if (currentUser) {
      return (
        <Paper withBorder radius="md" p={20}>

          <Rating size="lg" value={rating} onChange={v => setRating(v)} />
          <Textarea
            ref={reviewRef}
            mt={10}
            placeholder="Write your review here"
            radius="md"
            w={'100%'}
            className={classes.textarea}
          />
          <Button variant="light" color="blue" radius="md" mt={20} onClick={submitReview}>
            Submit
          </Button>
        </Paper>
      )
    } else {
      return <Text>Please login to leave a review</Text>
    }
  }

  return (
    <Box>
      <Container size={'xl'}>
        {displayTutorDetails()}
      </Container>
      <Container mt={'lg'}>
        <Title order={2}>Reviews</Title>
        {ratingForm()}
        {displayReviews()}
      </Container>
    </Box>
  );
}

export default TutorDetails;