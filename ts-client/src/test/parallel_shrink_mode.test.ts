import { getParallelChunkShrinkMode } from "../dlmm/helpers";
import { chunkBinRange } from "../dlmm/helpers/positions";
import { ShrinkMode } from "../dlmm/types";

const modesFor = (minBinId: number, maxBinId: number) => {
  const chunkCount = chunkBinRange(minBinId, maxBinId).length;
  return Array.from({ length: chunkCount }, (_, i) =>
    getParallelChunkShrinkMode(i, chunkCount),
  );
};

describe("getParallelChunkShrinkMode", () => {
  test("first chunk never shrinks right, last chunk never shrinks left", () => {
    expect(modesFor(0, 139)).toEqual([
      ShrinkMode.NoShrinkRight,
      ShrinkMode.NoShrinkLeft,
    ]);
  });

  test("middle chunks never shrink either side", () => {
    expect(modesFor(0, 349)).toEqual([
      ShrinkMode.NoShrinkRight,
      ShrinkMode.NoShrinkBoth,
      ShrinkMode.NoShrinkBoth,
      ShrinkMode.NoShrinkBoth,
      ShrinkMode.NoShrinkLeft,
    ]);
  });

  test("a single chunk keeps the first-chunk mode", () => {
    expect(modesFor(0, 69)).toEqual([ShrinkMode.NoShrinkRight]);
  });
});
