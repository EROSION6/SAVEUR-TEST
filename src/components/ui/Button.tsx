'use client'

import { cn } from '@/src/utils/cn'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary'
	isLoading?: boolean
	loadingText?: string
	fullWidth?: boolean
}

export const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	isLoading = false,
	loadingText,
	fullWidth = false,
	className,
	disabled,
	...props
}) => {
	const variants = {
		primary: 'bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500',
	}

	return (
		<button
			className={cn(
				'font-medium rounded-lg transition-all duration-200',
				'focus:outline-none focus:ring-2 focus:ring-offset-2',
				'disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer outline-none',
				'transform active:scale-95',
				'px-4 py-2 text-base',
				variants[variant],
				fullWidth && 'w-full',
				className,
			)}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<div className='flex items-center justify-center gap-2'>
					<div className='w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin' />
					<span>{loadingText || children}</span>
				</div>
			) : (
				children
			)}
		</button>
	)
}
