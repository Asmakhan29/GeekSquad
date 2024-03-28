import { Button, Container, Flex, Text, Title } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ThankYou = () => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const savePayment = async () => {
    
  }

  return (
    <div>
      <Container size={'md'}>

        <Flex justify={'center'} align={'center'} style={{ height: '50vh' }} direction={'column'}>
          <IconCircleCheck size={100} color={'green'} />
          <Title order={1}>Payment Succeeded</Title>
          <Text size='xl' mt={20}>Your Payment has been completed successfully</Text>
          <Button color='blue' mt={20} component={Link} to="/">Go to Home</Button>
        </Flex>
      </Container>
    </div>
  )
}

export default ThankYou