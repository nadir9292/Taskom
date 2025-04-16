import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import FOG from 'vanta/dist/vanta.fog.min'

const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: '#FAF3E0', // Crème très clair
          midtoneColor: '#DFF6FF', // Bleu glacier
          lowlightColor: '#BFD7ED', // Bleu pastel
          baseColor: '#EEF2F3', // Gris très clair (presque blanc)
          blurFactor: 0.79,
          zoom: 0.4,
        })
      )
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div ref={vantaRef} className="fixed inset-0 -z-0 w-full h-full">
      {/* Ton contenu peut aller ici si besoin */}
    </div>
  )
}

export default VantaBackground
