import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./Login.module.css";

export default function LoginPage() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TextInput
          label="Username"
          placeholder="yourusername"
          required
          radius="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          radius="md"
        />
        <Button fullWidth mt="xl" radius="md">
          Log in
        </Button>
      </Paper>
    </Container>
  );
}
