//TODO: Wrapper for card content
import React from 'react'

export default function CardContent({ children, ...props }) {
  return (
    <div {...props}>
      {children}
    </div>
  )
}
