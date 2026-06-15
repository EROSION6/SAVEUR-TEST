'use client'

import { BookingForm } from '@/src/components/BookingForm'
import { ConfirmationScreen } from '@/src/components/ConfirmationScreen'
import { useState } from 'react'
import { BookingFormData, BookingStatus } from '../src/types/booking'
import { normalizePhone } from '../src/utils/validation'

export default function Home() {
	const [status, setStatus] = useState<BookingStatus>('idle')
	const [bookingData, setBookingData] = useState<BookingFormData | null>(null)

	const handleSubmit = async (data: BookingFormData) => {
		setStatus('loading')

		const normalizedData = {
			...data,
			phone: normalizePhone(data.phone),
		}

		await new Promise(resolve => setTimeout(resolve, 1500))

		setBookingData(normalizedData)
		setStatus('success')
	}

	const handleReset = () => {
		setStatus('idle')
		setBookingData(null)
	}

	return (
		<div className='min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4 sm:p-6 lg:p-8'>
			<div className='w-full max-w-2xl'>
				{status === 'success' && bookingData ? (
					<ConfirmationScreen bookingData={bookingData} onReset={handleReset} />
				) : (
					<BookingForm
						onSubmit={handleSubmit}
						isLoading={status === 'loading'}
					/>
				)}
			</div>
		</div>
	)
}
