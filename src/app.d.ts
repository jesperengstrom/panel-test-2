// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import { type UserSettings } from '$lib/types/userSettings';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userSettings: UserSettings
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
