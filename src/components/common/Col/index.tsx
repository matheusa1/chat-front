import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

import { FC } from 'react'

const colVariants = cva('flex flex-col space-y-4', {
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

export interface ColProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof colVariants> {
  ref?: React.Ref<HTMLDivElement>
}

const Col: FC<ColProps> = ({ align, justify, className, ref, ...props }) => {
  return (
    <div
      className={cn(colVariants({ align, justify, className }))}
      ref={ref}
      {...props}
    >
      {props.children}
    </div>
  )
}

export default Col
