import Popover from '@mui/material/Popover'
import Box from '@mui/material/Box'
import { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

const options = {
  weather: {
    title: 'Weather',
    description: "Get your location's current weather",
  },
} satisfies Record<string, { title: string; description: string }>
// @ts-expect-error
const optionsEntries: Array<
  [OptionId, { title: string; description: string }]
> = Object.entries(options)

export type OptionId = keyof typeof options

export const optionIds: Array<OptionId> = ['weather']

export type WidgetPlaceholderProps = {
  onWidgetSelect: (widget: keyof typeof options) => void
}

export function WidgetPlaceholder({ onWidgetSelect }: WidgetPlaceholderProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = !!anchorEl
  const id = open ? 'widget-popover' : undefined

  const handleOptionSelect = (id: OptionId) => {
    onWidgetSelect(id)
    setAnchorEl(null)
  }

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null)
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <List
          sx={{ bgcolor: 'background.paper' }}
          subheader={<ListSubheader>Widget selection</ListSubheader>}
        >
          {optionsEntries.map(([id, { title, description }]) => (
            <ListItem disablePadding key={id}>
              <ListItemButton onClick={() => handleOptionSelect(id)}>
                <ListItemText primary={title} secondary={description} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton disabled>
              <ListItemText
                primary="Coming Soon"
                secondary="More widgets are on the way!"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
      <Box
        aria-describedby={id}
        sx={{ border: '1px dashed grey', height: 100, width: '100%' }}
        component="button"
        onClick={(event) => {
          setAnchorEl(event.currentTarget)
        }}
      >
        + Add widget
      </Box>
    </>
  )
}
