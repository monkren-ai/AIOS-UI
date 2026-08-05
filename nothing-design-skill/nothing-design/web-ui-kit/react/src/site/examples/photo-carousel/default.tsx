import { PhotoCarousel } from 'nothing-ui/photo-carousel'

export default function PhotoCarouselDefault() {
  return (
    <PhotoCarousel
      className="w-full max-w-md"
      autoPlayInterval={6000}
      slides={[
        { title: 'Solar Flare', subtitle: 'Chromosphere · H-alpha', pattern: 0 },
        { title: 'Verdant', subtitle: 'Coastal pine · 04:21', pattern: 1 },
        { title: 'Glacial', subtitle: 'Polar · -12°C', pattern: 2 },
      ]}
    />
  )
}
