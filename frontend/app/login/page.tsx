"use client";
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Notification,
} from "@mantine/core";
import classes from "./Login.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/axios";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    if (access && refresh) {
      router.replace("/");
    } else {
      setChecking(false);
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post("auth/login/", {
        username: data.username,
        password: data.password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      router.push("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  if (checking) return null;
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        {error && (
          <Notification color="red" mb="md">
            {error}
          </Notification>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Username"
            placeholder="Your username"
            {...register("username")}
            error={errors.username?.message}
            required
            radius="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...register("password")}
            error={errors.password?.message}
            required
            mt="md"
            radius="md"
          />
          <Button
            fullWidth
            mt="xl"
            radius="md"
            loading={isSubmitting}
            type="submit"
          >
            Log in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
