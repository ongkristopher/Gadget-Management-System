import { useState } from "react";
import cx from "clsx";
import {
  Checkbox,
  Group,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import classes from "./TableSelection.module.css";
import { formatDate } from "../../utils/format-date";

const data = [
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

export function TableSelection() {
  const [selection, setSelection] = useState([0]);
  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr
        key={item.id}
        className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.description}</Table.Td>
        <Table.Td>{formatDate(item.created)}</Table.Td>
        <Table.Td>{formatDate(item.last_modified)}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={40}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
              />
            </Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th>Updated At</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
