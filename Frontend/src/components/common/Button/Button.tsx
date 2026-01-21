import { Button as AntButton } from 'antd'
import type { ButtonProps as AntButtonProps } from 'antd'
import type { ReactNode } from 'react'

export interface ButtonProps extends AntButtonProps {
  children?: ReactNode
}

export function Button({ children, ...props }: ButtonProps) {
  return <AntButton {...props}>{children}</AntButton>
}
