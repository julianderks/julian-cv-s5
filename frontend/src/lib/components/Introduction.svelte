<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import { PUBLIC_SUPABASE_URL } from '$env/static/public';

	let cacheBuster = new Date().getTime();
	let avatarUrl = `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/blob-storage/profile/julian?t=${cacheBuster}`;
</script>

<Card.Root class="border-0 shadow-none">
	<Card.Header class="mb-2">
		<Card.Title class="text-4xl">Julian Derks</Card.Title>
		<Card.Description class="text-base">Data Engineer | DevOps Engineer</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="relative mb-8 flex justify-center">
			<Avatar.Root class="size-72 border-4 border-white">
				<Avatar.Image src={avatarUrl} alt="@shadcn" class="grayscale" />
				<Avatar.Fallback>JD</Avatar.Fallback>
			</Avatar.Root>
			<Dialog.Root>
				<Dialog.Trigger class="h-8 w-8">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-gray-100 hover:text-gray-500"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path
							d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7q.425 0 .713.288T13 4t-.288.713T12 5H5v14h14v-7q0-.425.288-.712T20 11t.713.288T21 12v7q0 .825-.587 1.413T19 21zm1-4h12l-3.75-5l-3 4L9 13zM17 7h-1q-.425 0-.712-.288T15 6t.288-.712T16 5h1V4q0-.425.288-.712T18 3t.713.288T19 4v1h1q.425 0 .713.288T21 6t-.288.713T20 7h-1v1q0 .425-.288.713T18 9t-.712-.288T17 8z"
						/>
					</svg>
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Upload New Avatar</Dialog.Title>
					</Dialog.Header>
					<Dialog.Description>
						<form method="POST" enctype="multipart/form-data" action="?/uploadImage">
							<input type="file" name="file" accept="image/*" />
							<button type="submit" class="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
								Upload
							</button>
						</form>
					</Dialog.Description>
					<Dialog.Footer>
						<Dialog.Close>Close</Dialog.Close>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</div>
		<div class="text-start">
			<h1 class="text-ring mb-0 text-lg underline">Introduction</h1>
			<p class="break-all text-sm">
				Former Data Scientist turned Data Engineer, currently exploring the world of DevOps with a
				focus on Kubernetes (GKE), Helm & Automated testing. My journey has equipped me with
				expertise in building data infrastructures like Data warehouses, Data lakehouses, and Delta
				lakes, utilizing tools such as PySpark, SQL, Databricks, and Terraform. I have experience
				across both Azure and GCP platforms, embracing challenges and opportunities to innovate
				within data and infrastructure management.
				<br />
				<br />
				Working as a consultant has exposed me to a variety of customers in different sectors, enriching
				my experience with diverse business needs and technological environments. This role has allowed
				me to not only assist organizations in harnessing their data to drive progress but also to continually
				expand my knowledge and skills with new tools and practices.
				<br />
				<br />
				I am passionate about learning new tech‐related things and enjoy working on hobby projects in
				my spare time. In fact, this very website is a result of a hobby project where I implemented
				a three‐tier app with Golang as the backend and Sveltekit/TypeScript/Tailwind CSS as the frontend!
			</p>
		</div>
	</Card.Content>
	<Card.Footer></Card.Footer>
</Card.Root>
