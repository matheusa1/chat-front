import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

import { FC } from 'react'

const LayoutVariants = cva('size-full p-4 space-y-4 flex flex-col', {
  variants: {
    screen: {
      true: 'max-w-screen h-screen',
      false: '',
    },
  },
  defaultVariants: {
    screen: false,
  },
})

export interface LayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof LayoutVariants> {}

const Layout: FC<LayoutProps> = ({ screen, className, ...props }) => {
  return (
    <div className={cn(LayoutVariants({ screen, className }))}>
      {props.children}
    </div>
  )
}

export default Layout
