import { signIn, toast } from "@/lib";
import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router";
import classes from "./style.module.css";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    },

    validate: {
      email: (value) => {
        if (value.length < 1) {
          return "Email is required.";
        }

        if (!/^\S+@\S+$/.test(value)) {
          return "Email is invalid.";
        }
      },
      password: (value) => (value.length > 0 ? null : "Password is required."),
    },
  });

  const onSubmit = form.onSubmit(async (data) => {
    await signIn.email(data, {
      onRequest: () => {
        setLoading(true);
      },
      onSuccess: () => {
        navigate("/dashboard");
      },
      onError: (ctx) => {
        if (ctx.error.status === 401) {
          toast.error("Invalid email or password. Please try again.");

          return;
        }

        toast.error("Error while logging in.");
      },
    });

    setLoading(false);
  });

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Title order={2} className={classes.title}>
          Login to your account
        </Title>

        <form onSubmit={onSubmit}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            radius="md"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            radius="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Checkbox
            label="Keep me logged in"
            mt="xl"
            size="md"
            key={form.key("rememberMe")}
            {...form.getInputProps("rememberMe", { type: "checkbox" })}
          />
          <Button
            type="submit"
            fullWidth
            mt="xl"
            size="md"
            radius="md"
            loading={loading}
          >
            Login
          </Button>

          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor
              href="#"
              fw={500}
              onClick={(event) => event.preventDefault()}
            >
              Register
            </Anchor>
          </Text>
        </form>
      </Paper>
    </div>
  );
};
