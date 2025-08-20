import { Button, Container, Group } from "@mantine/core";
import classes from "./HeaderMenu.module.css";
import Link from "next/link";

export function HeaderMenu() {

  return (
    <header className={classes.header}>
      <Container size="xl">
        <Group justify="space-between" h="100%">
          <div className={classes.inner}>
            <h3>Gadget Management System</h3>
          </div>
          <Button component={Link} href="/login">
            Log in
          </Button>
        </Group>
      </Container>
    </header>
  );
}
