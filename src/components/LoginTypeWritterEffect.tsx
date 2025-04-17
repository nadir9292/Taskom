import { TypewriterEffectSmooth } from '@/src/components/ui/typewriter-effect'

const LoginTypeWritterEffect = () => {
  const words = [
    {
      text: 'Organize',
      className: 'text-xl',
    },
    {
      text: 'your',
      className: 'text-xl',
    },
    {
      text: 'tasks',
      className: 'text-xl',
    },
    {
      text: 'with',
      className: 'text-xl',
    },
    {
      text: 'Taskom.',
      className: 'text-blue-500 dark:text-blue-500 text-2xl',
    },
  ]
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-24">
        <p className="text-5xl font-medium">Taskom</p>
        <TypewriterEffectSmooth words={words} />
      </div>
    </>
  )
}

export default LoginTypeWritterEffect
