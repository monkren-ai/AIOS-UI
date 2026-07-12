import { useState, useEffect, useCallback } from 'react'
import { Command, type CommandGroup } from '@/components/Command'

// === Mock Data ===

interface Episode {
  id: string
  number: number
  title: string
  show: string
  showId: string
  duration: string
  durationSec: number
  date: string
  description: string
  tags: { label: string; variant: 'default' | 'accent' | 'ai' }[]
}

const shows = [
  { id: 'design-matters', name: 'Design Matters', unplayed: 3 },
  { id: 'the-type', name: 'The Type', unplayed: 1 },
  { id: 'layout-lab', name: 'Layout Lab', unplayed: 0 },
  { id: 'creative-current', name: 'Creative Current', unplayed: 2 },
]

const episodes: Episode[] = [
  {
    id: 'ep42', number: 42, title: 'The Return of Serif', show: 'The Type', showId: 'the-type',
    duration: '45:12', durationSec: 2712, date: 'JUN 18',
    description: 'Why serif typefaces are making a comeback in digital interfaces, and what it means for readability on screens.',
    tags: [{ label: 'TYPOGRAPHY', variant: 'default' }, { label: 'NEW', variant: 'accent' }, { label: 'AI SUMMARIZED', variant: 'ai' }],
  },
  {
    id: 'ep41', number: 41, title: 'Grid Systems Beyond Swiss', show: 'Layout Lab', showId: 'layout-lab',
    duration: '38:45', durationSec: 2325, date: 'JUN 11',
    description: 'Exploring modular grids, asymmetric layouts, and how modern web tools handle grid complexity.',
    tags: [{ label: 'GRID', variant: 'default' }, { label: 'AI SUMMARIZED', variant: 'ai' }],
  },
  {
    id: 'ep40', number: 40, title: 'Color Theory for Dark Mode', show: 'Design Matters', showId: 'design-matters',
    duration: '52:30', durationSec: 3150, date: 'JUN 04',
    description: 'The science of contrast ratios, perceived brightness, and designing accessible dark themes.',
    tags: [{ label: 'COLOR', variant: 'default' }, { label: 'ACCESSIBILITY', variant: 'default' }],
  },
  {
    id: 'ep39', number: 39, title: 'The Death of Skeuomorphism', show: 'Creative Current', showId: 'creative-current',
    duration: '41:08', durationSec: 2468, date: 'MAY 28',
    description: 'A retrospective on skeuomorphic design and what flat design gained — and lost — in the transition.',
    tags: [{ label: 'HISTORY', variant: 'default' }, { label: 'NEW', variant: 'accent' }],
  },
  {
    id: 'ep38', number: 38, title: 'Variable Fonts in Production', show: 'The Type', showId: 'the-type',
    duration: '36:22', durationSec: 2182, date: 'MAY 21',
    description: 'Practical advice on implementing variable fonts, performance budgets, and fallback strategies.',
    tags: [{ label: 'TYPOGRAPHY', variant: 'default' }, { label: 'PERFORMANCE', variant: 'default' }],
  },
  {
    id: 'ep37', number: 37, title: 'Designing for Mono Displays', show: 'Design Matters', showId: 'design-matters',
    duration: '44:55', durationSec: 2695, date: 'MAY 14',
    description: 'How dot-matrix and monochrome displays are influencing a new wave of minimalist UI design.',
    tags: [{ label: 'MONOCHROME', variant: 'default' }, { label: 'AI SUMMARIZED', variant: 'ai' }],
  },
]

