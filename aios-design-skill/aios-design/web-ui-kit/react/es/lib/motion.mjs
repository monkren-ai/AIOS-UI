//#region src/lib/motion.ts
const spring = {
	fast: {
		type: "spring",
		duration: .08,
		bounce: 0,
		exit: { duration: .06 }
	},
	moderate: {
		type: "spring",
		duration: .16,
		bounce: 0,
		exit: { duration: .12 }
	},
	slow: {
		type: "spring",
		duration: .24,
		bounce: .12,
		exit: { duration: .16 }
	}
};
/**
* 退出动画兜底计时器（毫秒）。
*
* Base UI 通常会自动等待 motion 退出动画结束，但在后台标签页或动画被节流时，
* 需要一个安全兜底时间强制卸载 portal 内容。
*/
function exitFallbackMs(token) {
	return Math.round(token.exit.duration * 1e3) + 100;
}
/**
* 创建 enter transition（用于 motion 组件的 transition prop）。
*/
function enterTransition(token) {
	const { exit: _, ...rest } = token;
	return rest;
}
/**
* 创建 exit transition。
*/
function exitTransition(token) {
	return token.exit;
}
//#endregion
export { enterTransition, exitFallbackMs, exitTransition, spring };

//# sourceMappingURL=motion.mjs.map