import { type ChangeEvent, useState } from 'react'

import { HStack } from '@kdan-ui'
import AddIcon from '@mui/icons-material/Add'
import SubtractIcon from '@mui/icons-material/Remove'
import { IconButton, TextField } from '@mui/material'
import grey from '@mui/material/colors/grey'

const getQuantity = (quantity?: number, min?: number, max?: number) => {
  if (quantity === undefined || min === undefined || max === undefined) return 0
  if (quantity <= min) {
    return min
  }
  if (quantity >= max) {
    return max
  }
  return quantity
}

export interface PeopleQtyProps {
  min?: number,
  max?: number,
  step?: number,
  name?: string,
  value?: number,
  disabled?: boolean,
  incrementDisabled?: boolean,
  decrementDisabled?: boolean,
  onChange?: (value?: number) => void,
  onIncrement?: (value?: number) => void,
  onDecrement?: (value?: number) => void,
}

export const QuantityInput = ({
  min = 0,
  max = 999,
  step = 1,
  name,
  value: valueProp,
  disabled,
  incrementDisabled,
  decrementDisabled,
  onChange,
  onIncrement,
  onDecrement,
}: PeopleQtyProps) => {
  const [quantity, setQuantity] = useState(getQuantity(valueProp, min, max))

  const handleIncrement = () => {
    const value = getQuantity(quantity + step, min, max)
    onIncrement?.(value)
    setQuantity(value)
    onChange?.(value)
  }

  const handleDecrement = () => {
    const value = getQuantity(quantity - step, min, max)
    onDecrement?.(value)
    setQuantity(value)
    onChange?.(value)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = getQuantity(Number(e.target.value), min, max)
    setQuantity(value)
    onChange?.(value)
  }

  const decrementButtonDisabled = quantity === min || disabled || decrementDisabled
  const incrementButtonDisabled = quantity === max || disabled || incrementDisabled

  const buttonStyle = {
    borderRadius: 'unset',
    height: '32px',
    width: '32px',
  }

  return (
    <HStack gap={0.5}>
      <IconButton
        onClick={handleDecrement}
        disabled={decrementButtonDisabled}
        name="decrement"
        sx={{
          ...buttonStyle,
          border: `1px solid ${decrementButtonDisabled ? grey[200] : grey[500]}`,
          '&:disabled': {
            cursor: 'not-allowed',
          },
        }}
      >
        <SubtractIcon />
      </IconButton>
      <TextField
        type="number"
        value={quantity.toString()}
        onChange={handleChange}
        disabled={disabled}
        name={name || 'input quantity'}
        sx={{
          '& .MuiInputBase-root': {
            height: '32px',
            width: 100,
            borderRadius: 'unset',
          },
        }}
      />
      <IconButton
        onClick={handleIncrement}
        disabled={incrementButtonDisabled}
        name="increment"
        sx={{
          ...buttonStyle,
          border: `1px solid ${incrementButtonDisabled ? grey[200] : grey[500]}`,
        }}
      >
        <AddIcon />
      </IconButton>
    </HStack>
  )
}
