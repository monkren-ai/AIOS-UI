import '@/styles/design-system-docs.css'

function DesignSystemSection() {
  return (
    <div className="ds-docs">
      {/* === Philosophy === */}
      <div>
        <h3 className="ds-subsection-title">[ DESIGN PHILOSOPHY ]</h3>
        <div className="ds-principles">
          <div className="ds-principle">
            <p className="ds-principle-label">PRINCIPLE 01</p>
            <p className="ds-principle-value">Subtract, don't add</p>
          </div>
          <div className="ds-principle">
            <p className="ds-principle-label">PRINCIPLE 02</p>
            <p className="ds-principle-value">No shadows, no blur</p>
          </div>
          <div className="ds-principle">
            <p className="ds-principle-label">PRINCIPLE 03</p>
            <p className="ds-principle-value">Monochrome first</p>
          </div>
          <div className="ds-principle">
            <p className="ds-principle-label">PRINCIPLE 04</p>
            <p className="ds-principle-value">Dot-matrix aesthetic</p>
          </div>
        </div>
      </div>

      {/* === Color Tokens === */}
      <div className="ds-doc-card">
        <h3 className="ds-subsection-title">[ COLOR TOKENS ]</h3>
        <table className="ds-token-table">
          <thead>
            <tr>
              <th>SWATCH</th>
              <th>TOKEN</th>
              <th>VALUE</th>
              <th>USAGE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className="ds-swatch" style={{ background: '#000000' }} />
              </td>
              <td className="ds-token-name">--black</td>
              <td className="ds-token-value">#000000</td>
              <td>Page canvas (dark)</td>
            </tr>
            <tr>
              <td>
                <span className="ds-swatch" style={{ background: '#111111' }} />
              </td>
              <td className="ds-token-name">--surface</td>
              <td className="ds-token-value">#111111</td>
              <td>Card background</td>
            </tr>
            <tr>
              <td>
                <span className="ds-swatch" style={{ background: '#1A1A1A' }} />
              </td>
              <td className="ds-token-name">--surface-raised</td>
              <td className="ds-token-value">#1A1A1A</td>
              <td>Elevated card / dropdown</td>
            </tr>
            <tr>
              <td>
                <span className="ds-swatch" style={{ background: '#222222' }} />
              </td>
              <td className="ds-token-name">--border</td>
              <td className="ds-token-value">#222222</td>
              <td>Subtle border</td>
            </tr>
            <tr>
              <td>
                <span className="ds-swatch" style={{ background: '#333333' }} />
              </td>
              <td className="ds-token-name">--border-visible</td>
              <td className="ds-token-value">#333333</td>
              <td>Visible border</td>
            </tr>
            <tr>
              <td>
                <span className="ds-swatch" style={{ background: '#666666' }} />
              </td>
              <td className="ds-token-name">--text-disabled</td>
              <td className="ds-token-value">#666666</td>
              <td>Disabled text</td>
            </tr>
            <tr>
              <td>
                <span className="ds-swatch" style={{ background: '#999999' }} />
              </td>
              <td className="ds-token-name">--text-secondary</td>
              <td className="ds-token-value">#999999</td>
              <td>Secondary text / labels</td>
            </tr>
            <tr>
              <td>
                <span className="ds-swatch" style={{ background: '#E8E8E8' }} />
              </td>
              <td className="ds-token-name">--text-primary</td>
              <td className="ds-token-value">#E8E8E8</td>
              <td>Body text</td>
            </tr>
            <tr>
              <td>
                <span className="ds-swatch" style={{ background: '#FFFFFF' }} />
              </td>
              <td className="ds-token-name">--text-display</td>
              <td className="ds-token-value">#FFFFFF</td>
              <td>Headlines / max contrast</td>
            </tr>
            <tr>
              <td>
                <span className="ds-swatch" style={{ background: '#D71921' }} />
              </td>
              <td className="ds-token-name">--accent</td>
              <td className="ds-token-value">#D71921</td>
              <td>Red accent (destructive / active)</td>
            </tr>
            <tr>
              <td>
                <span className="ds-swatch" style={{ background: '#4A9E5C' }} />
              </td>
              <td className="ds-token-name">--success</td>
              <td className="ds-token-value">#4A9E5C</td>
              <td>Success status</td>
            </tr>
            <tr>
              <td>
                <span className="ds-swatch" style={{ background: '#D4A843' }} />
              </td>
              <td className="ds-token-name">--warning</td>
              <td className="ds-token-value">#D4A843</td>
              <td>Warning status</td>
            </tr>
            <tr>
              <td>
                <span className="ds-swatch" style={{ background: '#5B9BF6' }} />
              </td>
              <td className="ds-token-name">--interactive</td>
              <td className="ds-token-value">#5B9BF6</td>
              <td>Interactive / focus ring</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* === Typography === */}
      <div className="ds-doc-card">
        <h3 className="ds-subsection-title">[ TYPOGRAPHY — TYPE SCALE ]</h3>
        <table className="ds-token-table">
          <thead>
            <tr>
              <th>TOKEN</th>
              <th>SIZE</th>
              <th>LINE-HEIGHT</th>
              <th>TRACKING</th>
              <th>SAMPLE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="ds-token-name">--display-xl</td>
              <td className="ds-token-value">80px</td>
              <td className="ds-token-value">1.0 (--leading-display-xl)</td>
              <td className="ds-token-value">-0.03em</td>
              <td
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-display)',
                }}
              >
                Aa
              </td>
            </tr>
            <tr>
              <td className="ds-token-name">--display-lg</td>
              <td className="ds-token-value">64px</td>
              <td className="ds-token-value">1.05 (--leading-display-lg)</td>
              <td className="ds-token-value">-0.02em</td>
              <td
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-display)',
                }}
              >
                Aa
              </td>
            </tr>
            <tr>
              <td className="ds-token-name">--heading</td>
              <td className="ds-token-value">32px</td>
              <td className="ds-token-value">1.2 (--leading-heading)</td>
              <td className="ds-token-value">-0.01em</td>
              <td
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  color: 'var(--text-display)',
                }}
              >
                Aa
              </td>
            </tr>
            <tr>
              <td className="ds-token-name">--body</td>
              <td className="ds-token-value">16px</td>
              <td className="ds-token-value">1.5 (--leading-body)</td>
              <td className="ds-token-value">0</td>
              <td
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  color: 'var(--text-primary)',
                }}
              >
                Aa
              </td>
            </tr>
            <tr>
              <td className="ds-token-name">--label</td>
              <td className="ds-token-value">11px</td>
              <td className="ds-token-value">1.2 (--leading-label)</td>
              <td className="ds-token-value">0.08em</td>
              <td
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                }}
              >
                LABEL
              </td>
            </tr>
            <tr>
              <td className="ds-token-name">--caption</td>
              <td className="ds-token-value">10px</td>
              <td className="ds-token-value">1.4 (--leading-caption)</td>
              <td className="ds-token-value">0.04em</td>
              <td
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.04em',
                  color: 'var(--text-secondary)',
                }}
              >
                caption
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* === Spacing & Layout === */}
      <div className="ds-doc-card">
        <h3 className="ds-subsection-title">[ SPACING & LAYOUT TOKENS ]</h3>
        <table className="ds-token-table">
          <thead>
            <tr>
              <th>TOKEN</th>
              <th>VALUE</th>
              <th>USAGE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="ds-token-name">--space-xs</td>
              <td className="ds-token-value">4px</td>
              <td>Tight gap</td>
            </tr>
            <tr>
              <td className="ds-token-name">--space-sm</td>
              <td className="ds-token-value">8px</td>
              <td>Element gap</td>
            </tr>
            <tr>
              <td className="ds-token-name">--space-md</td>
              <td className="ds-token-value">16px</td>
              <td>Default padding</td>
            </tr>
            <tr>
              <td className="ds-token-name">--space-lg</td>
              <td className="ds-token-value">24px</td>
              <td>Card padding</td>
            </tr>
            <tr>
              <td className="ds-token-name">--space-xl</td>
              <td className="ds-token-value">32px</td>
              <td>Section gap</td>
            </tr>
            <tr>
              <td className="ds-token-name">--space-2xl</td>
              <td className="ds-token-value">48px</td>
              <td>Large section gap</td>
            </tr>
            <tr>
              <td className="ds-token-name">--page-max-width</td>
              <td className="ds-token-value">1120px</td>
              <td>Page max width</td>
            </tr>
            <tr>
              <td className="ds-token-name">--modal-max-width</td>
              <td className="ds-token-value">480px</td>
              <td>Modal max width</td>
            </tr>
            <tr>
              <td className="ds-token-name">--section-gap</td>
              <td className="ds-token-value">80px</td>
              <td>Section rhythm</td>
            </tr>
            <tr>
              <td className="ds-token-name">--card-padding</td>
              <td className="ds-token-value">24px</td>
              <td>Standard card padding</td>
            </tr>
            <tr>
              <td className="ds-token-name">--content-width-narrow</td>
              <td className="ds-token-value">640px</td>
              <td>Prose / article</td>
            </tr>
            <tr>
              <td className="ds-token-name">--content-width-wide</td>
              <td className="ds-token-value">1024px</td>
              <td>Dashboard / data</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* === Named Radius === */}
      <div className="ds-doc-card">
        <h3 className="ds-subsection-title">[ NAMED RADIUS BY ELEMENT ]</h3>
        <div className="ds-radius-demo">
          <div className="ds-radius-item">
            <div className="ds-radius-box" style={{ borderRadius: 'var(--radius-button)' }} />
            <span className="ds-radius-label">button 999px</span>
          </div>
          <div className="ds-radius-item">
            <div className="ds-radius-box" style={{ borderRadius: 'var(--radius-card)' }} />
            <span className="ds-radius-label">card 16px</span>
          </div>
          <div className="ds-radius-item">
            <div className="ds-radius-box" style={{ borderRadius: 'var(--radius-card-compact)' }} />
            <span className="ds-radius-label">compact 8px</span>
          </div>
          <div className="ds-radius-item">
            <div
              className="ds-radius-box"
              style={{ borderRadius: 'var(--radius-card-technical)' }}
            />
            <span className="ds-radius-label">technical 4px</span>
          </div>
          <div className="ds-radius-item">
            <div className="ds-radius-box" style={{ borderRadius: 'var(--radius-input)' }} />
            <span className="ds-radius-label">input 8px</span>
          </div>
          <div className="ds-radius-item">
            <div className="ds-radius-box" style={{ borderRadius: 'var(--radius-tag)' }} />
            <span className="ds-radius-label">tag 999px</span>
          </div>
          <div className="ds-radius-item">
            <div className="ds-radius-box" style={{ borderRadius: 'var(--radius-tooltip)' }} />
            <span className="ds-radius-label">tooltip 8px</span>
          </div>
        </div>
      </div>

      {/* === Surface & Elevation === */}
      <div className="ds-doc-card">
        <h3 className="ds-subsection-title">[ SURFACE & ELEVATION — NO SHADOW ]</h3>
        <div className="ds-surface-demo">
          <div className="ds-surface-level ds-surface-canvas">
            <span>--black (CANVAS)</span>
            <span>#000000</span>
          </div>
          <div className="ds-surface-level ds-surface-surface">
            <span>--surface (LEVEL 1)</span>
            <span>#111111</span>
          </div>
          <div className="ds-surface-level ds-surface-raised">
            <span>--surface-raised (LEVEL 2)</span>
            <span>#1A1A1A</span>
          </div>
          <div className="ds-surface-level ds-surface-border">
            <span>--surface + 2px border (LEVEL 3)</span>
            <span>BORDER ELEVATION</span>
          </div>
        </div>
      </div>

      {/* === Focus & Accessibility === */}
      <div className="ds-doc-card">
        <h3 className="ds-subsection-title">[ FOCUS & ACCESSIBILITY ]</h3>
        <div className="ds-focus-demo">
          <button>FOCUS ME</button>
          <button className="secondary">OR ME</button>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--caption)',
              color: 'var(--text-secondary)',
            }}
          >
            Tab to focus → outline: var(--focus-ring-width) solid var(--focus-ring-color)
          </span>
        </div>
        <table className="ds-token-table" style={{ marginTop: 'var(--space-md)' }}>
          <thead>
            <tr>
              <th>TOKEN</th>
              <th>VALUE</th>
              <th>USAGE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="ds-token-name">--focus-ring-width</td>
              <td className="ds-token-value">2px</td>
              <td>Outline width</td>
            </tr>
            <tr>
              <td className="ds-token-name">--focus-ring-color</td>
              <td className="ds-token-value">var(--interactive)</td>
              <td>Outline color</td>
            </tr>
            <tr>
              <td className="ds-token-name">--focus-ring-offset</td>
              <td className="ds-token-value">2px</td>
              <td>Outline offset</td>
            </tr>
            <tr>
              <td className="ds-token-name">--touch-target-min</td>
              <td className="ds-token-value">44px</td>
              <td>Min touch target</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* === Z-Index Scale === */}
      <div className="ds-doc-card">
        <h3 className="ds-subsection-title">[ Z-INDEX SCALE ]</h3>
        <table className="ds-token-table">
          <thead>
            <tr>
              <th>TOKEN</th>
              <th>VALUE</th>
              <th>LAYER</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="ds-token-name">--z-base</td>
              <td className="ds-token-value">1</td>
              <td>Base content</td>
            </tr>
            <tr>
              <td className="ds-token-name">--z-dropdown</td>
              <td className="ds-token-value">50</td>
              <td>Dropdowns / menus</td>
            </tr>
            <tr>
              <td className="ds-token-name">--z-sticky</td>
              <td className="ds-token-value">80</td>
              <td>Sticky nav / taskbar</td>
            </tr>
            <tr>
              <td className="ds-token-name">--z-overlay</td>
              <td className="ds-token-value">100</td>
              <td>Overlay backdrop</td>
            </tr>
            <tr>
              <td className="ds-token-name">--z-popover</td>
              <td className="ds-token-value">200</td>
              <td>Popovers / hover cards</td>
            </tr>
            <tr>
              <td className="ds-token-name">--z-tooltip</td>
              <td className="ds-token-value">300</td>
              <td>Tooltips</td>
            </tr>
            <tr>
              <td className="ds-token-name">--z-modal</td>
              <td className="ds-token-value">1000</td>
              <td>Modal dialogs</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* === Do's & Don'ts === */}
      <div>
        <h3 className="ds-subsection-title">[ DO'S & DON'TS — COLOR ]</h3>
        <div className="ds-dos-donts">
          <div className="ds-dos">
            <p className="ds-dos-title">DO</p>
            <ul>
              <li>Use --canvas / --surface / --surface-raised for surface hierarchy</li>
              <li>Use --accent (red) sparingly for destructive actions only</li>
              <li>Differentiate data with opacity (100%/60%/30%) before hue</li>
            </ul>
          </div>
          <div className="ds-donts">
            <p className="ds-donts-title">DON'T</p>
            <ul>
              <li>Don't introduce new accent colors — monochrome + red only</li>
              <li>Don't use --text color for borders; use --border-subtle</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="ds-subsection-title">[ DO'S & DON'TS — LAYOUT ]</h3>
        <div className="ds-dos-donts">
          <div className="ds-dos">
            <p className="ds-dos-title">DO</p>
            <ul>
              <li>Constrain pages with var(--page-max-width) (1120px)</li>
              <li>Use var(--section-gap) (80px) between major sections</li>
              <li>Select content width by purpose: narrow for prose, wide for dashboards</li>
            </ul>
          </div>
          <div className="ds-donts">
            <p className="ds-donts-title">DON'T</p>
            <ul>
              <li>Don't hardcode max-width pixel values</li>
              <li>Don't exceed --page-max-width without explicit full-bleed intent</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="ds-subsection-title">[ DO'S & DON'TS — COMPONENT ]</h3>
        <div className="ds-dos-donts">
          <div className="ds-dos">
            <p className="ds-dos-title">DO</p>
            <ul>
              <li>Apply var(--focus-ring-*) on :focus-visible</li>
              <li>Ensure interactive elements meet var(--touch-target-min) (44px)</li>
              <li>Use named radius: --radius-button, --radius-card, --radius-input</li>
            </ul>
          </div>
          <div className="ds-donts">
            <p className="ds-donts-title">DON'T</p>
            <ul>
              <li>Don't remove focus outlines — accessibility is non-negotiable</li>
              <li>Don't mix radius scales within a component group</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="ds-subsection-title">[ DO'S & DON'TS — MOTION ]</h3>
        <div className="ds-dos-donts">
          <div className="ds-dos">
            <p className="ds-dos-title">DO</p>
            <ul>
              <li>Use named transitions: --transition-fade, --transition-color</li>
              <li>Keep durations in 100ms–200ms range</li>
            </ul>
          </div>
          <div className="ds-donts">
            <p className="ds-donts-title">DON'T</p>
            <ul>
              <li>Don't use box-shadow animations or filter: blur() transitions</li>
              <li>Don't exceed 200ms for UI feedback transitions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* === Anti-patterns === */}
      <div className="ds-doc-card ds-doc-card--raised">
        <h3 className="ds-subsection-title">[ ANTI-PATTERNS — WHAT TO NEVER DO ]</h3>
        <ul className="ds-anti-patterns">
          <li>No gradients in UI chrome</li>
          <li>No shadows. No blur. Flat surfaces, border separation.</li>
          <li>No skeleton loading screens. Use [LOADING...] text or segmented spinner.</li>
          <li>No toast popups. Use inline status text: [SAVED], [ERROR: ...]</li>
          <li>No sad-face illustrations, cute mascots, or multi-paragraph empty states</li>
          <li>No zebra striping in tables</li>
          <li>No filled icons, multi-color icons, or emoji as UI</li>
          <li>No parallax, scroll-jacking, or gratuitous animation</li>
          <li>No spring/bounce easing. Use subtle ease-out only.</li>
          <li>
            No border-radius {'>'} 16px on cards. Buttons are pill (999px) or technical (4–8px).
          </li>
          <li>No hardcoded max-width / outline / z-index / border-width — must use tokens</li>
          <li>No shadow-based elevation — use surface contrast + border separation</li>
        </ul>
      </div>

      {/* === Similar Brands === */}
      <div className="ds-doc-card">
        <h3 className="ds-subsection-title">[ SIMILAR BRANDS — DESIGN CONTEXT ]</h3>
        <table className="ds-brands-table">
          <thead>
            <tr>
              <th>BRAND</th>
              <th>SHARED PRINCIPLE</th>
              <th>REFERENCE VALUE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Linear</td>
              <td>Monochrome UI, keyboard-first, dense data, subtle motion</td>
              <td>App UI patterns, issue tracking layout</td>
            </tr>
            <tr>
              <td>Vercel</td>
              <td>Black/white/geist aesthetic, minimal chrome, mono typography</td>
              <td>Marketing page structure, deployment dashboards</td>
            </tr>
            <tr>
              <td>Teenage Engineering</td>
              <td>"Less, but better" hardware, dot-matrix displays</td>
              <td>Dot-matrix aesthetic, hardware-software parity</td>
            </tr>
            <tr>
              <td>Braun (Dieter Rams)</td>
              <td>"Less but better", functional clarity, no decoration</td>
              <td>Ten principles for good design — philosophical anchor</td>
            </tr>
            <tr>
              <td>Nothing (Phone)</td>
              <td>Dot-matrix UI, transparent materials, monochrome OS</td>
              <td>Direct namesake — dot-matrix widget patterns, glyph font</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* === Agent Prompt Guide === */}
      <div>
        <h3 className="ds-subsection-title">[ AGENT PROMPT GUIDE — EXAMPLES ]</h3>

        <div className="ds-prompt-card">
          <p className="ds-prompt-card-title">HERO SECTION</p>
          <p className="ds-prompt-card-body">
            Container: max-width: var(--page-max-width), padding: 0 var(--space-lg). Headline:
            --font-size-display-lg, font-weight: 700, line-height: var(--leading-display-lg),
            letter-spacing: var(--tracking-display-lg), color --text. Subhead: --font-size-body-lg,
            --leading-body, --text-muted. CTA: pill button (--radius-button).
          </p>
        </div>

        <div className="ds-prompt-card">
          <p className="ds-prompt-card-title">CARD</p>
          <p className="ds-prompt-card-body">
            Surface: var(--surface), border: 1px solid var(--border-subtle), radius:
            var(--radius-card) (16px). Padding: var(--card-padding) (24px). Title:
            --font-size-heading-sm, --tracking-heading. Body: --font-size-body, --leading-body,
            --text-muted. No shadow.
          </p>
        </div>

        <div className="ds-prompt-card">
          <p className="ds-prompt-card-title">NAVIGATION</p>
          <p className="ds-prompt-card-body">
            Height: 56px, sticky (position: sticky; top: 0; z-index: var(--z-sticky)). Background:
            var(--surface) with border-bottom: 1px solid var(--border-subtle). Nav items:
            --font-size-label, uppercase, --tracking-label. Active: 2px solid var(--accent) bottom
            border (--border-width-accent). Each item meets var(--touch-target-min).
          </p>
        </div>

        <div className="ds-prompt-card">
          <p className="ds-prompt-card-title">DATA ROW</p>
          <p className="ds-prompt-card-body">
            Row height: 48px, padding: 0 var(--space-md). Border-bottom: 1px solid
            var(--border-subtle). Label: --font-size-label, uppercase, --tracking-label,
            --text-muted. Value: --font-size-body, --text. Hover: background var(--surface-raised).
            Active: 2px solid var(--accent) left border. Focus: outline: var(--focus-ring-width)
            solid var(--focus-ring-color).
          </p>
        </div>

        <div className="ds-prompt-card">
          <p className="ds-prompt-card-title">MODAL</p>
          <p className="ds-prompt-card-body">
            Overlay: background: var(--overlay-heavy), z-index: var(--z-modal). Dialog: max-width:
            var(--modal-max-width) (480px), var(--surface-raised), border: 1px solid
            var(--border-strong), border-radius: var(--radius-card). Padding: var(--space-lg). Close
            button: top-right, --radius-button. Focus trap inside modal. Escape key closes. Animate
            with var(--transition-fade).
          </p>
        </div>
      </div>
    </div>
  )
}

export default DesignSystemSection
