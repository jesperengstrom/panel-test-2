<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { setUserSettings } from '$lib/contexts/userSettings';
	setUserSettings(page.data.userSettings);
	
	let { children } = $props();
</script>

{@render children()}
