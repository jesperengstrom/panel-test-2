import Cookies from 'js-cookie'
import type { UserSettings as UserSettingsType } from '$lib/types/userSettings';

enum availableSettings {
	leadingPane = 'leadingPane',
	trailingPanes = 'trailingPanes'
}

export class UserSettings {
	private settings: UserSettingsType = $state({});

	constructor(settings: UserSettingsType = { leadingPane: { open: true }}) {
		this.settings = settings;

		// set default
		if (!settings?.hasOwnProperty('leadingPane')) {
			this.settings = {
				...this.settings,
				...{ leadingPane: { open: true } }
			}
		}
	}

	private update(setting: keyof typeof availableSettings, v: any) {
		if (setting in availableSettings) {
			const settingsObj = {
				...this.settings,
				...{ [setting]: v }
			};

			this.settings = settingsObj;
			this.setCookie(settingsObj);
		}
	}

	private setCookie(value: UserSettingsType) {
		Cookies.set('userSettings', JSON.stringify(value), {
			expires: 365,
			secure: true,
			sameSite: 'strict'
		});
	}

	setLeadingPaneWidth(width: number) {
		const leadingPane = { ...this.settings?.leadingPane };
		leadingPane.width = width;
		this.update('leadingPane', leadingPane);
	}

	// setRightPaneWidth(width: number) {
	// 	const rightPane = { ...this.settings?.rightPane };
	// 	rightPane.width = width;
	// 	this.update('rightPane', rightPane);
	// }

	toggleLeadingPane() {
		const newState = !this.settings?.leadingPane?.open
		const leadingPane = { ...this.settings?.leadingPane };
		leadingPane.open = newState;
		this.update('leadingPane', leadingPane);
	}

	// setRightPaneOpen(open: boolean) {
	// 	const rightPane = { ...this.settings?.rightPane };
	// 	rightPane.open = open;
	// 	this.update('rightPane', rightPane);
	// }

	get leadingPane() {
		return this.settings?.leadingPane;
	}

	// get rightPane() {
	// 	return this.settings?.rightPane;
	// }
}