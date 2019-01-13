import { TimeKeeper } from '../../src/timekeeper/timekeeper';
import { sendTimingsFactory, domReady, globalThis } from '../utils';

export type InteractiveOptions = {
	minLatency: number;
}

const defaultOptions: InteractiveOptions = {
	minLatency: 100,
};

export function interactiveTimings(keeper: TimeKeeper, options: InteractiveOptions = defaultOptions) {
	const sendTimings = sendTimingsFactory('tk-interactive', keeper);
	const now = () => keeper.perf.now();
	const firstWinEvents = [
		'click',
		'touchup',
		'submit',

		'abort',
		'blur',
		'contextmenu',
		'deviceorientation',
		'offline',
		'online',
		'paint',
		'popstate',
		'resize',
		'wheel',
		'scroll',
	];

	function send(groupName: string, label: string,  start: number = 0, end: number = now()) {
		sendTimings(groupName, start, end, [
			[label, start, end],
		])
	}

	// Window
	once(firstWinEvents, (eventType) => {
		send(`first-${eventType}`, 'value');
	});

	// Tab unload
	once(['beforeunload'], () => {
		send(`tab-unload`, 'value');
	});

	// Latency
	[
		'click',
		'touchup',
		'input',
		'submit',
		'resize',
		'scroll',
	].forEach((eventType) => {
		let start: number;

		function calc() {
			const end = now();

			if (end - start >= options.minLatency) {
				send(`latency-${eventType}`, 'value', start, end);
			}
		}

		globalThis.addEventListener(eventType, () => {
			start = now();
			requestAnimationFrame(calc);
		}, true);
	})

	// After DOM Ready
	domReady(() => {
		once(firstWinEvents, (eventType) => {
			send(`first-${eventType}`, `after-ready`);
		});
	});
}

function once(events: string[], fn: (eventType: string) => void, ctx?: Document | Window) {
	events.forEach(name => {
		const handle = () => {
			globalThis.removeEventListener(name, handle, true);
			fn(name);
		};

		(ctx = ctx || globalThis).addEventListener(name, handle, true);
	});
}