import { Button, Container, Group } from "@mantine/core";
import classes from "./HeaderMenu.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function HeaderMenu() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    router.push("/login");
  };


  return (
    <header className={classes.header}>
      <Container size="xl">
        <Group justify="space-between" h="100%">
          <div className={classes.inner}>
            <h3>Gadget Management System</h3>
          </div>
          <Button color="red" onClick={handleLogout}>
            Log out
          </Button>
        </Group>
      </Container>
    </header>
  );
}
