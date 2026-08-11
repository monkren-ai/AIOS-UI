import {
  Home,
  DarkMode,
  Remote,
  Subtitle,
  Wallet,
  Location,
  DarkModeLight,
  NoSignal,
  DownArrow,
  DoNotDisturb,
  QrCode,
  Storage,
  Share,
  NoConnection,
  Record,
  FullNetwork,
  Shield,
  Glyphs,
  Aeroplane,
  Chart,
  Video,
  Temp,
  AutoRotate,
  Info,
  MicOff,
  NoSim,
  Watch,
  RecordAlt,
  AccessCamera,
  Dots,
  Filter,
  HomeLight,
  Cast,
  DoNotDisturbLight,
  ArrowDownAlt,
  QrCodeLight,
  SubtitleLight,
  Scan,
  CastAlt,
  BatteryPlus,
} from '@/widgets/WidgetIcons'
import WidgetPill from '@/widgets/WidgetPill'
import {
  LocationAccess,
  Compass as FigmaCompass,
  TempControl,
  AutoRotate1,
  Active,
  Watch as FigmaWatch,
  Recording,
  Glyphs as FigmaGlyphs,
  Campus,
  Location1,
  Flash,
  Weather as FigmaWeather,
  MicAccess,
  PairNewDevice,
  Overlimit,
  MusicPlayer as FigmaMusicPlayer,
  StepsCounter,
  OverLimit,
  LoadingBar1,
  Card as FigmaCard,
  Dots3,
  Play,
  AIOSEar,
  Date as FigmaDate,
  Counter,
  Music,
  Device,
  Mode,
  DoubleDown,
  SelectDevice,
  ActivityTracker,
} from '@/widgets/WidgetSubComponents'
import { Time as FigmaTime } from '@/widgets/Time'
import { Date1 } from '@/widgets/sub/Date'

const figmaWidgetWrapStyle: React.CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  flexShrink: 0,
}

const demoTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--label)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
  marginBottom: 'var(--space-md)',
  width: '100%',
}

const flexWrapSectionStyle: React.CSSProperties = {
  marginBottom: 'var(--space-3xl)',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--space-md)',
  alignItems: 'flex-start',
}

const sectionStyle: React.CSSProperties = {
  marginBottom: 'var(--space-3xl)',
}

function Figma20Section() {
  return (
    <>
      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Quick Settings Icons</h2>
        <div style={figmaWidgetWrapStyle}>
          <Home />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <DarkMode />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Remote />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Subtitle />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Wallet />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Location />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <DarkModeLight />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Connectivity Icons</h2>
        <div style={figmaWidgetWrapStyle}>
          <NoSignal />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <DownArrow />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <DoNotDisturb />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <QrCode />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Storage />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Share />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <NoConnection />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — System Icons</h2>
        <div style={figmaWidgetWrapStyle}>
          <Record />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <FullNetwork />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Shield />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Glyphs />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Aeroplane />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Chart />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Video />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Media & Device Icons</h2>
        <div style={figmaWidgetWrapStyle}>
          <Temp />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <AutoRotate />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Info />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <MicOff />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <NoSim />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Watch />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <RecordAlt />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Utility Icons</h2>
        <div style={figmaWidgetWrapStyle}>
          <AccessCamera />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Dots />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Filter />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <HomeLight />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Cast />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <DoNotDisturbLight />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <ArrowDownAlt />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — More Icons</h2>
        <div style={figmaWidgetWrapStyle}>
          <QrCodeLight />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <SubtitleLight />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Scan />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <CastAlt />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <BatteryPlus />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Light Pills</h2>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="mobileData" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="batteryShare" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="calculator" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="batterySaver" />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Dark Pills</h2>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="homeControls" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="nfc" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="bedtime" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="darkMode" />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Accent Pills</h2>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="weather" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="tvRemote" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="storage" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="hotspot" />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — More Pills</h2>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="nearbyShare" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="extraDim" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="dataSaver" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="torch" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <WidgetPill preset="bluetooth" />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Circular Widgets</h2>
        <div style={figmaWidgetWrapStyle}>
          <Recording variant="rec" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <LocationAccess />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <FigmaWatch variant="analog-large" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <FigmaCompass />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <TempControl />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <AutoRotate1 />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Location Widgets</h2>
        <div style={figmaWidgetWrapStyle}>
          <LocationAccess />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <LocationAccess theme="light" />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Watch Widgets</h2>
        <div style={figmaWidgetWrapStyle}>
          <FigmaWatch variant="analog-large" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <FigmaWatch variant="analog" />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Active Widgets</h2>
        <div style={figmaWidgetWrapStyle}>
          <Active />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <FigmaWatch variant="analog" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Active variant="aeroplane" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Recording />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <FigmaGlyphs />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <LocationAccess theme="light" />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Glyph Widgets</h2>
        <div style={figmaWidgetWrapStyle}>
          <FigmaGlyphs variant="pattern-b" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Campus />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Location1 />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Flash />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <FigmaWeather variant="icon" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <MicAccess />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Pair & Limit Widgets</h2>
        <div style={figmaWidgetWrapStyle}>
          <PairNewDevice />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Overlimit />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <FigmaMusicPlayer />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <FigmaTime variant="total" />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Counter Widgets</h2>
        <div style={figmaWidgetWrapStyle}>
          <StepsCounter />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <OverLimit theme="dark" minutes={40} />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <LoadingBar1 />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <FigmaCard />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Card Widgets</h2>
        <div style={figmaWidgetWrapStyle}>
          <FigmaCard image="b" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Dots3 />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Play />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <AIOSEar />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Date & Music Widgets</h2>
        <div style={figmaWidgetWrapStyle}>
          <FigmaCard image="c" />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <FigmaDate />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Date1 />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Counter />
        </div>
      </section>

      <section style={flexWrapSectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Device Widgets</h2>
        <div style={figmaWidgetWrapStyle}>
          <Music />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Device />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <Mode />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <DoubleDown />
        </div>
        <div style={figmaWidgetWrapStyle}>
          <SelectDevice />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Wide Activity Widget</h2>
        <FigmaCard
          variant="pill"
          image="d"
          style={{
            background: 'var(--widget-bg)',
            padding: '24px',
            borderRadius: '24px',
            overflow: 'auto',
          }}
        />
      </section>

      <section style={sectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Wide Tracker Widget</h2>
        <ActivityTracker
          style={{
            background: 'var(--widget-bg)',
            padding: '24px',
            borderRadius: '24px',
            overflow: 'auto',
          }}
        />
      </section>

      <section style={sectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Wide Time Widget</h2>
        <FigmaTime
          variant="compact"
          style={{
            background: 'var(--widget-bg)',
            padding: '24px',
            borderRadius: '24px',
            overflow: 'auto',
          }}
        />
      </section>

      <section style={sectionStyle}>
        <h2 style={demoTitleStyle}>Figma 2.0 — Wide Weather Widget</h2>
        <FigmaWeather
          variant="forecast"
          style={{
            background: 'var(--widget-bg)',
            padding: '24px',
            borderRadius: '24px',
            overflow: 'auto',
          }}
        />
      </section>
    </>
  )
}

export default Figma20Section
