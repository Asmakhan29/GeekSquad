import {
    Paper,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    Center,
    Box,
    Progress,
    Group,
    SegmentedControl,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react'
import { useInputState } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons-react';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

function PasswordRequirement({ meets, label }) {
    return (
        <Text component="div" c={meets ? 'teal' : 'red'} mt={5} size="sm">
            <Center inline>
                {meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
                <Box ml={7}>{label}</Box>
            </Center>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

const TutorRegister = ({setPage}) => {

    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            createdAt: new Date()
        },
        validate: {
            name: (value) => value.trim().length < 2,
            email: (value) => !/^\S+@\S+$/.test(value)
        },
    });

    const submitForm = async (values) => {
        values.password = value;
        console.log(values);
        console.log(strength);
        if (strength > 80) {
            const res = await fetch('http://localhost:5000/tutor/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })

            if (res.status === 200) {
                enqueueSnackbar('Registered successfully', { variant: 'success' });
                // setPage('Login')
                // window.location.href = 'https://buy.stripe.com/test_cN24kecja6gwgPmeV1';
                window.location.href = 'https://buy.stripe.com/test_7sI6rt55daF2fAY4gh';
            } else {
                enqueueSnackbar('Error registering', { variant: 'error' });
            }

        }
    }

    const [value, setValue] = useInputState('');
    const strength = getStrength(value);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
    ));
    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
            <Progress
                styles={{ section: { transitionDuration: '0ms' } }}
                value={
                    value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
                }
                color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
                key={index}
                size={4}
            />
        ));

    return (
        <>
            <form onSubmit={form.onSubmit(submitForm)}>
                <TextInput label="Full Name" placeholder="john doe" size="md" {...form.getInputProps('name')} />
                <TextInput label="Email address" placeholder="hello@gmail.com" mt="md" size="md" {...form.getInputProps('email')} />
                <PasswordInput
                    size="md"
                    value={value}
                    onChange={setValue}
                    placeholder="Your password"
                    label="Password"
                />

                <Group gap={5} grow mt="xs" mb="md">
                    {bars}
                </Group>

                <PasswordRequirement label="Has at least 6 characters" meets={value.length > 5} />
                {checks}
                <Checkbox label="Keep me logged in" mt="xl" size="md" />
                <Button type='submit' fullWidth mt="xl" size="md">
                    Register as Tutor
                </Button>
            </form>

            {/* <Text ta="center" mt="md">
                Don&apos;t have an account?{' '}
                <Anchor href="#" fw={700} onClick={(event) => event.preventDefault()}>
                    Register
                </Anchor>
            </Text> */}
        </>
    )
}

export default TutorRegister