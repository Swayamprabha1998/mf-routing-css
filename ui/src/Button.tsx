import React, { forwardRef, memo } from 'react'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { children, ...rest },
    ref,
  ) {
    return (
      <button ref={ref} {...rest}>
        {children}
      </button>
    )
  }),
)

export default Button
