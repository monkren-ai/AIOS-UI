import * as React from 'react'
import { NfCard } from '@/nullframe/NfCard'
import { CtlCtx, type Ctl } from '../../system/hooks'
import WeatherWidget from '@/widgets/WeatherWidget'
import Time from '@/widgets/Time'
import Battery from '@/Battery'
import DateWidget from '@/Date'
import MusicPlayer from '@/MusicPlayer'
import PhotoFrameWidget from '@/widgets/PhotoFrameWidget'
import Glyph from '@/widgets/Glyph'

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

export function WidgetShowcase() {
  return (
    <CtlCtx.Provider value={mockCtl}>
      <div className="widget-showcase">
        <main className="bento">
          {/* Weather — Card */}
          <NfCard index={0} label="Weather · Card" tag="LIVE" body={
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="Partly cloudy" card />
          } />
          <NfCard index={1} label="Weather · Dark" tag="LIVE" body={
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="Partly cloudy"
              card={{ theme: 'dark', title: 'WEATHER', value: '30°', subtitle: 'PARTLY CLOUDY', icon: <Glyph type="sun" theme="dark" size="sm" />, iconPosition: 'top' }} />
          } />
          <NfCard index={2} label="Weather · Wide" tag="LIVE" className="card-wide" body={
            <WeatherWidget variant="wide" temp="30°" hi="35°" lo="16°" city="Toronto" condition="Partly cloudy" forecast={[
              { day: 'MON', hi: '32°', lo: '18°' },
              { day: 'TUE', hi: '28°', lo: '15°' },
              { day: 'WED', hi: '33°', lo: '20°' },
              { day: 'THU', hi: '30°', lo: '17°' },
              { day: 'FRI', hi: '27°', lo: '14°' }
            ]} card={{ size: 'auto' }} />
          } />
          <NfCard index={3} label="Weather · Wide Dark" tag="LIVE" className="card-wide" body={
            <WeatherWidget variant="wide" temp="30°" hi="35°" lo="16°" city="Toronto" condition="Partly cloudy" forecast={[
              { day: 'MON', hi: '32°', lo: '18°' },
              { day: 'TUE', hi: '28°', lo: '15°' },
              { day: 'WED', hi: '33°', lo: '20°' },
              { day: 'THU', hi: '30°', lo: '17°' },
              { day: 'FRI', hi: '27°', lo: '14°' }
            ]} card={{ size: 'auto', theme: 'dark', title: 'WEATHER', value: '30°', subtitle: 'PARTLY CLOUDY', icon: <Glyph type="sun" theme="dark" size="sm" />, iconPosition: 'left' }} />
          } />

          {/* Analog Clock */}
          <NfCard index={4} label="Clock · Swiss" tag="LIVE" body={
            <Time variant="analog" dial="swiss" card />
          } />
          <NfCard index={5} label="Clock · Minimalist" tag="LIVE" body={
            <Time variant="analog" dial="minimalist" card />
          } />
          <NfCard index={6} label="Clock · Smooth" tag="LIVE" body={
            <Time variant="analog" dial="swiss" smoothSeconds card={{ theme: 'light' }} />
          } />

          {/* Digital Clock */}
          <NfCard index={7} label="Digital · Sharp" tag="LIVE" body={
            <Time variant="digital-large" font="sharp" card />
          } />
          <NfCard index={8} label="Digital · Serif" tag="LIVE" body={
            <Time variant="digital-large" font="serif" card />
          } />
          <NfCard index={9} label="Digital · Seconds" tag="LIVE" body={
            <Time variant="digital-large" font="sharp" showSeconds card={{ theme: 'light' }} />
          } />

          {/* Weather Circular */}
          <NfCard index={10} label="Weather · Circle" tag="LIVE" body={
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="partly_cloudy" variant="circular" card />
          } />
          <NfCard index={11} label="Weather · Thunder" tag="LIVE" body={
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="thunderstorm" variant="circular" card={{ theme: 'light' }} />
          } />
          <NfCard index={12} label="Weather · Snow" tag="LIVE" body={
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="snowy" variant="circular" card />
          } />
          <NfCard index={13} label="Weather · Grid" tag="LIVE" className="card-wide" body={
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="sunny" variant="grid" forecast={[
              { day: 'MON', hi: '32°', lo: '18°', condition: 'sunny' },
              { day: 'TUE', hi: '28°', lo: '15°', condition: 'cloudy' },
              { day: 'WED', hi: '25°', lo: '12°', condition: 'rainy' }
            ]} card />
          } />

          {/* Battery */}
          <NfCard index={14} label="Battery · Card" tag="LIVE" className="card-wide card-tall" body={
            <Battery variant="segmented" percent={75} widgetMode="card" devices={[
              { name: 'Nothing Ear', type: 'earbuds', percent: 60 },
              { name: 'MX Master 3', type: 'mouse', percent: 45, isCharging: true }
            ]} />
          } />
          <NfCard index={15} label="Battery · Ring" tag="LIVE" body={
            <Battery variant="ring" percent={45} widgetMode="ring" />
          } />

          {/* Date */}
          <NfCard index={16} label="Date · Serif" tag="LIVE" body={
            <DateWidget type="serif" />
          } />
          <NfCard index={17} label="Date · Peel" tag="LIVE" body={
            <DateWidget type="serif" showPeel theme="light" />
          } />

          {/* Music */}
          <NfCard index={18} label="Music · Compact" tag="LIVE" body={
            <MusicPlayer variant="compact" showRecordingIndicator />
          } />
          <NfCard index={19} label="Music · Default" tag="LIVE" body={
            <MusicPlayer variant="default" showRecordingIndicator />
          } />

          {/* Photo Frame */}
          <NfCard index={20} label="Photo · Square" tag="LIVE" body={
            <PhotoFrameWidget variant="square" src="https://picsum.photos/300/300" alt="Sample photo" card />
          } />
          <NfCard index={21} label="Photo · Pill" tag="LIVE" body={
            <PhotoFrameWidget variant="pill" src="https://picsum.photos/200/400" alt="Sample photo" card />
          } />
          <NfCard index={22} label="Photo · Multi" tag="LIVE" body={
            <PhotoFrameWidget variant="square" images={[
              { src: 'https://picsum.photos/300/300?1', alt: 'Photo 1' },
              { src: 'https://picsum.photos/300/300?2', alt: 'Photo 2' },
              { src: 'https://picsum.photos/300/300?3', alt: 'Photo 3' }
            ]} card />
          } />
        </main>
      </div>
    </CtlCtx.Provider>
  )
}

export default WidgetShowcase
