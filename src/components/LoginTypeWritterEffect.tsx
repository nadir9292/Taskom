import { TypewriterEffectSmooth } from '@/src/components/ui/typewriter-effect'

const LoginTypeWritterEffect = () => {
  const words = [
    { text: 'Organize', className: 'text-xl text-white/70' },
    { text: 'your', className: 'text-xl text-white/70' },
    { text: 'tasks', className: 'text-xl text-white/70' },
    { text: 'with', className: 'text-xl text-white/70' },
    { text: 'Taskom.', className: 'text-xl text-violet-400' },
  ]

  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <p className="text-5xl font-semibold tracking-tight text-white">Taskom</p>
      <TypewriterEffectSmooth words={words} />
    </div>
  )
}

export default LoginTypeWritterEffect
