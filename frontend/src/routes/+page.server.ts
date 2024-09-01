import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { toolSchema } from './schema';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async () => {
	const { data: tools, error: fetchError } = await supabase.from('tools').select('*');

	if (fetchError) {
		console.error('Error fetching tools:', fetchError.message);
		return {
			tools: [],
			form: await superValidate(zod(toolSchema))
		};
	}

	return {
		tools: tools,
		form: await superValidate(zod(toolSchema))
	};
};

export const actions: Actions = {
	add: async (event) => {
		const form = await superValidate(event, zod(toolSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { data, error: insertError } = await supabase
			.from('tools')
			.insert([
				{
					name: form.data.name,
					area: form.data.area,
					experience_level: form.data.experience_level,
					introduction: form.data.introduction,
					personal_experience: form.data.personal_experience,
					link_to_docs: form.data.link_to_docs,
					icon: form.data.icon
				}
			])
			.select();

		if (insertError) {
			console.error('Error inserting data:', insertError.message);
			return fail(500, {
				form,
				error: insertError.message
			});
		}

		return {
			form,
			createdTool: data
		};
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const toolName = formData.get('name');

		if (!toolName) {
			return fail(400, { error: 'Tool Name is missing' });
		}

		const { error } = await supabase.from('tools').delete().eq('name', toolName);

		if (error) {
			console.error('Error deleting tool:', error.message);
			return fail(500, {
				error: error.message
			});
		}

		return { success: true };
	},

	uploadImage: async ({ request }) => {
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return fail(400, { error: 'File is missing' });
		}
		console.log(formData);
		console.log(file);
		const filePath = 'profile/julian';

		const { data, error } = await supabase.storage.from('blob-storage').upload(filePath, file, {
			upsert: true
		});

		if (error) {
			console.error('Error uploading image:', error.message);
			return fail(500, {
				error: error.message
			});
		}

		return { success: true, data };
	}
};
