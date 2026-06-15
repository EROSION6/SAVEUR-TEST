'use client'

import Image from 'next/image'
import React from 'react'
import phone from '../assets/phone.svg'
import user from '../assets/user.svg'
import users from '../assets/users.svg'
import { useBookingForm } from '../hooks/useBookingForm'
import { BookingFormData } from '../types/booking'
import { Button } from './ui/Button'
import { Dropdown } from './ui/Dropdown'
import { Input } from './ui/Input'

interface BookingFormProps {
	onSubmit: (data: BookingFormData) => void
	isLoading?: boolean
}

const TIME_SLOTS = Array.from({ length: 11 }, (_, i) => {
	const hour = 12 + i
	return `${hour.toString().padStart(2, '0')}:00`
})

export const BookingForm: React.FC<BookingFormProps> = ({
	onSubmit,
	isLoading = false,
}) => {
	const { formData, errors, touched, handleChange, handleBlur, handleSubmit } =
		useBookingForm({ onSubmit, isLoading })

	const handleTimeChange = (value: string) => {
		const fakeEvent = {
			target: { name: 'time', value },
		} as React.ChangeEvent<HTMLSelectElement>
		handleChange(fakeEvent)
	}

	const handleTimeBlur = () => {
		const fakeEvent = {
			target: { name: 'time', value: formData.time },
		} as React.FocusEvent<HTMLSelectElement>
		handleBlur(fakeEvent)
	}

	return (
		<div className='bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-lg mx-auto'>
			<div className='text-center mb-4 sm:mb-6'>
				<h2 className='text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-2 sm:mb-4'>
					Бронирование столика
				</h2>
				<p className='text-[#1A1A1A]/80 text-sm'>
					Забронируйте столик в нашем ресторане заранее
				</p>
			</div>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<Input
					label='Имя гостя'
					name='name'
					value={formData.name}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.name ? errors.name : undefined}
					placeholder='Иван Иванов'
					required
					disabled={isLoading}
					icon={
						<Image
							src={user}
							alt='user'
							width={20}
							height={20}
							className='w-5 h-5'
						/>
					}
				/>
				<Input
					label='Телефон'
					name='phone'
					type='tel'
					value={formData.phone}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.phone ? errors.phone : undefined}
					placeholder='+7 999 999-99-99'
					required
					disabled={isLoading}
					icon={
						<Image
							src={phone}
							alt='phone'
							width={20}
							height={20}
							className='w-5 h-5'
						/>
					}
				/>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<Input
						label='Дата'
						name='date'
						type='date'
						value={formData.date}
						onChange={handleChange}
						onBlur={handleBlur}
						error={touched.date ? errors.date : undefined}
						min={new Date().toISOString().split('T')[0]}
						required
						disabled={isLoading}
					/>

					<Dropdown
						label='Время'
						name='time'
						value={formData.time}
						onChange={handleTimeChange}
						onBlur={handleTimeBlur}
						error={touched.time ? errors.time : undefined}
						options={[
							{ value: '', label: 'Выберите время' },
							...TIME_SLOTS.map(time => ({ value: time, label: time })),
						]}
						required
						disabled={isLoading}
						placeholder='Выберите время'
					/>
				</div>

				<Input
					label='Количество гостей'
					name='guests'
					type='number'
					value={String(formData.guests)}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.guests ? errors.guests : undefined}
					min='1'
					max='12'
					required
					disabled={isLoading}
					icon={
						<Image
							src={users}
							alt='guests'
							width={20}
							height={20}
							className='w-5 h-5'
						/>
					}
				/>

				<Button
					type='submit'
					isLoading={isLoading}
					loadingText='Бронирую...'
					fullWidth
					className='mt-6'
				>
					Забронировать
				</Button>
			</form>
		</div>
	)
}
