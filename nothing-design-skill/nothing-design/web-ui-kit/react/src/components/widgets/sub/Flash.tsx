import React from 'react';

export function Flash({ theme: _theme, size: _size, className, 'aria-label': ariaLabel, style }: {
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`widget-relative widget-shrink-0 size-[152px] ${className || ''}`.trim()} data-name="Flash" aria-label={ariaLabel || "Flash"}>
      <svg className="nothing-widget-icon-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 152 152">
        <g id="Flash">
          <circle cx="76" cy="76" fill="var(--fill-0, var(--widget-card-bg))" id="BG" r="76" style={{ fill: "color(display-p3 0.9882 0.9804 0.9961)", fillOpacity: "1" }} />
          <g id="Dots">
            <ellipse cx="82.8572" cy="48.4286" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 144" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="82.8572" cy="55.2857" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 187" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="82.8572" cy="62.1428" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 188" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="82.8572" cy="69" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 189" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="82.8572" cy="75.8572" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 190" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="82.8572" cy="82.7143" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 191" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="82.8572" cy="89.5714" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 192" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="76" cy="55.2857" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 144_2" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="76" cy="62.1428" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 187_2" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="76" cy="69" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 188_2" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="76" cy="75.8572" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 189_2" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="76" cy="82.7143" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 190_2" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="76" cy="89.5714" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 191_2" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="76" cy="96.4286" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 192_2" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="62.2857" cy="69" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 190_3" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="89.7143" cy="82.7142" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 191_3" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} transform="rotate(180 89.7143 82.7142)" />
            <ellipse cx="62.2857" cy="75.8572" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 189_3" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="89.7143" cy="75.8571" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 192_3" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} transform="rotate(180 89.7143 75.8571)" />
            <ellipse cx="55.4286" cy="75.8572" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 188_3" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="96.5714" cy="75.8571" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 193" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} transform="rotate(180 96.5714 75.8571)" />
            <ellipse cx="69.1429" cy="62.1428" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 144_3" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="69.1429" cy="69" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 187_3" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="69.1429" cy="75.8572" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 188_4" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="69.1429" cy="82.7143" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 189_4" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="69.1429" cy="89.5714" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 190_4" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="69.1429" cy="96.4286" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 191_4" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
            <ellipse cx="69.1429" cy="103.286" fill="var(--fill-0, var(--widget-dark-bg))" id="Ellipse 192_4" rx="3.42857" ry="3.42857" style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
          </g>
        </g>
      </svg>
    </div>
  );
}
