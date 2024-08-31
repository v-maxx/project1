import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {resetPassword} from "@/lib/helpers/functions";
import {toast, ToastContainer} from "react-toastify";

const ResetPassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleResetPassword = async (e:any) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate fields
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.');
            return;
        }

        try {
            const response = await resetPassword({ currentPassword, newPassword });
            if (response.status!==200){
                setError(response.message || 'Error resetting password.');
                setSuccess('')

               return new Error('Error resetting password')
            }
                setSuccess('Password changed successfully.');
            setError('')
                toast.success('Password changed successfully.');
                // Optionally, clear the form fields after a successful response
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');

        } catch (err:any) {
            setError(err.message || 'Error resetting password.');

            console.error(err);
        }
    };

    return (
        <Card>
            <ToastContainer/>
            <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Update your account settings.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4" onSubmit={handleResetPassword}>
                    <div className="grid gap-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                            id="current-password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" onClick={handleResetPassword}>Change Password</Button>
            </CardFooter>
        </Card>
    );
};

export default ResetPassword;
