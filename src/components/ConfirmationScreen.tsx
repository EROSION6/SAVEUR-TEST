'use client'

import Image from 'next/image'
import React from 'react'
import check from '../assets/check.svg'
import { BookingFormData } from '../types/booking'
import { Button } from './ui/Button'

interface ConfirmationScreenProps {
	bookingData: BookingFormData
	onReset: () => void
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
	bookingData,
	onReset,
}) => {
	const formattedDate = React.useMemo(
		() => new Date(bookingData.date).toLocaleDateString('ru-RU'),
		[bookingData.date],
	)

	const details = [
		{ label: 'Гость', value: bookingData.name },
		{ label: 'Телефон', value: bookingData.phone },
		{ label: 'Дата', value: formattedDate },
		{ label: 'Время', value: bookingData.time },
		{ label: 'Гостей', value: bookingData.guests },
	]

	return (
		<div className='bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-lg mx-auto text-center animate-fadeIn'>
			<div className='mx-auto w-20 h-20 bg-[#FAFAF8] rounded-full flex items-center justify-center mb-6 animate-scaleIn'>
				<Image src={check} alt='' width={100} height={100} />
			</div>

			<h1 className='text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2'>
				Бронь подтверждена!
			</h1>
			<p className='text-[#1A1A1A]/50 mb-6'>
				Спасибо за бронирование. Ждём вас!
			</p>

			<div className='bg-[#FAFAF8] rounded-xl p-4 sm:p-6 mb-6 text-left'>
				<div className='space-y-3'>
					{details.map((detail, index) => (
						<div
							key={index}
							className='flex justify-between py-2 border-b border-gray-200 last:border-b-0'
						>
							<span className='font-medium text-gray-700'>{detail.label}:</span>
							<span className='text-[#1A1A1A]'>{detail.value}</span>
						</div>
					))}
				</div>
			</div>

			<Button onClick={onReset} variant='primary' className='px-6'>
				Забронировать ещё
			</Button>
		</div>
	)
}
