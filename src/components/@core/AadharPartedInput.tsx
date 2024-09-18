import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

interface OtpBoxesProps {
    value: string;
    name: string;
    setFieldValue: (field: string, value: string) => void;
    onBlur: () => void;
    formik: any;
}

const AadharInput: React.FC<OtpBoxesProps> = ({
                                                  value,
                                                  name,
                                                  setFieldValue,
                                                  onBlur,
                                                  formik,
                                              }) => {
    const [otpValues, setOtpValues] = useState<string[]>(["", "", ""]);
    const inputRefs = useRef<HTMLInputElement[]>([]); // Use ref to store input boxes

    useEffect(() => {
        // This effect will focus on the next box when the current one has 4 digits
        otpValues.forEach((otp, index) => {
            if (otp.length === 4 && index < 2) {
                inputRefs.current[index + 1]?.focus();
            }
        });
    }, [otpValues]);

    const handleInputChange =
        (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value.replace(/\D/g, ""); // Only allow numbers

            // Only update the current input if it's not more than 4 digits
            if (input.length <= 4) {
                const newOtpValues = [...otpValues];
                newOtpValues[index] = input;

                // Update state with new values
                setOtpValues(newOtpValues);

                // Update Formik's value
                setFieldValue(name, newOtpValues.join(""));
            }
        };

    const handleKeyDown =
        (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Backspace" && otpValues[index] === "" && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        };

    return (
        <div className="flex space-x-4">
            {otpValues.map((otp, index) => (
                <Input
                    ref={(el:any) => (inputRefs.current[index] = el)} // Store each input ref
                    name={name}
                    key={index}
                    id={`otp-box-${index}`}
                    type="text"
                    maxLength={4}
                    value={otp}
                    onChange={handleInputChange(index)}
                    onKeyDown={handleKeyDown(index)}
                    className="border border-black p-2 w-16 text-center text-lg"
                    inputMode="numeric"
                    onBlur={onBlur}
                    disabled={index > 0 && otpValues[index - 1].length < 4} // Disable if the previous box is not filled
                />
            ))}
        </div>
    );
};

export default AadharInput;
