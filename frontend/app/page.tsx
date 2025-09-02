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
      return;
    }

    fetchGadgets();

    const socket = new WebSocket(
      `ws://localhost:8000/ws/gadgets/?token=${token}`
    );

    socket.onopen = () => console.log("Connected to WebSocket");

    socket.onmessage = (event) => {
      console.log(event)
      const data = JSON.parse(event.data);

      setGadgets(data.gadgets);
    };

    socket.onclose = () => console.log("WebSocket closed");

    return () => socket.close();
  }, [router, fetchGadgets]);
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
