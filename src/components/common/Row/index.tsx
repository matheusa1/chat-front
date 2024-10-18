import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

import { FC } from 'react'

const rowVariants = cva('flex space-x-4', {
  variants: {
    justify: {
      center: 'justify-center',
      start: 'justify-start',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    align: {
      center: 'items-center',
      start: 'items-start',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
  },
  defaultVariants: {
    justify: 'start',
    align: 'center',
  },
})

export interface RowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rowVariants> {}

const Row: FC<RowProps> = ({ align, justify, className, ...props }) => {
  return (
    <div className={cn(rowVariants({ align, justify, className }))}>
      {props.children}
    </div>
  )
}

export default Row
