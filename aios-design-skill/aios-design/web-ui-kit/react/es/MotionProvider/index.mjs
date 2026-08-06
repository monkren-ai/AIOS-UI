"use client";
import { createContext, memo, useContext } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/MotionProvider/index.tsx
/**
* Motion 上下文（默认无 motion 实现，必须通过 MotionProvider 注入）
*/
const MotionContext = createContext({ motion: null });
/**
* useMotionComponent hook
*
* 获取注入的 motion 组件集合。
* 必须在 `<MotionProvider motion={motion}>` 内使用，否则抛出错误。
*
* @example
* ```tsx
* import { motion } from 'motion/react'
* import { MotionProvider, useMotionComponent } from 'aios-ui-kit'
*
* // 在根组件注入
* <MotionProvider motion={motion}>
*   <App />
* </MotionProvider>
*
* // 在子组件中使用
* const { motion } = useMotionComponent()
* return <motion.div animate={{ opacity: 1 }} />
* ```
*/
function useMotionComponent() {
	const { motion } = useContext(MotionContext);
	if (!motion) throw new Error("useMotionComponent: no motion implementation found. Wrap your app with <MotionProvider motion={motion}> or <ConfigProvider motion={motion}> and pass your motion import from \"motion/react\" or \"motion/react-m\".");
	return motion;
}
/**
* MotionProvider
*
* 为子组件注入 motion 实现。
* motion 为必传 prop，由用户自行选择 `motion/react`（完整版）或 `motion/react-m`（精简版）。
*
* @example
* ```tsx
* import * as motion from 'motion/react'
* import { MotionProvider } from 'aios-ui-kit'
*
* <MotionProvider motion={motion}>
*   <App />
* </MotionProvider>
* ```
*/
const MotionProvider = memo(({ children, motion }) => {
	return /* @__PURE__ */ jsx(MotionContext, {
		value: { motion },
		children
	});
});
MotionProvider.displayName = "MotionProvider";
//#endregion
export { MotionContext, MotionProvider as default, useMotionComponent };

//# sourceMappingURL=index.mjs.map