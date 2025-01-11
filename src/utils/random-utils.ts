/**
 * Utility class for generating random values and performing random operations.
 */
class RandomUtils {
	/**
	 * Generates a random string of the specified length.
	 * @param {number} length - The length of the random string to generate.
	 * @returns {string} The generated random string.
	 */
	public randomString(length: number): string {
		// Define characters
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		// Generate random string
		return Array.from(
			{ length },
			() => characters[Math.floor(Math.random() * characters.length)]
		).join('');
	}

	/**
	 * Shuffles an array in random order.
	 * @param {any[]} array - The array to shuffle.
	 * @returns {any[]} The shuffled array.
	 */
	public shuffleArray(array: any[]): any[] {
		// Shuffle an array
		return array.sort(() => Math.random() - 0.5);
	}

	/**
	 * Selects a random element from an array.
	 * @template T
	 * @param {T[]} choices - The array of choices to select from.
	 * @returns {T} The randomly selected element.
	 */
	public randomChoice<T>(choices: T[]): T {
		// Choose a random element from an array
		return choices[Math.floor(Math.random() * choices.length)];
	}

	/**
	 * Generates a random hexadecimal color code.
	 * @returns {string} The generated random color code. (e.g., #FFFFFF)
	 */
	public randomColor(): string {
		// Generate a random color
		const randomColor: string = '#' + Math.floor(Math.random() * 16777215).toString(16);
		return randomColor.length === 7 ? randomColor : this.randomColor();
	}

	/**
	 * Generates a random number within the specified range.
	 * @param {number} min - The minimum value of the range.
	 * @param {number} max - The maximum value of the range.
	 */
	public randomNumber(min: number, max: number): number {
		// Generate a random number
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}

export { RandomUtils };
