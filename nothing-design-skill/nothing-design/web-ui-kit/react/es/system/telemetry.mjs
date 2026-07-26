//#region src/system/telemetry.ts
const bootAt = Date.now();
let snap = {
	now: bootAt,
	bootAt,
	fps: 60,
	frameMs: 16.7,
	heapMB: 384,
	heapLimitMB: 4096,
	heapReal: false,
	battery: null,
	batteryReal: false,
	net: {
		downlink: 8.4,
		rtt: 24,
		type: "wifi"
	},
	netReal: false,
	online: true,
	velocity: 0,
	inputRate: 0
};
const listeners = /* @__PURE__ */ new Set();
const drawers = /* @__PURE__ */ new Set();
const events = /* @__PURE__ */ new Map();
let running = false;
let raf = 0;
let last = 0;
let pubAcc = 0;
let fpsEma = 60;
let vel = 0;
let velTarget = 0;
let lastMove = 0;
let simHeap = 384;
let simNet = 8.4;
let battery = null;
let batteryReal = false;
let autoSweep = true;
let sweepTimer = 0;
let bucketTimer = 0;
const buckets = /* @__PURE__ */ new Int16Array(60);
let bucketIdx = 0;
function notify() {
	for (const fn of listeners) fn();
}
function emit(name) {
	events.get(name)?.forEach((fn) => fn());
}
function readHeap() {
	const m = performance.memory;
	if (m?.usedJSHeapSize) return {
		mb: m.usedJSHeapSize / 1048576,
		lim: m.jsHeapSizeLimit / 1048576,
		real: true
	};
	simHeap = Math.min(880, Math.max(290, simHeap + (Math.random() - .5) * 16));
	return {
		mb: simHeap,
		lim: 4096,
		real: false
	};
}
function readNet() {
	const c = navigator.connection;
	if (c && typeof c.downlink === "number") return {
		net: {
			downlink: c.downlink,
			rtt: c.rtt ?? 25,
			type: c.effectiveType ?? "wifi"
		},
		real: true
	};
	simNet = Math.min(10, Math.max(5.2, simNet + (Math.random() - .5) * .8));
	return {
		net: {
			downlink: simNet,
			rtt: Math.round(18 + Math.random() * 14),
			type: "wifi"
		},
		real: false
	};
}
function publish() {
	const heap = readHeap();
	const { net, real: netReal } = readNet();
	let rate = 0;
	for (let i = 0; i < 60; i++) rate += buckets[i];
	snap = {
		now: Date.now(),
		bootAt,
		fps: Math.min(240, Math.round(fpsEma)),
		frameMs: 1e3 / Math.max(1, fpsEma),
		heapMB: heap.mb,
		heapLimitMB: heap.lim,
		heapReal: heap.real,
		battery,
		batteryReal,
		net,
		netReal,
		online: navigator.onLine,
		velocity: vel,
		inputRate: rate
	};
	notify();
}
function frame(t) {
	raf = requestAnimationFrame(frame);
	const dt = Math.min(.1, (t - last) / 1e3);
	last = t;
	if (dt > 0) fpsEma += (1 / Math.max(dt, 1e-4) - fpsEma) * .06;
	vel += (velTarget - vel) * Math.min(1, dt * 9);
	velTarget *= Math.max(0, 1 - dt * 3.2);
	for (const d of drawers) d(t / 1e3, dt);
	pubAcc += dt;
	if (pubAcc >= .5) {
		pubAcc = 0;
		publish();
	}
}
let distAcc = 0;
function onPointerMove(e) {
	const t = performance.now();
	const dt = (t - lastMove) / 1e3;
	lastMove = t;
	const d = Math.hypot(e.movementX, e.movementY);
	if (dt > 0 && dt < .2) velTarget = Math.min(4e3, d / dt);
	distAcc += d;
	while (distAcc >= 240) {
		buckets[bucketIdx]++;
		distAcc -= 240;
	}
}
function onInput() {
	buckets[bucketIdx]++;
}
function onVisibility() {
	if (document.hidden) cancelAnimationFrame(raf);
	else {
		last = performance.now();
		raf = requestAnimationFrame(frame);
	}
}
function startSweep() {
	clearInterval(sweepTimer);
	if (autoSweep) sweepTimer = window.setInterval(() => {
		if (!document.hidden) emit("sync");
	}, 45e3);
}
const bus = {
	get: () => snap,
	subscribe(fn) {
		listeners.add(fn);
		return () => void listeners.delete(fn);
	},
	draw(fn) {
		drawers.add(fn);
		return () => void drawers.delete(fn);
	},
	on(name, fn) {
		if (!events.has(name)) events.set(name, /* @__PURE__ */ new Set());
		events.get(name).add(fn);
		return () => void events.get(name).delete(fn);
	},
	sync: () => emit("sync"),
	reroll: () => emit("reroll"),
	setAutoSweep(v) {
		autoSweep = v;
		startSweep();
		if (v) emit("sync");
	},
	start() {
		if (running) return;
		running = true;
		window.addEventListener("pointermove", onPointerMove, { passive: true });
		window.addEventListener("pointerdown", onInput, { passive: true });
		window.addEventListener("keydown", onInput);
		window.addEventListener("wheel", onInput, { passive: true });
		document.addEventListener("visibilitychange", onVisibility);
		bucketTimer = window.setInterval(() => {
			bucketIdx = (bucketIdx + 1) % 60;
			buckets[bucketIdx] = 0;
		}, 1e3);
		startSweep();
		const getBattery = navigator.getBattery;
		getBattery?.call(navigator).then((b) => {
			const update = () => {
				battery = {
					level: b.level,
					charging: b.charging
				};
				batteryReal = true;
			};
			update();
			b.addEventListener("levelchange", update);
			b.addEventListener("chargingchange", update);
		}).catch(() => {});
		if (!getBattery) {
			battery = {
				level: .87,
				charging: false
			};
			batteryReal = false;
		}
		last = performance.now();
		raf = requestAnimationFrame(frame);
		publish();
	},
	stop() {
		if (!running) return;
		running = false;
		cancelAnimationFrame(raf);
		clearInterval(bucketTimer);
		clearInterval(sweepTimer);
		window.removeEventListener("pointermove", onPointerMove);
		window.removeEventListener("pointerdown", onInput);
		window.removeEventListener("keydown", onInput);
		window.removeEventListener("wheel", onInput);
		document.removeEventListener("visibilitychange", onVisibility);
	}
};
//#endregion
export { bus };

//# sourceMappingURL=telemetry.mjs.map