const transcriptLines = [
  { time: '00:32', speaker: 'HOST', text: 'Welcome back to The Type. Today we\'re diving into why serif typefaces are returning to digital interfaces.' },
  { time: '01:15', speaker: 'GUEST', text: 'I think it\'s a reaction against the sans-serif monoculture of the 2010s. Designers want more personality.' },
  { time: '02:40', speaker: 'HOST', text: 'But what about readability on screens? The old wisdom was that serifs don\'t render well at small sizes.' },
  { time: '03:22', speaker: 'GUEST', text: 'That was true with low-DPI displays. But with retina screens, serif typefaces render just as crisply as print.' },
  { time: '05:10', speaker: 'HOST', text: 'So the technical barrier is gone. What about the aesthetic shift?' },
  { time: '06:45', speaker: 'GUEST', text: 'Serifs convey authority and warmth. In an era of AI-generated content, that human touch matters more than ever.' },
  { time: '08:30', speaker: 'HOST', text: 'That\'s fascinating — serifs as a signal of human craft in an AI world.' },
  { time: '10:15', speaker: 'GUEST', text: 'Exactly. And variable font technology means we can tune serif weight dynamically for different contexts.' },
]

const summaryPoints = [
  { time: '01:15', text: 'Serif revival is a reaction against sans-serif monoculture of the 2010s — designers want more personality.' },
  { time: '03:22', text: 'Retina displays eliminated the technical barrier — serifs now render as crisply as print.' },
  { time: '06:45', text: 'Serifs convey authority and warmth, serving as a signal of human craft in an AI-generated content era.' },
  { time: '10:15', text: 'Variable font technology enables dynamic serif weight tuning for different display contexts.' },
]

const generatedContent = {
  showNotes: 'In this episode, we explore the resurgence of serif typefaces in digital interfaces. Topics include the historical context of sans-serif dominance, the impact of high-DPI displays on type rendering, and how variable font technology is enabling new expressive possibilities. The conversation also touches on the cultural significance of serifs as a marker of human craft in an increasingly AI-generated content landscape.',
  titleSuggestions: [
    'The Return of Serif: Why Old Type is New Again',
    'Serifs vs. Sans: The Screen Rendering Battle is Over',
    'Why Serifs Are the New Signal of Human Craft',
  ],
  socialMedia: {
    twitter: 'New episode! We dive into why serif typefaces are making a comeback in digital UI. Retina displays killed the rendering argument — now it\'s about personality and human craft. #Typography #Design',
    linkedin: 'Just published a deep dive on the return of serif typefaces in digital interfaces. We cover the technical evolution that made it possible, the aesthetic shift driving it, and what it means for the future of design. Link in comments.',
  },
}

const voiceChatHistory = [
  { role: 'user' as const, text: 'What did they say about retina displays?' },
  { role: 'ai' as const, text: 'At [03:22], the guest explains that retina displays eliminated the technical barrier for serifs on screens. Previously, low-DPI displays couldn\'t render serif details clearly at small sizes, but high-DPI screens now render them as crisply as print.', timestamp: '03:22' },
  { role: 'user' as const, text: 'Why are serifs coming back now?' },
  { role: 'ai' as const, text: 'Two reasons discussed: [01:15] a reaction against sans-serif monoculture, and [06:45] serifs signal human craft in an AI-generated content era.', timestamp: '06:45' },
]

// === Component ===

