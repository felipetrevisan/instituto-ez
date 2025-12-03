import type { Variants } from 'motion/react'

export const textVariants: Variants = {
  hide: {
    opacity: 0,
    scale: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 1,
      duration: 2,
      ease: 'easeInOut',
    },
  },
}

export const headerVariants: Variants = {
  hide: {
    opacity: 0,
    y: -10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 1,
      duration: 2,
      ease: 'easeInOut',
    },
  },
}

export const footerVariants: Variants = headerVariants

export const headerItemsVariants: Variants = {
  enter: {
    transition: {
      delay: 0.8,
      ease: 'easeInOut',
    },
    opacity: 0,
    marginTop: -10,
  },
  move: {
    transition: {
      delay: 0.8,
      duration: 0.8,
      ease: 'easeInOut',
    },
    opacity: 1,
    marginTop: 0,
  },
  exit: {
    transition: {
      ease: 'easeInOut',
    },
    marginTop: [-10, 0],
    opacity: [0, 1],
  },
}

export const headerLogoVariants: Variants = {
  enter: {
    transition: {
      ease: 'easeInOut',
    },
    opacity: 0,
    marginTop: -10,
    position: 'relative',
  },
  move: {
    transition: {
      delay: 0.8,
      duration: 0.8,
      ease: 'easeInOut',
    },
    opacity: 1,
    marginTop: 0,
  },
  exit: {
    transition: {
      ease: 'easeInOut',
    },
    marginTop: [-10, 0],
    opacity: [0, 1],
  },
}

export const sidebarVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 25,
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
}

export const slideUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 1,
      type: 'spring',
      stiffness: 100,
    },
  },
}

export const opacityVariants: Variants = {
  inital: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 3,
    },
  },
}

export const menuListVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

export const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

// Landing Page Animations
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const iconRotateVariants: Variants = {
  rest: {
    rotate: 0,
    scale: 1,
  },
  hover: {
    rotate: [0, -10, 10, -10, 0],
    scale: 1.1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}
