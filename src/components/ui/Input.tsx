'use client'

import { cn } from '@/src/utils/cn'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	icon?: React.ReactNode
	required?: boolean
}

export const Input: React.FC<InputProps> = ({
	label,
	error,
	icon,
	required,
	className,
	disabled,
	...props
}) => {
	return (
		<div className='w-full'>
			{label && (
				<label className='block text-sm font-medium text-[#1A1A1A] mb-1'>
					{label}
					{required && <span className='text-amber-600 ml-1'>*</span>}
				</label>
			)}
			<div className='relative'>
				{icon && (
					<div className='absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/50'>
						{icon}
					</div>
				)}
				<input
					className={cn(
						'w-full px-3 py-2 border rounded-lg transition-all duration-200',
						'focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent',
						'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
						error
							? 'border-red-500 focus:ring-red-500'
							: 'border-gray-200 hover:border-gray-300',
						icon && 'pl-10',
						className,
					)}
					disabled={disabled}
					{...props}
				/>
			</div>
			{error && (
				<p className='mt-1 text-sm text-red-500 animate-slideDown'>{error}</p>
			)}
		</div>
	)
}
