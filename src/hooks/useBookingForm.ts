'use client'

import { useState } from 'react'
import { BookingFormData, FormErrors } from '../types/booking'
import {
	validateDate,
	validateGuests,
	validateName,
	validatePhone,
	validateTime,
} from '../utils/validation'

interface UseBookingFormProps {
	initialData?: Partial<BookingFormData>
	onSubmit: (data: BookingFormData) => void
	isLoading?: boolean
}

export const useBookingForm = ({
	initialData,
	onSubmit,
	isLoading = false,
}: UseBookingFormProps) => {
	const [formData, setFormData] = useState<BookingFormData>({
		name: '',
		phone: '',
		date: '',
		time: '',
		guests: 1,
		...initialData,
	})

	const [errors, setErrors] = useState<FormErrors>({})

	const [touched, setTouched] = useState<Record<string, boolean>>({})

	const validateSingleField = (fieldName: string, fieldValue: any) => {
		const validators = {
			name: () => validateName(fieldValue),
			phone: () => validatePhone(fieldValue),
			date: () => validateDate(fieldValue),
			time: () => validateTime(fieldValue),
			guests: () => validateGuests(fieldValue),
		}

		const validator = validators[fieldName as keyof typeof validators]
		return validator ? validator() : { isValid: true }
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target

		const newValue = name === 'guests' ? parseInt(value, 10) : value

		setFormData(prev => ({ ...prev, [name]: newValue }))

		if (touched[name]) {
			const validation = validateSingleField(name, newValue)
			setErrors(prev => ({ ...prev, [name]: validation.error }))
		}
	}

	const handleBlur = (
		e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target

		setTouched(prev => ({ ...prev, [name]: true }))

		const newValue = name === 'guests' ? parseInt(value, 10) : value
		const validation = validateSingleField(name, newValue)
		setErrors(prev => ({ ...prev, [name]: validation.error }))
	}

	const validateAllFields = () => {
		const allTouched = {
			name: true,
			phone: true,
			date: true,
			time: true,
			guests: true,
		}
		setTouched(allTouched)

		const newErrors: FormErrors = {}
		let isFormValid = true

		Object.entries(formData).forEach(([fieldName, fieldValue]) => {
			const validation = validateSingleField(fieldName, fieldValue)
			if (!validation.isValid) {
				newErrors[fieldName as keyof FormErrors] = validation.error
				isFormValid = false
			}
		})

		setErrors(newErrors)
		return isFormValid
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const isValid = validateAllFields()
		if (isValid && !isLoading) {
			onSubmit(formData)
		}
	}

	const resetForm = () => {
		setFormData({
			name: '',
			phone: '',
			date: '',
			time: '',
			guests: 1,
		})
		setErrors({})
		setTouched({})
	}

	return {
		formData,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		resetForm,
		validateAllFields,
	}
}
