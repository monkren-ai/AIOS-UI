//#region src/lib/polymorphic.ts
/**
* 验证 children 是单个 ReactElement（用于 asChild）。
* 多子节点时调用方应自行处理（Slot 会降级到 span）。
*/
function isSingleReactElement(children) {
	if (children == null || typeof children === "boolean") return false;
	if (Array.isArray(children)) return children.length === 1 && isSingleReactElement(children[0]);
	return true;
}
//#endregion
export { isSingleReactElement };

//# sourceMappingURL=polymorphic.mjs.map