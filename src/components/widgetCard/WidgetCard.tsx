import Card from '@mui/material/Card'
import { ReactNode } from 'react'

export type WidgetCardProps = {
  children: ReactNode
}

export function WidgetCard({ children }: WidgetCardProps) {
  return (
    <Card
      elevation={3}
      sx={{
        padding: 2,
        height: 100,
        width: '100%',
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Card>
  )
}
