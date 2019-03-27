import { Entry } from '../../src/keeper/keeper';
import { AnalyticsOptions, globalThis, getOption } from '../utils';

type MailRuAnalyticsParams = {
	group: string;
	label: string;
	value: number;
};

type MailRuAnalytics = (packet: string) => void;

type MaulRuContext = Window & {
	require: (module: string) => MailRuAnalytics;
	xray: MailRuAnalytics;
};

export function mailruAnalytics(options?: AnalyticsOptions & {project?: string}, xray?: MailRuAnalytics) {
	const prefix = getOption(options, 'prefix');
	const project = getOption(options, 'project');
	const useTabName = getOption(options, 'useTabName');
	const queue = [] as MailRuAnalyticsParams[];
	const send = (params: MailRuAnalyticsParams) => {
		if (xray) {
			const {
				group,
				label,
				value,
			} = params;

			xray(`${prefix}${group}_${label}&v=${value}${(project ? `&p=${project}` : '')}`);

			if (useTabName) {
				xray(
					`${prefix}${group}_${label}_${useTabName(globalThis.location)}&v=${value}`
					+ (project ? `&p=${project}` : '')
				);
			}
		} else {
			queue.push(params);
		}
	};

	if (!xray) {
		(function check() {
			xray = get();
			if (xray) {
				queue.forEach(send);
				queue.length = 0;
			} else {
				setTimeout(check, 500);
			}
		})();
	}

	return (entry: Entry) => {
		let group = entry.name;
		let label = 'value';
		let cursor = entry.parent;

		if (cursor) {
			label = entry.name;

			while (true) {
				if (cursor.parent) {
					label = `${cursor.name}_${name}`;
					cursor = cursor.parent;
				} else {
					group = cursor.name;
					break;
				}
			}
		}

		send({
			group,
			label,
			value: entry.end - entry.start,
		});
	};
}

function get(): MailRuAnalytics {
	const require = (globalThis as MaulRuContext).require;
	let xray = (globalThis as MaulRuContext).xray;

	try {
		xray = require('@mail/xray');
	} catch (_) {
		try {
			xray = require('mrg-xray');
		} catch (_) {}
	}

	return typeof xray === 'function' ? xray : null;
}