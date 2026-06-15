export interface ValidationResult {
	isValid: boolean
	error?: string
}

export function validateName(value: string): ValidationResult {
	if (!value.trim()) {
		return { isValid: false, error: 'Имя обязательно' }
	}
	if (value.trim().length < 2) {
		return { isValid: false, error: 'Минимум 2 символа' }
	}
	const nameRegex = /^[А-Яа-яA-Za-z\s\-]+$/
	if (!nameRegex.test(value.trim())) {
		return { isValid: false, error: 'Только буквы, пробелы и дефис' }
	}
	return { isValid: true }
}

export function validatePhone(value: string): ValidationResult {
	if (!value.trim()) {
		return { isValid: false, error: 'Телефон обязателен' }
	}

	const digits = value.replace(/\D/g, '')
	if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
		return { isValid: true }
	}
	return {
		isValid: false,
		error: 'Введите корректный номер: +7 или 8, 10 цифр',
	}
}

export function normalizePhone(value: string): string {
	const digits = value.replace(/\D/g, '')
	if (digits.length === 11 && digits[0] === '8') {
		return '+7' + digits.slice(1)
	}
	if (digits.length === 11 && digits[0] === '7') {
		return '+' + digits
	}
	return value
}

export function validateDate(value: string): ValidationResult {
	if (!value) {
		return { isValid: false, error: 'Дата обязательна' }
	}

	const selectedDate = new Date(value)
	const today = new Date()
	today.setHours(0, 0, 0, 0)

	const maxDate = new Date()
	maxDate.setDate(today.getDate() + 90)

	if (selectedDate < today) {
		return { isValid: false, error: 'Дата не может быть раньше сегодня' }
	}
	if (selectedDate > maxDate) {
		return { isValid: false, error: 'Дата не позднее +90 дней' }
	}
	return { isValid: true }
}

export function validateTime(value: string): ValidationResult {
	if (!value) {
		return { isValid: false, error: 'Время обязательно' }
	}
	return { isValid: true }
}

export function validateGuests(value: number): ValidationResult {
	if (!value) {
		return { isValid: false, error: 'Количество гостей обязательно' }
	}
	if (value < 1 || value > 12) {
		return { isValid: false, error: 'От 1 до 12 гостей' }
	}
	return { isValid: true }
}

export function validateForm(data: {
	name: string
	phone: string
	date: string
	time: string
	guests: number
}) {
	return {
		name: validateName(data.name),
		phone: validatePhone(data.phone),
		date: validateDate(data.date),
		time: validateTime(data.time),
		guests: validateGuests(data.guests),
	}
}
