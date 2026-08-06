//#region src/hooks/useWeather.d.ts
interface WeatherData {
  temp: number;
  hi: number;
  lo: number;
  condition: string;
  city: string;
  forecast: {
    day: string;
    hi: number;
    lo: number;
    condition: string;
  }[];
  fetchedAt: number;
}
interface UseWeatherOptions {
  latitude: number;
  longitude: number;
  city?: string;
  enabled?: boolean;
}
interface UseWeatherResult {
  data: WeatherData | null;
  loading: boolean;
  real: boolean;
  error: string | null;
}
declare function useWeather(opts: UseWeatherOptions): UseWeatherResult;
//#endregion
export { UseWeatherOptions, UseWeatherResult, WeatherData, useWeather };
//# sourceMappingURL=useWeather.d.mts.map