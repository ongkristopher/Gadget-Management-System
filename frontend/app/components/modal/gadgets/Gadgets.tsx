"use client";

import { Modal, Button, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gadget } from "../../../types/gadget.type";
import { useEffect } from "react";

const gadgetSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 2 characters"),
});

type GadgetFormValues = z.infer<typeof gadgetSchema>;

interface GadgetModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: GadgetFormValues, id?: number) => void;
  gadget?: Gadget | null;
}

export function GadgetModal({ opened, onClose, onSubmit, gadget }: GadgetModalProps) {
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
    onSubmit(values, gadget?.id);
    reset();
    onClose();
  };

  const handleCloseModal = () => {
    reset();
    onClose();
  }

  return (
    <Modal
      opened={opened}
      onClose={handleCloseModal}
      title={gadget ? "Edit Gadget" : "Add New Gadget"}
      size="lg"
    >
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
