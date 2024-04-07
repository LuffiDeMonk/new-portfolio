export const variants = {
    initial: {
        opacity: 0,
        y: 50
    },
    whileInView: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            staggerChildren: 0.1
        }
    }
}


export const cardVariants = {
    initial: {
        opacity: 0,
        y: 50
    },
    whileInView: (custom: number) => {
        return {
            opacity: 1,
            y: 0,
            transition: {
                delay: custom * 0.1,
                duration: 0.3,
                ease: 'easeOut'
            }
        }
    }
}
export const AboutVariants = {
    initial: {
        opacity: 0,
        x: 80
    },
    whileInView: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1
        }
    }
}

export const AboutVariants2 = {
    initial: {
        opacity: 0,
        y: 80
    },
    whileInView: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1
        }
    }
}