"use client";
import { createContext, memo, useContext } from "react";
import * as motion from "motion/react";
import { jsx } from "react/jsx-runtime";
//#region src/MotionProvider/index.tsx
/**
* Motion 上下文（默认使用完整版 motion/react）
*/
const MotionContext = createContext({ motion });
/**
* useMotionComponent hook
*
* 获取注入的 motion 组件集合。
*
* 默认返回完整版 `motion/react`；若应用使用 `LazyMotion`，
* 应通过 `<MotionProvider motion={m}>` 注入 `motion/react-m`。
*
* @example
* ```tsx
* const { motion } = useMotionComponent()
* return <motion.div animate={{ opacity: 1 }} />
* ```
*/
function useMotionComponent() {
	return useContext(MotionContext).motion;
}
/**
* MotionProvider
*
* 为子组件注入 motion 实现。
*
* - 默认使用 `motion/react`（完整版，体积较大）
* - 若应用使用 `LazyMotion`，应传入 `motion/react-m`（精简版）
*
* @example
* ```tsx
* // 默认（完整版）
* <MotionProvider>
*   <App />
* </MotionProvider>
*
* // LazyMotion（精简版）
* <LazyMotion features={domAnimation}>
*   <MotionProvider motion={m}>
*     <App />
*   </MotionProvider>
* </LazyMotion>
* ```
*/
const MotionProvider = memo(({ children, motion: motionProp }) => {
	return /* @__PURE__ */ jsx(MotionContext, {
		value: { motion: motionProp ?? motion },
		children
	});
});
MotionProvider.displayName = "MotionProvider";
//#endregion
export { MotionProvider as default, useMotionComponent };

//# sourceMappingURL=index.mjs.map