"use client";

import {
  Modal,
  Button,
  Stack,
  Textarea,
  TextInput,
  Notification,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gadget } from "../../../types/gadget.type";
import { useEffect, useState } from "react";
import api from "../../../utils/axios";

const gadgetSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

type GadgetFormValues = z.infer<typeof gadgetSchema>;

interface GadgetModalProps {
  opened: boolean;
  onClose: () => void;
  gadget?: Gadget | null;
}

export function GadgetModal({ opened, onClose, gadget }: GadgetModalProps) {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GadgetFormValues>({
    resolver: zodResolver(gadgetSchema),
    defaultValues: {
      name: gadget?.name ?? "",
      description: gadget?.description ?? "",
    },
  });

  // reset form when gadget changes
  useEffect(() => {
    reset({
      name: gadget?.name ?? "",
      description: gadget?.description ?? "",
    });
  }, [gadget, reset]);

  const submitHandler = (values: GadgetFormValues) => {
    if (gadget?.id) {
      handleEditGadget(values, gadget.id);
    } else {
      handleAddGadget(values);
    }
  };

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const handleAddGadget = async (values: {
    name: Gadget["name"];
    description: Gadget["description"];
  }) => {
    try {
      await api.post("gadgets/", {
        name: values.name,
        description: values.description,
      });
      reset();
      onClose();
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      } else {
        setError("check console for more information about the error");
        console.error(err);
      }
    }
  };

  const handleEditGadget = async (
    values: { name: Gadget["name"]; description: Gadget["description"] },
    id?: Gadget["id"]
  ) => {
    try {
      await api.patch(`gadgets/${id}/`, {
        name: values.name,
        description: values.description,
      });
      reset();
      onClose();
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      } else {
        setError("check console for more information about the error");
        console.error(err);
      }
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleCloseModal}
      title={gadget ? "Edit Gadget" : "Add New Gadget"}
      size="lg"
    >
      {error && (
        <Notification color="red" mb="md">
          {error}
        </Notification>
      )}
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack gap="md">
          <TextInput
            label="Name"
            placeholder="Enter gadget name"
            {...register("name")}
            error={errors.name?.message}
            withAsterisk
          />

          <Textarea
            label="Description"
            placeholder="Enter gadget description"
            minRows={3}
            {...register("description")}
            error={errors.description?.message}
            withAsterisk
          />

          <Button type="submit" color="green">
            {gadget ? "Update Gadget" : "Save Gadget"}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
