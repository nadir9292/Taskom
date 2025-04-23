export const containerOnAppear = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      when: 'beforeChildren',
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}
