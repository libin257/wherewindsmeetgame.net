// src/data/videos.ts

export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
}

export const featuredVideos: Video[] = [
  {
    id: 'ydirmet86Uk',
    title: 'Official Gameplay Trailer',
    description: 'Official 2-minute trailer showcasing key gameplay elements',
    thumbnail: 'https://img.youtube.com/vi/ydirmet86Uk/maxresdefault.jpg'
  },
  {
    id: 'IHOpJyGxSDc',
    title: 'In-Depth Review (20 min)',
    description: 'Comprehensive media review and impressions',
    thumbnail: 'https://img.youtube.com/vi/IHOpJyGxSDc/maxresdefault.jpg'
  },
  {
    id: 'kYxxTWN5N1c',
    title: 'Full Playthrough No Commentary',
    description: 'Complete gameplay walkthrough',
    thumbnail: 'https://img.youtube.com/vi/kYxxTWN5N1c/maxresdefault.jpg'
  }
]
