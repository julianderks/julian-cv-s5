import { z } from 'zod';

export const toolSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Tool name must be at least 2 characters long' })
		.max(50, { message: 'Tool name must be at most 50 characters long' }),
	area: z
		.string()
		.min(2, { message: 'Area must be at least 2 characters long' })
		.max(50, { message: 'Area must be at most 50 characters long' }),
	experience_level: z
		.number()
		.min(1, { message: 'Experience level must be at least 1' })
		.max(5, { message: 'Experience level must be at most 5' }),
	introduction: z
		.string()
		.min(10, { message: 'Introduction must be at least 10 characters long' })
		.max(1000, { message: 'Introduction must be at most 1000 characters long' }),
	personal_experience: z
		.string()
		.min(10, { message: 'Personal experience must be at least 10 characters long' })
		.max(1000, { message: 'Personal experience must be at most 1000 characters long' }),
	link_to_docs: z.string().url({ message: 'Link to documentation must be a valid URL' }),
	icon: z.string().url({ message: 'Icon link must be a valid URL' })
});

export type ToolSchema = typeof toolSchema;
