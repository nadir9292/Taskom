const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const containerOnAppear = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      when: 'beforeChildren',
      duration: 0.4,
      ease,
    },
  },
}

export const itemOnAppear = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
}

export const scaleOnAppear = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease },
  },
}
