"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) return defaultValue
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) return getMatches(query)
    return defaultValue
  })

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    setMatches(getMatches(query))
    const handleChange = () => setMatches(getMatches(query))
    matchMedia.addEventListener("change", handleChange)
    return () => matchMedia.removeEventListener("change", handleChange)
  }, [query])

  return matches
}

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] as const }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }

export type CarouselCard = {
  id: string
  imgUrl: string
  label: string
  sublabel: string
  price: string | number
}

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (card: CarouselCard, index: number) => void
    controls: ReturnType<typeof useAnimation>
    cards: CarouselCard[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1000 : 1600
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              className="absolute flex h-full origin-center items-center justify-center rounded-2xl p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(card, i)}
            >
              <div className="relative w-full rounded-2xl overflow-hidden cursor-pointer group">
                <motion.img
                  src={card.imgUrl}
                  alt={card.label}
                  className="pointer-events-none w-full rounded-2xl object-cover aspect-[3/4]"
                  initial={{ filter: "blur(4px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={transition}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-2xl" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <p className="font-display text-feelaj-gold text-lg font-semibold">{card.label}</p>
                  <p className="font-body text-feelaj-text/70 text-xs tracking-wider">{card.sublabel}</p>
                  <p className="font-body text-feelaj-gold text-sm mt-1 font-medium">
                    {typeof card.price === 'number' ? `$${card.price}` : card.price}
                  </p>
                </div>
                {/* Hover ring */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-feelaj-gold/20 group-hover:ring-feelaj-gold/60 transition-all" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

Carousel.displayName = "Carousel"

export function ThreeDCarousel({ cards }: { cards: CarouselCard[] }) {
  const [activeCard, setActiveCard] = useState<CarouselCard | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()

  const handleClick = (card: CarouselCard) => {
    setActiveCard(card)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveCard(null)
    setIsCarouselActive(true)
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-8"
            transition={transitionOverlay}
          >
            <motion.div
              className="bg-feelaj-surface border border-feelaj-gold/30 rounded-3xl p-8 max-w-sm w-full text-center shadow-[0_0_80px_rgba(201,168,76,0.2)]"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={activeCard.imgUrl}
                alt={activeCard.label}
                className="w-32 h-32 object-cover rounded-2xl mx-auto mb-4 ring-2 ring-feelaj-gold/30"
              />
              <h3 className="font-display text-3xl text-feelaj-gold font-semibold mb-1">{activeCard.label}</h3>
              <p className="font-body text-feelaj-text/60 text-sm tracking-wider mb-4">{activeCard.sublabel}</p>
              <p className="font-display text-4xl text-feelaj-text mb-6">
                {typeof activeCard.price === 'number' ? `$${activeCard.price}` : activeCard.price}
              </p>
              <a
                href="#contact"
                onClick={handleClose}
                className="block w-full py-3 bg-feelaj-gold text-feelaj-black font-body font-semibold tracking-widest text-sm rounded-full hover:bg-feelaj-gold/90 transition-colors"
              >
                ORDER VIA WHATSAPP
              </a>
              <button
                onClick={handleClose}
                className="mt-3 text-feelaj-text/40 text-xs font-body tracking-wider hover:text-feelaj-text/70 transition-colors"
              >
                &#x21BA; back to menu
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
        />
      </div>
      {isCarouselActive && (
        <p className="text-center font-body text-feelaj-gold/50 text-xs tracking-widest mt-4 animate-pulse">
          DRAG TO SPIN &middot; CLICK TO SELECT
        </p>
      )}
    </motion.div>
  )
}
