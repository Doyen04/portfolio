export type BentoSpan = {
    col: number;
};

/**
 * Row shapes for a 6-column grid. Every shape's spans add up to 6, so each row
 * fills the grid exactly, and rows stack cleanly for any tile count.
 */
const ROW_SHAPES: number[][] = [
    [6],
    [3, 3],
    [4, 2],
    [2, 4],
    [2, 2, 2],
];

const MIXED_BONUS = 2;
const SHAPE_BONUS = 8;
const ROW_COST = 1;

const MASKS = 1 << ROW_SHAPES.length;
const rowBonus = ROW_SHAPES.map((row) => (new Set(row).size > 1 ? MIXED_BONUS : 0));

const cache = new Map<number, BentoSpan[]>();

/**
 * Picks the row sequence scoring highest, where a sequence earns points for
 * every distinct row shape and for mixed-width rows, minus one per row.
 *
 * Solved as a shortest-path over (shapes used, tiles filled) rather than by
 * enumerating sequences, so the cost stays linear in the tile count.
 */
function bestRows(count: number): number[][] {
    const dp: number[][] = Array.from({ length: MASKS }, () => new Array<number>(count + 1).fill(-Infinity));
    const via: number[][] = Array.from({ length: MASKS }, () => new Array<number>(count + 1).fill(-1));
    const from: number[][] = Array.from({ length: MASKS }, () => new Array<number>(count + 1).fill(-1));

    dp[0][0] = 0;

    // masks only ever gain bits and tiles only ever increase, so this is a
    // valid topological order
    for (let mask = 0; mask < MASKS; mask += 1) {
        for (let filled = 0; filled <= count; filled += 1) {
            const base = dp[mask][filled];
            if (base === -Infinity) continue;

            for (let shape = 0; shape < ROW_SHAPES.length; shape += 1) {
                const next = filled + ROW_SHAPES[shape].length;
                if (next > count) continue;

                const nextMask = mask | (1 << shape);
                const value = base + rowBonus[shape] - ROW_COST;
                if (value > dp[nextMask][next]) {
                    dp[nextMask][next] = value;
                    via[nextMask][next] = shape;
                    from[nextMask][next] = mask;
                }
            }
        }
    }

    let bestMask = 0;
    let bestScore = -Infinity;
    for (let mask = 1; mask < MASKS; mask += 1) {
        const total = dp[mask][count] + popcount(mask) * SHAPE_BONUS;
        if (total > bestScore) {
            bestScore = total;
            bestMask = mask;
        }
    }

    const rows: number[][] = [];
    let mask = bestMask;
    let filled = count;
    while (filled > 0) {
        const shape = via[mask][filled];
        const previous = from[mask][filled];
        rows.unshift(ROW_SHAPES[shape]);
        filled -= ROW_SHAPES[shape].length;
        mask = previous;
    }

    return rows;
}

function popcount(value: number) {
    let bits = value;
    let count = 0;
    while (bits) {
        bits &= bits - 1;
        count += 1;
    }
    return count;
}

/** Bento column spans for `count` tiles. */
export function bentoSpans(count: number): BentoSpan[] {
    if (count <= 0) return [];

    const cached = cache.get(count);
    if (cached) return cached;

    const spans = bestRows(count)
        .flat()
        .map((col) => ({ col }));

    cache.set(count, spans);

    return spans;
}
