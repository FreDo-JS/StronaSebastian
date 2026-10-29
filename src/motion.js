import { useEffect } from 'react'

// Props that mark an element for the scroll-reveal observer (variant: up | left | right | scale)
export const R = (d = 0, v = 'up') => ({ 'data-reveal': v, style: { '--d': `${d}s` } })

export function useScrollEffects() {
  useEffect(() => {
    const root = document.documentElement

    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          // data attribute (not a class) so React re-renders of className can't wipe it
          e.target.setAttribute('data-visible', '')
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el))

    let raf = 0
    const update = () => {
      raf = 0
      const max = root.scrollHeight - window.innerHeight
      root.style.setProperty('--scroll', String(Math.round(window.scrollY)))
      root.style.setProperty('--progress', max > 0 ? String(window.scrollY / max) : '0')
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}
