"use client";

import { useState } from "react";
import {
  calcularPoligonal,
  type TopografiaResultado,
  type Vertice,
} from "@/lib/topografia";

const EXEMPLO: Vertice[] = [
  { id: "E1", angulo: 95.2345, distancia: 32.55 },
  { id: "E2", angulo: 132.6548, distancia: 48.91 },
  { id: "E3", angulo: 86.3341, distancia: 40.72 },
  { id: "E4", angulo: 45.7766, distancia: 29.83 },
];

function fmt(n: number, dec = 4) {
  return n.toFixed(dec);
}

function novoVertice(i: number): Vertice {
  return { id: `E${i}`, angulo: 0, distancia: 0 };
}

export default function TopografiaCalculator() {
  const [x0, setX0] = useState("1000");
  const [y0, setY0] = useState("1000");
  const [azimute, setAzimute] = useState("45");
  const [vertices, setVertices] = useState<Vertice[]>(EXEMPLO);
  const [resultado, setResultado] = useState<TopografiaResultado | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  function atualizarVertice(i: number, campo: keyof Vertice, valor: string) {
    setVertices((prev) =>
      prev.map((v, j) =>
        j === i
          ? {
              ...v,
              [campo]:
                campo === "id" ? valor : parseFloat(valor.replace(",", ".")) || 0,
            }
          : v,
      ),
    );
  }

  function calcular() {
    try {
      setErro(null);
      const r = calcularPoligonal({
        x0: parseFloat(x0.replace(",", ".")),
        y0: parseFloat(y0.replace(",", ".")),
        azimuteInicial: parseFloat(azimute.replace(",", ".")),
        vertices,
      });
      setResultado(r);
    } catch (e) {
      setResultado(null);
      setErro(e instanceof Error ? e.message : "Erro ao calcular.");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-widest text-highlight">
          Topografia
        </p>
        <h1 className="font-clash mt-2 text-3xl font-semibold text-primary md:text-4xl">
          Poligonal fechada — Bowditch
        </h1>
        <p className="mt-3 max-w-2xl text-secondary">
          Cálculo de fechamento angular, azimutes, projeções e correção de
          Bowditch para poligonais com ângulos internos.
        </p>
      </header>

      <section className="mb-8 rounded-xl border border-border bg-bg-800 p-6">
        <h2 className="font-clash mb-4 text-lg font-medium text-primary">
          Dados iniciais
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1 block text-sm text-muted">X₀ (m)</span>
            <input
              type="text"
              value={x0}
              onChange={(e) => setX0(e.target.value)}
              className="w-full rounded-lg border border-border bg-bg-900 px-3 py-2 text-primary outline-none focus:border-highlight"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-muted">Y₀ (m)</span>
            <input
              type="text"
              value={y0}
              onChange={(e) => setY0(e.target.value)}
              className="w-full rounded-lg border border-border bg-bg-900 px-3 py-2 text-primary outline-none focus:border-highlight"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-muted">
              Azimute inicial (°)
            </span>
            <input
              type="text"
              value={azimute}
              onChange={(e) => setAzimute(e.target.value)}
              className="w-full rounded-lg border border-border bg-bg-900 px-3 py-2 text-primary outline-none focus:border-highlight"
            />
          </label>
        </div>
      </section>

      <section className="mb-8 rounded-xl border border-border bg-bg-800 p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-clash text-lg font-medium text-primary">
            Vértices
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setVertices(EXEMPLO)}
              className="rounded-lg border border-border px-3 py-1.5 text-sm text-secondary transition hover:border-highlight hover:text-primary"
            >
              Exemplo
            </button>
            <button
              type="button"
              onClick={() =>
                setVertices((v) => [...v, novoVertice(v.length + 1)])
              }
              className="rounded-lg border border-border px-3 py-1.5 text-sm text-secondary transition hover:border-highlight hover:text-primary"
            >
              + Vértice
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="py-2 pr-4">Ponto</th>
                <th className="py-2 pr-4">Ângulo interno (°)</th>
                <th className="py-2 pr-4">Distância (m)</th>
                <th className="py-2" />
              </tr>
            </thead>
            <tbody>
              {vertices.map((v, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2 pr-4">
                    <input
                      type="text"
                      value={v.id}
                      onChange={(e) =>
                        atualizarVertice(i, "id", e.target.value)
                      }
                      className="w-20 rounded border border-border bg-bg-900 px-2 py-1 text-primary"
                    />
                  </td>
                  <td className="py-2 pr-4">
                    <input
                      type="text"
                      value={v.angulo}
                      onChange={(e) =>
                        atualizarVertice(i, "angulo", e.target.value)
                      }
                      className="w-full rounded border border-border bg-bg-900 px-2 py-1 text-primary"
                    />
                  </td>
                  <td className="py-2 pr-4">
                    <input
                      type="text"
                      value={v.distancia}
                      onChange={(e) =>
                        atualizarVertice(i, "distancia", e.target.value)
                      }
                      className="w-full rounded border border-border bg-bg-900 px-2 py-1 text-primary"
                    />
                  </td>
                  <td className="py-2">
                    {vertices.length > 3 && (
                      <button
                        type="button"
                        onClick={() =>
                          setVertices((prev) =>
                            prev.filter((_, j) => j !== i),
                          )
                        }
                        className="text-muted transition hover:text-red-400"
                        aria-label="Remover vértice"
                      >
                        ✕
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={calcular}
          className="mt-6 rounded-lg bg-highlight px-6 py-2.5 font-medium text-inverse transition hover:brightness-110"
        >
          Calcular
        </button>
        {erro && <p className="mt-3 text-sm text-red-400">{erro}</p>}
      </section>

      {resultado && (
        <>
          <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Erro angular (Eₐ)",
                value: `${fmt(resultado.erroAngular, 6)}°`,
              },
              {
                label: "Correção angular (Cₐ)",
                value: `${fmt(resultado.correcaoAngular, 6)}°`,
              },
              {
                label: "Erro linear (EL)",
                value: `${fmt(resultado.erroLinear, 4)} m`,
              },
              { label: "Precisão", value: resultado.precisao },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-bg-800 p-4"
              >
                <p className="text-xs text-muted">{item.label}</p>
                <p className="font-clash mt-1 text-xl font-medium text-primary">
                  {item.value}
                </p>
              </div>
            ))}
          </section>

          <section className="mb-8 rounded-xl border border-border bg-bg-800 p-6">
            <h2 className="font-clash mb-4 text-lg font-medium text-primary">
              Resumo do fechamento
            </h2>
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted">Σ ângulos</dt>
                <dd className="text-primary">
                  {fmt(resultado.somaAngulos, 4)}°
                </dd>
              </div>
              <div>
                <dt className="text-muted">Σ distâncias</dt>
                <dd className="text-primary">
                  {fmt(resultado.somaDistancias, 2)} m
                </dd>
              </div>
              <div>
                <dt className="text-muted">fₓ = Σ ΔX</dt>
                <dd className="text-primary">{fmt(resultado.fx, 4)} m</dd>
              </div>
              <div>
                <dt className="text-muted">fᵧ = Σ ΔY</dt>
                <dd className="text-primary">{fmt(resultado.fy, 4)} m</dd>
              </div>
            </dl>
          </section>

          <section className="overflow-x-auto rounded-xl border border-border bg-bg-800 p-6">
            <h2 className="font-clash mb-4 text-lg font-medium text-primary">
              Resultados por vértice
            </h2>
            <table className="w-full min-w-[900px] text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-border text-muted">
                  <th className="py-2 pr-3">Ponto</th>
                  <th className="py-2 pr-3">θ medido</th>
                  <th className="py-2 pr-3">θ corrigido</th>
                  <th className="py-2 pr-3">Azimute</th>
                  <th className="py-2 pr-3">Dist.</th>
                  <th className="py-2 pr-3">ΔX</th>
                  <th className="py-2 pr-3">ΔY</th>
                  <th className="py-2 pr-3">Cₓ</th>
                  <th className="py-2 pr-3">Cᵧ</th>
                  <th className="py-2 pr-3">ΔX corr.</th>
                  <th className="py-2 pr-3">ΔY corr.</th>
                  <th className="py-2 pr-3">X</th>
                  <th className="py-2">Y</th>
                </tr>
              </thead>
              <tbody>
                {resultado.lados.map((l) => (
                  <tr key={l.ponto} className="border-b border-border/50">
                    <td className="py-2 pr-3 font-medium text-primary">
                      {l.ponto}
                    </td>
                    <td className="py-2 pr-3">{fmt(l.anguloMedido)}</td>
                    <td className="py-2 pr-3">{fmt(l.anguloCorrigido)}</td>
                    <td className="py-2 pr-3">{fmt(l.azimute)}</td>
                    <td className="py-2 pr-3">{fmt(l.distancia, 2)}</td>
                    <td className="py-2 pr-3">{fmt(l.deltaX)}</td>
                    <td className="py-2 pr-3">{fmt(l.deltaY)}</td>
                    <td className="py-2 pr-3">{fmt(l.correcaoX, 6)}</td>
                    <td className="py-2 pr-3">{fmt(l.correcaoY, 6)}</td>
                    <td className="py-2 pr-3">{fmt(l.deltaXCorrigido)}</td>
                    <td className="py-2 pr-3">{fmt(l.deltaYCorrigido)}</td>
                    <td className="py-2 pr-3 text-highlight">{fmt(l.x, 3)}</td>
                    <td className="py-2 text-highlight">{fmt(l.y, 3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      <footer className="mt-12 border-t border-border pt-6 text-center text-xs text-muted">
        <a
          href="https://giovaniohira.com"
          className="transition hover:text-highlight"
        >
          giovaniohira.com
        </a>
      </footer>
    </div>
  );
}
