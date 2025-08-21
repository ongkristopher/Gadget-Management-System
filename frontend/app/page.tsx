"use client";
import { Container } from "@mantine/core";
import { HeaderMenu } from "./components/header/HeaderMenu";
import { TableSelection } from "./components/table/TableSelection";
import { Gadget } from "./types/gadget.type";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import api from "./utils/axios";

export default function HomePage() {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchGadgets = useCallback(async () => {
    try {
      const res = await api.get("gadgets/");
      setGadgets(res.data);
    } catch (err) {
      console.error("Failed to fetch gadgets:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/login");
    } else {
      fetchGadgets();
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <HeaderMenu />
      <Container size="xl">
        <TableSelection data={gadgets} fetchGadgets={fetchGadgets} />
      </Container>
    </div>
  );
}
