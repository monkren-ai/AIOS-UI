import { NfCard } from '../nullframe/NfCard'
import { CtlCtx, type Ctl } from '../../system/hooks'
import {
  Home, DarkMode, Remote, Subtitle, Wallet, Location,
  DarkModeLight, NoSignal, DownArrow, DoNotDisturb, QrCode,
  Storage, Share, NoConnection, Record, FullNetwork, Shield,
  Glyphs, Aeroplane, Chart, Video, Temp, AutoRotate, Info,
  MicOff, NoSim, Watch, RecordAlt, AccessCamera, Dots, Filter,
  HomeLight, Cast, DoNotDisturbLight, ArrowDownAlt, QrCodeLight,
  SubtitleLight, Scan, CastAlt, BatteryPlus,
} from '../widgets/WidgetIcons'
import WidgetPill from '../widgets/WidgetPill'
import {
  LocationAccess, Compass as FigmaCompass, TempControl,
  AutoRotate1, Active, Watch as FigmaWatch, Recording,
  Glyphs as FigmaGlyphs, Campus, Location1, Flash,
  Weather as FigmaWeather, MicAccess, PairNewDevice,
  Overlimit, MusicPlayer as FigmaMusicPlayer, StepsCounter,
  OverLimit, LoadingBar1, Card as FigmaCard, Dots3, Play,
  NothingEar, Date as FigmaDate, Counter, Music, Device,
  Mode, DoubleDown, SelectDevice, ActivityTracker,
} from '../widgets/WidgetSubComponents'
import { Time as FigmaTime } from '../widgets/Time'
import { Date1 } from '../widgets/sub/Date'

const mockCtl: Ctl = {
  focus: false,
  setFocus: () => {},
  motionOff: false,
  setMotionOff: () => {},
  autoSweep: false,
  setAutoSweep: () => {},
  paletteOpen: false,
  setPaletteOpen: () => {},
}

