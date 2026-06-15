import { ImageResponse } from 'next/og'

export const alt = 'Flowboro — Kanban open source pour équipes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #06061a 0%, #2b34e2 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: '-4px' }}>
          Flowboro
        </div>
        <div style={{ fontSize: 44, fontWeight: 500, marginTop: 16 }}>
          Le kanban open source pour équipes
        </div>
        <div style={{ fontSize: 30, opacity: 0.8, marginTop: 24, maxWidth: 900 }}>
          Gratuit, auto-hébergeable et transparent.
        </div>
      </div>
    ),
    { ...size }
  )
}
