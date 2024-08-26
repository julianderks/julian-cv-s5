import { supabase } from '$lib/supabaseClient';

export interface Tool {
	name: string;
	iconify_icon_name?: string;
	custom_icon_link?: string;
	experience_level: number;
	description: {
		introduction: string;
		used_where: string;
	};
	area: string;
	docs_link: string;
}

export async function fetchTools(): Promise<{ tools: Tool[]; error?: string }> {
	const { data: tools, error } = await supabase.from('tools').select('*'); // Adjust the select fields based on your table schema

	if (error) {
		console.error('Error fetching tools:', error.message);
		return { tools: [], error: error.message };
	}

	return { tools: tools || [] };
}
