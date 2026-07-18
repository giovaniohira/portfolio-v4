export type Vertice = {
  id: string;
  angulo: number;
  distancia: number;
};

export type TopografiaInput = {
  x0: number;
  y0: number;
  azimuteInicial: number;
  vertices: Vertice[];
};

export type LadoResultado = {
  ponto: string;
  anguloMedido: number;
  anguloCorrigido: number;
  azimute: number;
  distancia: number;
  deltaX: number;
  deltaY: number;
  correcaoX: number;
  correcaoY: number;
  deltaXCorrigido: number;
  deltaYCorrigido: number;
  x: number;
  y: number;
};

export type TopografiaResultado = {
  n: number;
  somaAngulos: number;
  erroAngular: number;
  correcaoAngular: number;
  somaDistancias: number;
  fx: number;
  fy: number;
  erroLinear: number;
  precisao: string;
  lados: LadoResultado[];
};

const DEG = Math.PI / 180;

export function normalizarAzimute(az: number): number {
  return ((az % 360) + 360) % 360;
}

export function calcularPoligonal(input: TopografiaInput): TopografiaResultado {
  const { x0, y0, azimuteInicial, vertices } = input;
  const n = vertices.length;

  if (n < 3) {
    throw new Error("Informe pelo menos 3 vértices.");
  }

  const angulos = vertices.map((v) => v.angulo);
  const distancias = vertices.map((v) => v.distancia);
  const somaAngulos = angulos.reduce((a, b) => a + b, 0);
  const erroAngular = somaAngulos - (n - 2) * 180;
  const correcaoAngular = -erroAngular / n;
  const angulosCorrigidos = angulos.map((a) => a + correcaoAngular);

  let azimute = normalizarAzimute(azimuteInicial);
  const lados: LadoResultado[] = [];
  let x = x0;
  let y = y0;
  let fx = 0;
  let fy = 0;

  for (let i = 0; i < n; i++) {
    const d = distancias[i];
    const azRad = azimute * DEG;
    const deltaX = d * Math.sin(azRad);
    const deltaY = d * Math.cos(azRad);
    fx += deltaX;
    fy += deltaY;

    lados.push({
      ponto: vertices[i].id || `E${i + 1}`,
      anguloMedido: angulos[i],
      anguloCorrigido: angulosCorrigidos[i],
      azimute,
      distancia: d,
      deltaX,
      deltaY,
      correcaoX: 0,
      correcaoY: 0,
      deltaXCorrigido: deltaX,
      deltaYCorrigido: deltaY,
      x: 0,
      y: 0,
    });

    azimute = normalizarAzimute(azimute + 180 - angulosCorrigidos[i]);
  }

  const somaDistancias = distancias.reduce((a, b) => a + b, 0);
  const erroLinear = Math.hypot(fx, fy);
  const precisao =
    erroLinear > 0 ? `1 : ${Math.round(somaDistancias / erroLinear)}` : "∞";

  x = x0;
  y = y0;
  for (let i = 0; i < n; i++) {
    const d = distancias[i];
    const cx = somaDistancias > 0 ? -fx * (d / somaDistancias) : 0;
    const cy = somaDistancias > 0 ? -fy * (d / somaDistancias) : 0;
    const dxC = lados[i].deltaX + cx;
    const dyC = lados[i].deltaY + cy;

    x += dxC;
    y += dyC;

    lados[i].correcaoX = cx;
    lados[i].correcaoY = cy;
    lados[i].deltaXCorrigido = dxC;
    lados[i].deltaYCorrigido = dyC;
    lados[i].x = x;
    lados[i].y = y;
  }

  return {
    n,
    somaAngulos,
    erroAngular,
    correcaoAngular,
    somaDistancias,
    fx,
    fy,
    erroLinear,
    precisao,
    lados,
  };
}

// ponytail: self-check com exemplo da especificação
if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
  const r = calcularPoligonal({
    x0: 1000,
    y0: 1000,
    azimuteInicial: 45,
    vertices: [
      { id: "E1", angulo: 95.2345, distancia: 32.55 },
      { id: "E2", angulo: 132.6548, distancia: 48.91 },
      { id: "E3", angulo: 86.3341, distancia: 40.72 },
      { id: "E4", angulo: 45.7766, distancia: 29.83 },
    ],
  });
  console.assert(Math.abs(r.erroAngular) < 1e-6, "erro angular deve ser ~0");
}
