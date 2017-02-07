/**
 * @param a
 * @param b
 * @param max - Max included value
 */
export function add(a: number | undefined, b: number, max: number): number {
	const result = ((a || 0) + b) % (max + 1);
	return result < 0 ? result + max + 1 : result;
}