"use client";
import { Container } from "@mantine/core";
import { HeaderMenu } from "./components/header/HeaderMenu";
import { TableSelection } from "./components/table/TableSelection";
import { Gadget } from "./types/gadget.type";

export default function HomePage() {

  const data: Gadget[] = [
    {
      id: 1,
      name: "Laptop",
      description: "Dell XPS 13",
      created: "2025-01-01T10:00:00Z",
      last_modified: "2025-01-01T10:00:00Z",
    },
    {
      id: 2,
      name: "Laptop",
      description: "Macbook Air M3",
      created: "2025-01-01T10:00:00Z",
      last_modified: "2025-01-01T10:00:00Z",
    },
  ];

  return (
    <div>
      <HeaderMenu />
      <Container size="xl">
        <TableSelection data={data} />
      </Container>
    </div>
  );
}
