
import React from 'react'

const Starfield: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-[radial-gradient(1000px_700px_at_80%_-10%,rgba(0,74,173,0.18),transparent),radial-gradient(900px_600px_at_10%_20%,rgba(245,197,66,0.16),transparent)]" />
    <div
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage: `
          radial-gradient(1.5px_1.5px_at_15%_25%,rgba(255,255,255,.5)50%,transparent_51%),
          radial-gradient(1px_1px_at_65%_75%,rgba(255,255,255,.45)50%,transparent_51%),
          radial-gradient(1px_1px_at_80%_15%,rgba(255,255,255,.5)50%,transparent_51%),
          radial-gradient(1px_1px_at_35%_85%,rgba(255,255,255,.45)50%,transparent_51%)
        `,
        backgroundRepeat: 'repeat'
      }}
    />
  </div>
)

export default Starfield
