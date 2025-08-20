"use client";
import { Container } from "@mantine/core";
import { HeaderMenu } from "./components/header/HeaderMenu";
import { TableSelection } from "./components/table/TableSelection";

export default function HomePage() {
  return (
    <div>
      <HeaderMenu />
      <Container size="xl">
        <TableSelection />
      </Container>
    </div>
  );
}
