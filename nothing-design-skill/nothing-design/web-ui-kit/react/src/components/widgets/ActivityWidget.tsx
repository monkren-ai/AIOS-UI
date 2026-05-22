import { withWidgetCard } from './withWidgetCard'
import '../../styles/activity-widget.css'

interface ActivityDay {
  label: string;
  value: string;
  markers: (0 | 1)[];
}

interface ActivityWidgetProps {
  days?: ActivityDay[];
  className?: string;
  style?: React.CSSProperties;
}

const ActivityWidget: React.FC<ActivityWidgetProps> = ({
  days = [
    { label: 'SUN', value: '9H26', markers: [1, 0, 1] },
    { label: 'MON', value: '9H14', markers: [1, 1, 0] },
    { label: 'TUE', value: '8H52', markers: [0, 1, 1] },
    { label: 'WED', value: '7H30', markers: [1, 0, 0] },
    { label: 'THU', value: '10H05', markers: [1, 1, 1] },
    { label: 'FRI', value: '6H48', markers: [0, 0, 1] },
    { label: 'SAT', value: '5H15', markers: [0, 1, 0] }
  ],
  className,
  style
}) => {
  const content = (
    <div className={['nothing-activity-widget', className].filter(Boolean).join(' ')} style={style}>
      <div className="nothing-activity-widget__markers" role="list">
        {days.map((day, idx) => (
          <div key={idx} className="nothing-activity-widget__marker-col">
            {day.markers.map((marker, markerIdx) => (
              <div
                key={markerIdx}
                role="listitem"
                aria-label={marker ? 'Active' : 'Inactive'}
                className={[
                  'nothing-activity-widget__marker',
                  marker ? 'nothing-activity-widget__marker--active' : 'nothing-activity-widget__marker--inactive'
                ].filter(Boolean).join(' ')}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="nothing-activity-widget__days">
        {days.map((day, idx) => (
          <div key={idx} className="nothing-activity-widget__day">
            <div className="nothing-activity-widget__day-label">{day.label}</div>
            <div className="nothing-activity-widget__day-value">{day.value}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return content
};

export default withWidgetCard(ActivityWidget);
