import { COLUMN_WIDTH_PX, VISIBLE_COLUMNS } from '@/constant'
import { useState, useCallback } from 'react'

interface VisibleRange {
  startIndex: number
  endIndex: number
  offsetPx: number
}

export function useVisibleRange() {
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollLeft(e.currentTarget.scrollLeft)
  }, [])

  const visibleRange: VisibleRange = {
    startIndex: Math.floor(scrollLeft / COLUMN_WIDTH_PX),
    endIndex: Math.floor(scrollLeft / COLUMN_WIDTH_PX) + VISIBLE_COLUMNS,
    offsetPx: scrollLeft % COLUMN_WIDTH_PX,
  }

  return { visibleRange, handleScroll, scrollLeft }
}
