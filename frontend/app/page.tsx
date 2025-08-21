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
    // I just casually put 9000ms here if there is no env available
    const pollingPeriod = parseInt(
      process.env.POLLING_INTERVAL_IN_MS ?? "9000"
    );
    if (!token) {
      router.push("/login");
    } else {
      // initial fetch
      fetchGadgets();

      // fetch based on env variable settings
      const interval = setInterval(() => {
        fetchGadgets();
      }, pollingPeriod);
      return () => clearInterval(interval);
    }
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
