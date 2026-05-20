import { Home, DarkMode, Remote, Subtitle, Wallet, Location, DarkMode1, NoSignam, DownArrow, DoNotDisturb, QrCode, Storage, Share, NoConnection, Record, FullNetwork, Shield, Glyphs, Aeroplane, Chart, Video, Temp, AutoRotate, Info, MicOff, NoSim, Watch, Record1, AccessCamera, Dots, Filter, Home1, Cast, DoNotDisturb1, ArrowDown, QrCode1, Subtitle1, Scan, Cast1, BatteryPlus } from "./WidgetIcons";
import { Dim, Dim1, Calculator, BatterySaver, HomeControls, Nfc, Bedtime, DarkMode2, Weather, Remote1, Share1, Hotspot, Share2, Dim2, DataSaver, Torch, Share3 } from "./WidgetPills";
import { Record2, LocationAccess, WatchAnalog, Compass, TempControl, AutoRotate1, Active, Watch1, Active1, Recording, Glyphs1, LocationAccess1, Glyphs2, Campus, Location1, Flash, Weather1, MicAccess, PairNewDevice, Overlimit, MusicPlayer, TotalTime, StepsCounter, OverLimit1, LoadingBar1, Card, Card1, Dots3, Play, NothingEar, Card2, Date, Date1, Counter, Music, Device, Mode, DoubleDown, SelectDevice, Card3, ActivityTracker, Time, Weather2, Wedget } from "./WidgetSubComponents";

function Frame49() {
  return (
    <div className="widget-grid-7x6">
      <Home />
      <DarkMode />
      <Remote />
      <Subtitle />
      <Wallet />
      <Location />
      <DarkMode1 />
      <NoSignam />
      <DownArrow />
      <DoNotDisturb />
      <QrCode />
      <Storage />
      <Share />
      <NoConnection />
      <Record />
      <FullNetwork />
      <Shield />
      <Glyphs />
      <Aeroplane />
      <Chart />
      <Video />
      <Temp />
      <AutoRotate />
      <Info />
      <MicOff />
      <NoSim />
      <Watch />
      <Record1 />
      <AccessCamera />
      <Dots />
      <Filter />
      <Home1 />
      <Cast />
      <DoNotDisturb1 />
      <ArrowDown />
      <QrCode1 />
      <Subtitle1 />
      <Scan />
      <Cast1 />
      <BatteryPlus />
    </div>
  );
}

function Frame50() {
  return (
    <div className="widget-grid-4x5">
      <Dim />
      <Dim1 />
      <Calculator />
      <BatterySaver />
      <HomeControls />
      <Nfc />
      <Bedtime />
      <DarkMode2 />
      <Weather />
      <Remote1 />
      <Share1 />
      <Hotspot />
      <Share2 />
      <Dim2 />
      <DataSaver />
      <Torch />
      <Share3 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="widget-flex-wrap">
      <Record2 />
      <LocationAccess />
      <WatchAnalog />
      <Compass />
      <TempControl />
      <AutoRotate1 />
      <Active />
      <Watch1 />
      <Active1 />
      <Recording />
      <Glyphs1 />
      <LocationAccess1 />
      <Glyphs2 />
      <Campus />
      <Location1 />
      <Flash />
      <Weather1 />
      <MicAccess />
    </div>
  );
}

function Frame48() {
  return (
    <div className="gap-x-[40px] gap-y-[40px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(6,minmax(0,1fr))] h-[1112px] widget-relative widget-shrink-0 w-[728px]">
      <PairNewDevice />
      <Overlimit />
      <MusicPlayer />
      <TotalTime />
      <StepsCounter />
      <OverLimit1 />
      <LoadingBar1 />
      <Card />
      <Card1 />
      <Dots3 />
      <Play />
      <NothingEar />
      <Card2 />
      <Date />
      <Date1 />
      <Counter />
      <Music />
      <Device />
      <Mode />
      <DoubleDown />
      <SelectDevice />
    </div>
  );
}

function Frame47() {
  return (
    <div className="widget-flex-wrap">
      <Card3 />
      <ActivityTracker />
      <Time />
      <Weather2 />
      <Wedget />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute widget-flex-wrap">
      <Frame49 />
      <Frame50 />
      <Frame46 />
      <Frame48 />
      <Frame47 />
    </div>
  );
}

export default function NothingWidgets() {
  return (
    <div className="widget-bg" data-name="Nothing Widgets - 2.0">
      <Frame10 />
    </div>
  );
}
