import type { Metadata } from "next";
import TopografiaCalculator from "./TopografiaCalculator";

export const metadata: Metadata = {
  title: "Poligonal Fechada — Topografia",
  description:
    "Calculadora de poligonal fechada com fechamento angular e correção de Bowditch.",
};

export default function TopografiaPage() {
  return <TopografiaCalculator />;
}