export default function PodcastShowcase() {
  const [currentEpisode, setCurrentEpisode] = useState<Episode>(episodes[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(34)
  const [volume, setVolume] = useState(65)
  const [aiTab, setAiTab] = useState<'transcript' | 'summary' | 'generate' | 'voice'>('transcript')
  const [aiPanelOpen, setAiPanelOpen] = useState(true)
  const [commandOpen, setCommandOpen] = useState(false)
  const [activeView, setActiveView] = useState<'episodes' | 'nowPlaying'>('episodes')
  const [activeShow, setActiveShow] = useState<string | null>(null)
  const [autoScroll, setAutoScroll] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [genOpen, setGenOpen] = useState<Record<string, boolean>>({ notes: true, titles: false, social: false })

  // Progress simulation
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          // Auto-advance to next episode
          const idx = episodes.findIndex(e => e.id === currentEpisode.id)
          const next = episodes[(idx + 1) % episodes.length]
          setCurrentEpisode(next)
          return 0
        }
        return p + 0.5
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isPlaying, currentEpisode.id])

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandOpen(o => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Recording timer
  useEffect(() => {
    if (!isRecording) {
      setRecordingTime(0)
      return
    }
    const timer = setInterval(() => setRecordingTime(t => t + 1), 1000)
    return () => clearInterval(timer)
  }, [isRecording])

  const handleEpisodeClick = useCallback((ep: Episode) => {
    setCurrentEpisode(ep)
    setActiveView('nowPlaying')
    setProgress(0)
    setIsPlaying(true)
  }, [])

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const currentDurationSec = currentEpisode.durationSec
  const currentPosSec = Math.floor((progress / 100) * currentDurationSec)

  // Filtered episodes
  const displayedEpisodes = activeShow
    ? episodes.filter(e => e.showId === activeShow)
    : episodes

  // Command palette groups
  const commandGroups: CommandGroup[] = [
    {
      heading: 'AI ANSWERS',
      items: [
        { id: 'ai-1', label: '3 episodes discuss serif typography', shortcut: 'AI', onSelect: () => { setCommandOpen(false); handleEpisodeClick(episodes[0]) } },
        { id: 'ai-2', label: 'Found 2 episodes about grid systems', shortcut: 'AI', onSelect: () => { setCommandOpen(false); handleEpisodeClick(episodes[1]) } },
      ],
    },
    {
      heading: 'EPISODES',
      items: episodes.slice(0, 4).map(ep => ({
        id: ep.id,
        label: `Ep. ${ep.number} — ${ep.title}`,
        shortcut: ep.duration,
        onSelect: () => { setCommandOpen(false); handleEpisodeClick(ep) },
      })),
    },
    {
      heading: 'TOPICS',
      items: [
        { id: 't1', label: 'Typography', onSelect: () => setCommandOpen(false) },
        { id: 't2', label: 'Grid Systems', onSelect: () => setCommandOpen(false) },
        { id: 't3', label: 'Color Theory', onSelect: () => setCommandOpen(false) },
        { id: 't4', label: 'Dark Mode', onSelect: () => setCommandOpen(false) },
      ],
    },
  ]

  return (
    <div className={`podcast-app${!aiPanelOpen ? ' podcast-app--no-ai' : ''}`}>
      {/* === Sidebar === */}
      <aside className="podcast-sidebar">
        <div className="podcast-logo">[ PODCAST.AI ]</div>

        <div className="podcast-nav-section">
          <h4>SHOWS</h4>
          {shows.map(show => (
            <button
              key={show.id}
              className={`podcast-nav-item${activeShow === show.id ? ' podcast-nav-item--active' : ''}`}
              onClick={() => setActiveShow(activeShow === show.id ? null : show.id)}
            >
              <span>{show.name}</span>
              {show.unplayed > 0 && (
                <span className={`nav-badge${show.unplayed > 2 ? '' : ' nav-badge--muted'}`}>{show.unplayed}</span>
              )}
            </button>
          ))}
        </div>

        <div className="podcast-nav-section">
          <h4>LIBRARY</h4>
          <button className="podcast-nav-item" onClick={() => { setActiveShow(null); setActiveView('episodes') }}>
            <span>All Episodes</span>
          </button>
          <button className="podcast-nav-item">
            <span>Downloaded</span>
          </button>
          <button className="podcast-nav-item">
            <span>History</span>
          </button>
        </div>

        <div className="podcast-nav-section">
          <h4>AI TOOLS</h4>
          <button className="podcast-nav-item" onClick={() => setCommandOpen(true)}>
            <span>Smart Search</span>
            <span className="nav-badge nav-badge--muted">⌘K</span>
          </button>
          <button className="podcast-nav-item" onClick={() => { setAiPanelOpen(true); setAiTab('voice') }}>
            <span>Voice Chat</span>
          </button>
          <button className="podcast-nav-item" onClick={() => { setAiPanelOpen(true); setAiTab('summary') }}>
            <span>Auto-Summarize</span>
          </button>
        </div>

        <div className="podcast-nav-section" style={{ marginTop: 'auto' }}>
          <button className="podcast-nav-item">
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* === Main Content === */}
      <main className="podcast-main">
        <div className="podcast-main-header">
          <h3 className="podcast-main-title">
            {activeShow ? shows.find(s => s.id === activeShow)?.name : 'All Episodes'}
          </h3>
          <div className="podcast-view-toggle">
            <button
              className={activeView === 'episodes' ? 'active' : ''}
              onClick={() => setActiveView('episodes')}
            >EPISODES</button>
            <button
              className={activeView === 'nowPlaying' ? 'active' : ''}
              onClick={() => setActiveView('nowPlaying')}
            >NOW PLAYING</button>
          </div>
        </div>

        {activeView === 'episodes' ? (
          <div className="podcast-episode-list">
            {displayedEpisodes.map(ep => (
              <div
                key={ep.id}
                className={`podcast-episode-row${ep.id === currentEpisode.id ? ' podcast-episode-row--active' : ''}`}
                onClick={() => handleEpisodeClick(ep)}
              >
                <div className="podcast-episode-cover">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-secondary)' }}>
                    EP{ep.number}
                  </span>
                </div>
                <div className="podcast-episode-info">
                  <div className="podcast-episode-title">Ep. {ep.number} — {ep.title}</div>
                  <div className="podcast-episode-meta">
                    <span>{ep.show}</span>
                    <span>·</span>
                    <span>{ep.date}</span>
                  </div>
                  <div className="podcast-episode-tags">
                    {ep.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`podcast-episode-tag${tag.variant === 'accent' ? ' podcast-episode-tag--accent' : ''}${tag.variant === 'ai' ? ' podcast-episode-tag--ai' : ''}`}
                      >{tag.label}</span>
                    ))}
                  </div>
                </div>
                <div className="podcast-episode-duration">{ep.duration}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="podcast-now-playing">
            <div className="podcast-np-header">
              <div className="podcast-np-cover">
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '32px',
                  color: 'var(--text-display)',
                  letterSpacing: '-0.02em',
                }}>{currentEpisode.number}</div>
              </div>
              <div className="podcast-np-info">
                <span className="podcast-np-show">{currentEpisode.show}</span>
                <h2 className="podcast-np-title">{currentEpisode.title}</h2>
                <p className="podcast-np-desc">{currentEpisode.description}</p>
                <div className="podcast-np-tags">
                  {currentEpisode.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`podcast-episode-tag${tag.variant === 'accent' ? ' podcast-episode-tag--accent' : ''}${tag.variant === 'ai' ? ' podcast-episode-tag--ai' : ''}`}
                    >{tag.label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Show Notes (inline accordion) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                paddingBottom: 'var(--space-xs)',
                borderBottom: '1px solid var(--border)',
              }}>SHOW NOTES</div>
              <div style={{
                padding: 'var(--space-md)',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-card-compact)',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
              }}>
                <div style={{ marginBottom: 'var(--space-sm)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent)' }}>[00:00] </span>
                  Introduction &amp; topic overview
                </div>
                <div style={{ marginBottom: 'var(--space-sm)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent)' }}>[02:40] </span>
                  Screen rendering &amp; retina displays
                </div>
                <div style={{ marginBottom: 'var(--space-sm)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent)' }}>[06:45] </span>
                  Serifs as human craft signal
                </div>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent)' }}>[10:15] </span>
                  Variable font technology
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* === AI Panel === */}
      {aiPanelOpen && (
        <aside className="podcast-ai-panel">
          <div className="ai-panel-header">
            <span className="ai-panel-title">[ AI ASSISTANT ]</span>
            <button className="ai-panel-close" onClick={() => setAiPanelOpen(false)}>CLOSE</button>
          </div>
          <div className="ai-tabs">
            <button className={`ai-tab${aiTab === 'transcript' ? ' ai-tab--active' : ''}`} onClick={() => setAiTab('transcript')}>TRANSCRIPT</button>
            <button className={`ai-tab${aiTab === 'summary' ? ' ai-tab--active' : ''}`} onClick={() => setAiTab('summary')}>SUMMARY</button>
            <button className={`ai-tab${aiTab === 'generate' ? ' ai-tab--active' : ''}`} onClick={() => setAiTab('generate')}>GENERATE</button>
            <button className={`ai-tab${aiTab === 'voice' ? ' ai-tab--active' : ''}`} onClick={() => setAiTab('voice')}>VOICE</button>
          </div>
          <div className="ai-content">
            {aiTab === 'transcript' && (
              <div className="ai-transcript">
                {transcriptLines.map((line, i) => (
                  <div key={i} className={`ai-transcript-line${i === 3 ? ' ai-transcript-line--active' : ''}`}>
                    <span className="ai-transcript-time">{line.time}</span>
                    <span className="ai-transcript-speaker">{line.speaker}</span>
                    <span className="ai-transcript-text">{line.text}</span>
                  </div>
                ))}
                <div className="ai-transcript-footer">
                  <div className="ai-auto-scroll" onClick={() => setAutoScroll(!autoScroll)}>
                    <span className={`ai-auto-scroll-dot${autoScroll ? ' ai-auto-scroll-dot--on' : ''}`} />
                    AUTO-SCROLL {autoScroll ? 'ON' : 'OFF'}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-disabled)' }}>
                    AI TRANSCRIBED
                  </span>
                </div>
              </div>
            )}

            {aiTab === 'summary' && (
              <div className="ai-summary">
                <div className="ai-summary-header">
                  <span className="ai-summary-label">[ AI GENERATED SUMMARY ]</span>
                </div>
                {summaryPoints.map((pt, i) => (
                  <div key={i} className="ai-summary-point">
                    <span className="ai-summary-time">[{pt.time}]</span>
                    <span className="ai-summary-text">{pt.text}</span>
                  </div>
                ))}
                <div className="ai-summary-actions">
                  <button className="ai-action-btn">REGENERATE</button>
                  <button className="ai-action-btn">COPY</button>
                </div>
              </div>
            )}

            {aiTab === 'generate' && (
              <div className="ai-generate">
                <div className="ai-gen-section">
                  <div className="ai-gen-header" onClick={() => setGenOpen(s => ({ ...s, notes: !s.notes }))}>
                    <span className="ai-gen-title">SHOW NOTES</span>
                    <span className="ai-gen-toggle">{genOpen.notes ? '−' : '+'}</span>
                  </div>
                  {genOpen.notes && (
                    <div className="ai-gen-body">
                      <p className="ai-gen-text">{generatedContent.showNotes}</p>
                      <div className="ai-gen-actions">
                        <button className="ai-action-btn">REGENERATE</button>
                        <button className="ai-action-btn">COPY</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="ai-gen-section">
                  <div className="ai-gen-header" onClick={() => setGenOpen(s => ({ ...s, titles: !s.titles }))}>
                    <span className="ai-gen-title">TITLE SUGGESTIONS</span>
                    <span className="ai-gen-toggle">{genOpen.titles ? '−' : '+'}</span>
                  </div>
                  {genOpen.titles && (
                    <div className="ai-gen-body">
                      {generatedContent.titleSuggestions.map((title, i) => (
                        <div key={i} className="ai-gen-title-suggestion">
                          <span className="num">{i + 1}.</span>
                          <span>{title}</span>
                        </div>
                      ))}
                      <div className="ai-gen-actions">
                        <button className="ai-action-btn">REGENERATE</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="ai-gen-section">
                  <div className="ai-gen-header" onClick={() => setGenOpen(s => ({ ...s, social: !s.social }))}>
                    <span className="ai-gen-title">SOCIAL MEDIA</span>
                    <span className="ai-gen-toggle">{genOpen.social ? '−' : '+'}</span>
                  </div>
                  {genOpen.social && (
                    <div className="ai-gen-body">
                      <div style={{ marginBottom: 'var(--space-sm)' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-disabled)', marginBottom: 'var(--space-xs)' }}>TWITTER</div>
                        <p className="ai-gen-text">{generatedContent.socialMedia.twitter}</p>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-disabled)', marginBottom: 'var(--space-xs)' }}>LINKEDIN</div>
                        <p className="ai-gen-text">{generatedContent.socialMedia.linkedin}</p>
                      </div>
                      <div className="ai-gen-actions">
                        <button className="ai-action-btn">REGENERATE</button>
                        <button className="ai-action-btn">COPY ALL</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {aiTab === 'voice' && (
              <div className="ai-voice-chat">
                <div className="ai-chat-messages">
                  {voiceChatHistory.map((msg, i) => (
                    <div key={i} className={`ai-chat-bubble ai-chat-bubble--${msg.role}`}>
                      {msg.text}
                      {msg.role === 'ai' && msg.timestamp && (
                        <div className="timestamp">{msg.timestamp}</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="ai-voice-input">
                  <button
                    className={`ai-mic-button${isRecording ? ' ai-mic-button--recording' : ''}`}
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>●</span>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="9" y="3" width="6" height="12" rx="3" />
                        <path d="M5 11a7 7 0 0 0 14 0" />
                        <line x1="12" y1="18" x2="12" y2="21" />
                      </svg>
                    )}
                  </button>
                  <span className={`ai-voice-hint${isRecording ? ' ai-voice-hint--recording' : ''}`}>
                    {isRecording ? `RECORDING... ${formatTime(recordingTime)}` : 'HOLD TO SPEAK'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* === Player Bar === */}
      <footer className="podcast-player-bar">
        <div className="player-now-playing">
          <div className="player-cover">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--text-secondary)' }}>
              EP{currentEpisode.number}
            </span>
          </div>
          <div className="player-track-info">
            <span className="player-track-title">{currentEpisode.title}</span>
            <span className="player-track-show">{currentEpisode.show}</span>
          </div>
        </div>

        <div className="player-controls">
          <div className="player-buttons">
            <button className="player-btn" onClick={() => {
              const idx = episodes.findIndex(e => e.id === currentEpisode.id)
              setCurrentEpisode(episodes[(idx - 1 + episodes.length) % episodes.length])
              setProgress(0)
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
            </button>
            <button className="player-btn player-btn--play" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
            <button className="player-btn" onClick={() => {
              const idx = episodes.findIndex(e => e.id === currentEpisode.id)
              setCurrentEpisode(episodes[(idx + 1) % episodes.length])
              setProgress(0)
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
            </button>
          </div>
          <div className="player-progress">
            <span className="player-time">{formatTime(currentPosSec)}</span>
            <div className="player-progress-track" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const pct = ((e.clientX - rect.left) / rect.width) * 100
              setProgress(Math.max(0, Math.min(100, pct)))
            }}>
              <div className="player-progress-fill" style={{ width: `${progress}%` }}>
                <div className="player-progress-thumb" />
              </div>
            </div>
            <span className="player-time">{currentEpisode.duration}</span>
          </div>
        </div>

        <div className="player-extras">
          <div className="player-volume">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
            </svg>
            <div className="player-volume-track" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const pct = ((e.clientX - rect.left) / rect.width) * 100
              setVolume(Math.max(0, Math.min(100, pct)))
            }}>
              <div className="player-volume-fill" style={{ width: `${volume}%` }} />
            </div>
          </div>
          <button
            className={`player-ai-toggle${aiPanelOpen ? ' player-ai-toggle--active' : ''}`}
            onClick={() => setAiPanelOpen(!aiPanelOpen)}
          >AI</button>
        </div>
      </footer>

      {/* === Command Palette === */}
      <Command
        open={commandOpen}
        onOpenChange={setCommandOpen}
        groups={commandGroups}
        placeholder="Ask AI or search episodes..."
        emptyMessage="No results found"
      />
    </div>
  )
}
