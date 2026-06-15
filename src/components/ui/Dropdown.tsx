'use client'

import { cn } from '@/src/utils/cn'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import arrow from '../../assets/arrow.svg'

interface DropdownProps {
	label?: string
	error?: string
	options: Array<{ value: string; label: string }>
	required?: boolean
	value?: string
	onChange?: (value: string) => void
	onBlur?: () => void
	name?: string
	disabled?: boolean
	placeholder?: string
	className?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
	label,
	error,
	options,
	required,
	value,
	onChange,
	onBlur,
	name,
	disabled,
	placeholder = 'Выберите вариант',
	className,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const selectedOption = options.find(opt => opt.value === value)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
				onBlur?.()
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [onBlur])

	const handleSelect = (optionValue: string) => {
		onChange?.(optionValue)
		setIsOpen(false)
		onBlur?.()
	}

	return (
		<div className='w-full' ref={dropdownRef}>
			{label && (
				<label className='block text-sm font-medium text-[#1A1A1A] mb-1'>
					{label}
					{required && <span className='text-amber-600 ml-1'>*</span>}
				</label>
			)}

			<div className='relative'>
				<button
					type='button'
					onClick={() => !disabled && setIsOpen(!isOpen)}
					disabled={disabled}
					className={cn(
						'w-full px-3 py-2 text-left border rounded-lg transition-all duration-200',
						'focus:outline-none focus:ring-2 focus:ring-amber-500',
						'disabled:bg-gray-50 disabled:cursor-not-allowed',
						'bg-white flex items-center justify-between',
						error ? 'border-red-500' : 'border-gray-200 hover:border-gray-300',
						isOpen && 'ring-2 ring-amber-500 border-transparent',
						className,
					)}
				>
					<span className={cn(!selectedOption && 'text-gray-400')}>
						{selectedOption?.label || placeholder}
					</span>
					<Image
						src={arrow}
						width={20}
						height={20}
						alt='arrow'
						className={cn(
							'w-5 h-5 transition-transform duration-200',
							isOpen && 'rotate-180',
						)}
					/>
				</button>

				<div
					className={cn(
						'absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-200',
						'origin-top',
						isOpen
							? 'opacity-100 scale-y-100 visible'
							: 'opacity-0 scale-y-0 invisible',
					)}
				>
					<div className='max-h-60 overflow-y-auto'>
						{options.map(option => (
							<button
								key={option.value}
								type='button'
								onClick={() => handleSelect(option.value)}
								className={cn(
									'w-full px-3 py-2 text-left transition-colors duration-150',
									'hover:bg-amber-50',
									value === option.value &&
										'bg-amber-50 text-amber-700 font-medium',
								)}
							>
								{option.label}
							</button>
						))}
					</div>
				</div>

				<select
					name={name}
					value={value}
					onChange={() => {}}
					className='hidden'
					disabled={disabled}
				>
					{options.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>

			{error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
		</div>
	)
}
