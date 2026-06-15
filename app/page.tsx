'use client'

import { BookingForm } from '@/src/components/BookingForm'
import { BookingFormData } from '@/src/types/booking'

export default function Home() {
	const handleSubmit = (data: BookingFormData) => {
		console.log('Форма отправлена:', data)
	}

	return (
		<div className='min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4 sm:p-6 lg:p-8'>
			<div className='w-full max-w-2xl'>
				{status === 'success' ? (
					<></>
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
