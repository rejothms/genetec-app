
// Basic sanitization to prevent XSS and injection
export function sanitizeInput(input: string): string {

	return input
		.replace(/<script.*?>.*?<\/script>/gi, "")
		.replace(/[&<>'"`]/g, (char) => {
			const map: Record<string, string> = {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#x27;',
				'`': '&#x60;',
			};
			return map[char] || char;
		});
}

export function validateTitle(title: string): string | null {
	if (!title.trim()) return "Title is required";
	if (title.length > 100) return "Title is too long";
	// Only allow letters, numbers, spaces, and basic punctuation
	if (!/^[\w\s.,:;!?()\-']+$/.test(title)) return "Invalid characters in title";
	return null;
}
export function validateDescription(description: string): string | null {
	if (description.length > 500) return "Description is too long";
	return null;
}


