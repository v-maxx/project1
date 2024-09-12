
'use client'

import {useEffect, useState} from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function DateOfBirthInput ({formik}:any){
    const [dob, setDob] = useState('')
    const [error, setError] = useState('')

    const currentYear = new Date().getFullYear()

    const formatDob = (value: string) => {
        // Remove any non-digit characters
        const cleaned = value.replace(/\D/g, '')

        // Ensure it's at most 8 digits long (DDMMYYYY)
        const truncated = cleaned.slice(0, 8)

        // Format the date in the desired format (DD/MM/YYYY)
        let day = truncated.slice(0, 2)
        let month = truncated.slice(2, 4)
        let year = truncated.slice(4, 8)

        let isValid = true

        // Validate day (must be between 1 and 31)
        if (day && (parseInt(day) < 1 || parseInt(day) > 31)) {
            isValid = false
        }

        // Validate month (must be between 1 and 12)
        if (month && (parseInt(month) < 1 || parseInt(month) > 12)) {
            isValid = false
        }

        // Validate year (must not be greater than the current year)
        if (year && (parseInt(year) > currentYear)) {
            isValid = false
        }

        if (!isValid) {
            setError('Enter a valid date')
        } else {
            setError('')
        }

        let formatted = day
        if (month) {
            formatted += `/${month}`
        }
        if (year) {
            formatted += `/${year}`
        }

        return formatted
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setDob(formatDob(value))
        // formik.setFieldValue('dob',formatDob(value))
    }
    useEffect(() => {
        // setDob(formatDob(formik.values.dob))

    }, [formik.values.dob]);

    return (
        <div className="w-full max-w-sm space-y-4">
            <Label htmlFor="dob">Date of Birth</Label>
            <div className="flex">

                <Input
                    type="text"
                    id="dob"
                    name={'dob'}
                    placeholder="DD/MM/YYYY"
                    value={formik.values.dob}
                    onChange={handleChange}
                    className="text-center"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>} {/* Error message */}
        </div>
    )
}
