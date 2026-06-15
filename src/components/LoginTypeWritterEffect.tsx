import { TypewriterEffectSmooth } from '@/src/components/ui/typewriter-effect'

const LoginTypeWritterEffect = () => {
  const words = [
    { text: 'Organize', className: 'text-xl text-white/75' },
    { text: 'your', className: 'text-xl text-white/75' },
    { text: 'sprints', className: 'text-xl text-white/75' },
    { text: 'with', className: 'text-xl text-white/75' },
    { text: 'Flowboro.', className: 'text-xl text-violet-400' },
  ]

  return (
    <div className="flex flex-col items-center justify-center mt-16 sm:mt-24 px-4 animate-fade-in-up">
      <div className="relative mb-2">
        <p className="text-4xl sm:text-6xl font-semibold tracking-tight text-white">
          Flowboro
        </p>
        <div
          className="absolute -inset-4 rounded-3xl -z-10"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(109,40,217,0.18) 0%, transparent 70%)',
            filter: 'blur(16px)',
          }}
        />
      </div>
      <TypewriterEffectSmooth words={words} />
      <p className="mt-4 text-sm text-white/45 font-light tracking-wide">
        Le kanban open source — vos tableaux, vos sprints, votre code.
      </p>
    </div>
  )
}

export default LoginTypeWritterEffect
