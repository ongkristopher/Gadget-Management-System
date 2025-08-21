import { useState } from "react";
import cx from "clsx";
import {
  Button,
  Checkbox,
  Group,
  ScrollArea,
  Table,
  Text,
  Notification,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import classes from "./TableSelection.module.css";
import { formatDate } from "../../utils/format-date";
import { IconTrash } from "@tabler/icons-react";
import { IconDeviceTabletSearch } from "@tabler/icons-react";
import { IconFilePlus } from "@tabler/icons-react";
import { Gadget } from "../../types/gadget.type";
import { GadgetModal } from "../modal/gadgets/Gadgets";
import api from "../../utils/axios";

export function TableSelection({
  data,
  fetchGadgets,
}: {
  data: Gadget[];
  fetchGadgets: () => void;
  }) {
  const [error, setError] = useState("");
  const [gadgetModalOpened, setGadgetModalOpened] = useState(false);
  const [editingGadget, setEditingGadget] = useState<Gadget | null>(null);
  const [selection, setSelection] = useState<Gadget["id"][]>([]);
  const toggleRow = (id: Gadget["id"]) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const handleOpenModal = () => {
    setEditingGadget(null);
    setGadgetModalOpened(true);
  };

  const handleCloseModal = () => {
    setGadgetModalOpened(false);
    fetchGadgets();
  }

  const handleDeleteGadget = async(ids: Gadget["id"] | Gadget["id"][]) => {
    try {
      if (typeof ids === "number") {
        await api.delete(`gadgets/${ids}/`);
      } else {
        await Promise.all(ids.map((id) => api.delete(`gadgets/${id}/`)));
      }
      setSelection([]);
      fetchGadgets();
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      } else {
        setError("Failed to delete gadget/s. Check console.");
        console.error(err);
      }
    }
  }

  const confirmDelete = (ids: Gadget["id"] | Gadget["id"][]) => {
    modals.openConfirmModal({
      title: "Confirm deletion",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete the selected gadget(s)?
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => handleDeleteGadget(ids),
    });
  };

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
        <Table.Td>
          {item.last_modified ? formatDate(item.last_modified) : ""}
        </Table.Td>
        <Table.Td>
          <Group>
            <Button color="red" onClick={() => confirmDelete(item.id)}>
              <IconTrash stroke={1.25} />
            </Button>
            <Button
              color="green"
              onClick={() => {
                setEditingGadget(item);
                setGadgetModalOpened(true);
              }}
            >
              <IconDeviceTabletSearch stroke={1.25} />
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div>
      {error && (
        <Notification color="red" mb="md">
          {error}
        </Notification>
      )}
      <Group mb="sm" justify="flex-end">
        <Button
          color="red"
          disabled={selection.length === 0}
          leftSection={<IconTrash stroke={1.25} />}
          onClick={() => confirmDelete(selection)}
        >
          Delete selected ({selection.length})
        </Button>
        <Button
          color="green"
          leftSection={<IconFilePlus stroke={1.25} />}
          onClick={() => handleOpenModal()}
        >
          Create Gadget
        </Button>
      </Group>
      <ScrollArea>
        <Table miw={800} verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={40}>
                {data.length > 0 && (
                  <Checkbox
                    onChange={toggleAll}
                    checked={selection.length === data.length}
                    indeterminate={
                      selection.length > 0 && selection.length !== data.length
                    }
                  />
                )}
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
      <GadgetModal
        opened={gadgetModalOpened}
        onClose={handleCloseModal}
        gadget={editingGadget}
      />
    </div>
  );
}