export function Figma20Showcase() {
  return (
    <CtlCtx.Provider value={mockCtl}>
      <div className="widget-showcase">
        <main className="bento">
          {/* Icons — Quick Settings */}
          <NfCard index={0} label="Home" tag="LIVE" body={<Home />} />
          <NfCard index={1} label="Dark Mode" tag="LIVE" body={<DarkMode />} />
          <NfCard index={2} label="Remote" tag="LIVE" body={<Remote />} />
          <NfCard index={3} label="Subtitle" tag="LIVE" body={<Subtitle />} />
          <NfCard index={4} label="Wallet" tag="LIVE" body={<Wallet />} />
          <NfCard index={5} label="Location" tag="LIVE" body={<Location />} />
          <NfCard index={6} label="Dark Mode Light" tag="LIVE" body={<DarkModeLight />} />

          {/* Icons — Connectivity */}
          <NfCard index={7} label="No Signal" tag="LIVE" body={<NoSignal />} />
          <NfCard index={8} label="Down Arrow" tag="LIVE" body={<DownArrow />} />
          <NfCard index={9} label="Do Not Disturb" tag="LIVE" body={<DoNotDisturb />} />
          <NfCard index={10} label="QR Code" tag="LIVE" body={<QrCode />} />
          <NfCard index={11} label="Storage" tag="LIVE" body={<Storage />} />
          <NfCard index={12} label="Share" tag="LIVE" body={<Share />} />
          <NfCard index={13} label="No Connection" tag="LIVE" body={<NoConnection />} />

          {/* Icons — System */}
          <NfCard index={14} label="Record" tag="LIVE" body={<Record />} />
          <NfCard index={15} label="Full Network" tag="LIVE" body={<FullNetwork />} />
          <NfCard index={16} label="Shield" tag="LIVE" body={<Shield />} />
          <NfCard index={17} label="Glyphs" tag="LIVE" body={<Glyphs />} />
          <NfCard index={18} label="Aeroplane" tag="LIVE" body={<Aeroplane />} />
          <NfCard index={19} label="Chart" tag="LIVE" body={<Chart />} />
          <NfCard index={20} label="Video" tag="LIVE" body={<Video />} />

          {/* Icons — Media & Device */}
          <NfCard index={21} label="Temp" tag="LIVE" body={<Temp />} />
          <NfCard index={22} label="Auto Rotate" tag="LIVE" body={<AutoRotate />} />
          <NfCard index={23} label="Info" tag="LIVE" body={<Info />} />
          <NfCard index={24} label="Mic Off" tag="LIVE" body={<MicOff />} />
          <NfCard index={25} label="No Sim" tag="LIVE" body={<NoSim />} />
          <NfCard index={26} label="Watch" tag="LIVE" body={<Watch />} />
          <NfCard index={27} label="Record Alt" tag="LIVE" body={<RecordAlt />} />

          {/* Icons — Utility */}
          <NfCard index={28} label="Access Camera" tag="LIVE" body={<AccessCamera />} />
          <NfCard index={29} label="Dots" tag="LIVE" body={<Dots />} />
          <NfCard index={30} label="Filter" tag="LIVE" body={<Filter />} />
          <NfCard index={31} label="Home Light" tag="LIVE" body={<HomeLight />} />
          <NfCard index={32} label="Cast" tag="LIVE" body={<Cast />} />
          <NfCard index={33} label="DND Light" tag="LIVE" body={<DoNotDisturbLight />} />
          <NfCard index={34} label="Arrow Down" tag="LIVE" body={<ArrowDownAlt />} />

          {/* Icons — More */}
          <NfCard index={35} label="QR Light" tag="LIVE" body={<QrCodeLight />} />
          <NfCard index={36} label="Subtitle Light" tag="LIVE" body={<SubtitleLight />} />
          <NfCard index={37} label="Scan" tag="LIVE" body={<Scan />} />
          <NfCard index={38} label="Cast Alt" tag="LIVE" body={<CastAlt />} />
          <NfCard index={39} label="Battery Plus" tag="LIVE" body={<BatteryPlus />} />

          {/* Pills — Light */}
          <NfCard index={40} label="Mobile Data" tag="LIVE" body={<WidgetPill preset="mobileData" />} />
          <NfCard index={41} label="Battery Share" tag="LIVE" body={<WidgetPill preset="batteryShare" />} />
          <NfCard index={42} label="Calculator" tag="LIVE" body={<WidgetPill preset="calculator" />} />
          <NfCard index={43} label="Battery Saver" tag="LIVE" body={<WidgetPill preset="batterySaver" />} />

          {/* Pills — Dark */}
          <NfCard index={44} label="Home Controls" tag="LIVE" body={<WidgetPill preset="homeControls" />} />
          <NfCard index={45} label="NFC" tag="LIVE" body={<WidgetPill preset="nfc" />} />
          <NfCard index={46} label="Bedtime" tag="LIVE" body={<WidgetPill preset="bedtime" />} />
          <NfCard index={47} label="Dark Mode Pill" tag="LIVE" body={<WidgetPill preset="darkMode" />} />

          {/* Pills — Accent */}
          <NfCard index={48} label="Weather Pill" tag="LIVE" body={<WidgetPill preset="weather" />} />
          <NfCard index={49} label="TV Remote" tag="LIVE" body={<WidgetPill preset="tvRemote" />} />
          <NfCard index={50} label="Storage Pill" tag="LIVE" body={<WidgetPill preset="storage" />} />
          <NfCard index={51} label="Hotspot" tag="LIVE" body={<WidgetPill preset="hotspot" />} />

          {/* Pills — More */}
          <NfCard index={52} label="Nearby Share" tag="LIVE" body={<WidgetPill preset="nearbyShare" />} />
          <NfCard index={53} label="Extra Dim" tag="LIVE" body={<WidgetPill preset="extraDim" />} />
          <NfCard index={54} label="Data Saver" tag="LIVE" body={<WidgetPill preset="dataSaver" />} />
          <NfCard index={55} label="Torch" tag="LIVE" body={<WidgetPill preset="torch" />} />
          <NfCard index={56} label="Bluetooth" tag="LIVE" body={<WidgetPill preset="bluetooth" />} />

          {/* Circular Widgets */}
          <NfCard index={57} label="Recording" tag="LIVE" body={<Recording variant="rec" />} />
          <NfCard index={58} label="Location Access" tag="LIVE" body={<LocationAccess />} />
          <NfCard index={59} label="Watch · Lg" tag="LIVE" body={<FigmaWatch variant="analog-large" />} />
          <NfCard index={60} label="Compass" tag="LIVE" body={<FigmaCompass />} />
          <NfCard index={61} label="Temp Control" tag="LIVE" body={<TempControl />} />
          <NfCard index={62} label="Auto Rotate" tag="LIVE" body={<AutoRotate1 />} />

          {/* Location Widgets */}
          <NfCard index={63} label="Location" tag="LIVE" body={<LocationAccess />} />
          <NfCard index={64} label="Location · Light" tag="LIVE" body={<LocationAccess theme="light" />} />

          {/* Watch Widgets */}
          <NfCard index={65} label="Watch · Lg" tag="LIVE" body={<FigmaWatch variant="analog-large" />} />
          <NfCard index={66} label="Watch · Analog" tag="LIVE" body={<FigmaWatch variant="analog" />} />

          {/* Active Widgets */}
          <NfCard index={67} label="Active" tag="LIVE" body={<Active />} />
          <NfCard index={68} label="Watch · Analog" tag="LIVE" body={<FigmaWatch variant="analog" />} />
          <NfCard index={69} label="Aeroplane" tag="LIVE" body={<Active variant="aeroplane" />} />
          <NfCard index={70} label="Recording" tag="LIVE" body={<Recording />} />
          <NfCard index={71} label="Glyphs" tag="LIVE" body={<FigmaGlyphs />} />
          <NfCard index={72} label="Loc · Light" tag="LIVE" body={<LocationAccess theme="light" />} />

          {/* Glyph Widgets */}
          <NfCard index={73} label="Glyphs · B" tag="LIVE" body={<FigmaGlyphs variant="pattern-b" />} />
          <NfCard index={74} label="Campus" tag="LIVE" body={<Campus />} />
          <NfCard index={75} label="Location" tag="LIVE" body={<Location1 />} />
          <NfCard index={76} label="Flash" tag="LIVE" body={<Flash />} />
          <NfCard index={77} label="Weather Icon" tag="LIVE" body={<FigmaWeather variant="icon" />} />
          <NfCard index={78} label="Mic Access" tag="LIVE" body={<MicAccess />} />

          {/* Pair & Limit */}
          <NfCard index={79} label="Pair Device" tag="LIVE" body={<PairNewDevice />} />
          <NfCard index={80} label="Overlimit" tag="LIVE" body={<Overlimit />} />
          <NfCard index={81} label="Music Player" tag="LIVE" body={<FigmaMusicPlayer />} />
          <NfCard index={82} label="Time Total" tag="LIVE" body={<FigmaTime variant="total" />} />

          {/* Counter Widgets */}
          <NfCard index={83} label="Steps" tag="LIVE" body={<StepsCounter />} />
          <NfCard index={84} label="Overlimit" tag="LIVE" body={<OverLimit theme="dark" minutes={40} />} />
          <NfCard index={85} label="Loading Bar" tag="LIVE" body={<LoadingBar1 />} />
          <NfCard index={86} label="Card" tag="LIVE" body={<FigmaCard />} />

          {/* Card Widgets */}
          <NfCard index={87} label="Card · B" tag="LIVE" body={<FigmaCard image="b" />} />
          <NfCard index={88} label="Dots" tag="LIVE" body={<Dots3 />} />
          <NfCard index={89} label="Play" tag="LIVE" body={<Play />} />
          <NfCard index={90} label="Nothing Ear" tag="LIVE" body={<NothingEar />} />

          {/* Date & Music */}
          <NfCard index={91} label="Card · C" tag="LIVE" body={<FigmaCard image="c" />} />
          <NfCard index={92} label="Date" tag="LIVE" body={<FigmaDate />} />
          <NfCard index={93} label="Date1" tag="LIVE" body={<Date1 />} />
          <NfCard index={94} label="Counter" tag="LIVE" body={<Counter />} />

          {/* Device Widgets */}
          <NfCard index={95} label="Music" tag="LIVE" body={<Music />} />
          <NfCard index={96} label="Device" tag="LIVE" body={<Device />} />
          <NfCard index={97} label="Mode" tag="LIVE" body={<Mode />} />
          <NfCard index={98} label="Double Down" tag="LIVE" body={<DoubleDown />} />
          <NfCard index={99} label="Select Device" tag="LIVE" body={<SelectDevice />} />

          {/* Wide Widgets */}
          <NfCard index={100} label="Activity · Pill" tag="LIVE" className="card-wide" body={
            <FigmaCard variant="pill" image="d" />
          } />
          <NfCard index={101} label="Activity Tracker" tag="LIVE" className="card-wide" body={<ActivityTracker />} />
          <NfCard index={102} label="Time · Compact" tag="LIVE" className="card-wide" body={
            <FigmaTime variant="compact" />
          } />
          <NfCard index={103} label="Weather · Forecast" tag="LIVE" className="card-wide" body={
            <FigmaWeather variant="forecast" />
          } />
        </main>
      </div>
    </CtlCtx.Provider>
  )
}

export default Figma20Showcase
