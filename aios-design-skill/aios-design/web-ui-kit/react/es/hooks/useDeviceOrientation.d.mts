//#region src/hooks/useDeviceOrientation.d.ts
interface DeviceOrientationState {
  /** 0-360°, null = 不可用 */
  heading: number | null;
  /** true = 来自真实 API, false = 不可用/已拒绝/桌面 */
  real: boolean;
}
declare function useDeviceOrientation(autoStart?: boolean): DeviceOrientationState;
//#endregion
export { DeviceOrientationState, useDeviceOrientation };
//# sourceMappingURL=useDeviceOrientation.d.mts.map