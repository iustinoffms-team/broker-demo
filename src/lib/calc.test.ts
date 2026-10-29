import { describe, expect, it } from "vitest";
import { calculCuAvans, calculRata, calculRefinantare, capacitateImprumut, rataLunara } from "./calc";
import { leadSchema } from "./lead";

describe("rataLunara", () => {
  it("se potrivește cu exemplul din design: 300.000 lei, 30 ani, 5,5%", () => {
    expect(Math.round(rataLunara(300000, 30, 5.5))).toBe(1703);
  });
  it("împarte egal la dobândă zero", () => {
    expect(rataLunara(120000, 10, 0)).toBe(1000);
  });
  it("întoarce 0 pentru sumă sau perioadă invalidă", () => {
    expect(rataLunara(0, 30, 5)).toBe(0);
    expect(rataLunara(100000, 0, 5)).toBe(0);
  });
});

describe("calculRata", () => {
  it("total = rata × luni, dobânda = total − principal", () => {
    const r = calculRata(300000, 30, 5.5);
    expect(r.total).toBeCloseTo(r.rata * 360, 6);
    expect(r.dobandaTotala).toBeCloseTo(r.total - 300000, 6);
    expect(r.venitMinim).toBeCloseTo(r.rata / 0.4, 6);
  });
});

describe("capacitateImprumut", () => {
  it("este inversa ratei lunare", () => {
    const { rataMaxima, sumaMaxima } = capacitateImprumut(8000, 500, 30, 5.5);
    expect(rataMaxima).toBe(2700);
    expect(rataLunara(sumaMaxima, 30, 5.5)).toBeCloseTo(2700, 6);
  });
  it("întoarce 0 când ratele existente depășesc gradul de îndatorare", () => {
    expect(capacitateImprumut(3000, 1500, 30, 5.5).sumaMaxima).toBe(0);
  });
});

describe("calculRefinantare", () => {
  it("economisește când dobânda nouă e mai mică", () => {
    const r = calculRefinantare(250000, 25, 8, 5.5);
    expect(r.economieLunara).toBeGreaterThan(0);
    expect(r.economieTotala).toBeCloseTo(r.economieLunara * 300, 6);
  });
});

describe("calculCuAvans", () => {
  it("scade avansul de 5% din preț", () => {
    const r = calculCuAvans(400000, 5, 30, 5.5);
    expect(r.avans).toBe(20000);
    expect(r.credit).toBe(380000);
  });
});

describe("leadSchema", () => {
  const base = { nume: "Popescu", prenume: "Ana", tipCredit: "Credit ipotecar", acord: true } as const;
  it("acceptă doar telefon", () => {
    expect(leadSchema.safeParse({ ...base, telefon: "0722 123 456" }).success).toBe(true);
  });
  it("acceptă doar email", () => {
    expect(leadSchema.safeParse({ ...base, email: "ana@example.ro" }).success).toBe(true);
  });
  it("cere telefon sau email", () => {
    expect(leadSchema.safeParse(base).success).toBe(false);
  });
  it("respinge telefon invalid și lipsa acordului", () => {
    expect(leadSchema.safeParse({ ...base, telefon: "12345" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...base, telefon: "0722123456", acord: false }).success).toBe(false);
  });
});
