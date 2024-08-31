export const convertUTCtoIST = (utcDateString:any) => {
    // Parse the UTC date string to a Date object
    const utcDate = new Date(utcDateString);

    // Get the time in milliseconds since the Unix epoch
    const utcTime = utcDate.getTime();

    // IST is 5 hours and 30 minutes ahead of UTC
    const istOffset = 5.5 * 60 * 60 * 1000; // in milliseconds

    // Calculate IST time
    const istTime = new Date(utcTime + istOffset);

    return istTime;
};

export const fetcher = (url:string )=> fetch(url).then(r => r.json())
// export const fetcher = (...args) => fetch(...args).then(res => res.json())

export async function fetchLinks() {
    try {
        const links = await fetch(`/api/links`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!links.ok) {
            throw new Error(`HTTP error! status: ${links.status}`);
        }
        const data = await links.json();


        return data
    } catch (error:any) {
        console.error('Error fetching Links:', error);
        return error
    }
}
export async function fetchProfit(id:string) {
    try {
        const profit = await fetch(`/api/user/profit/${id}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!profit.ok) {
            throw new Error(`HTTP error! status: ${profit.status}`);
        }
        const data = await profit.json();


        return data
    } catch (error:any) {
        console.error('Error fetching Links:', error);
        return error
    }
}
export async function resetPassword(params:any) {
    try {
        const response = await fetch(`/api/user/reset-password/`, {
            method: 'POST',body:JSON.stringify(params),
        headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
          return {message:response.statusText,status:response.status}
            // throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();


        return data
    } catch (error:any) {
        console.error('Error resetting password', error);
        return error
    }
}

export async function withdrawRequest(params: any) {
    try {
        const response = await fetch(`/api/user/withdraw-request`, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Throw an error with the response message and status
            const errorData = await response.json();
            throw new Error(errorData.message || response.statusText);
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error Requesting Withdrawal', error);
        // Re-throw the error to be caught in the calling function
        throw error;
    }
}

export async function getWithdrawRequests() {
    try {
        const response = await fetch(`/api/user/get-requests`, {
            method: 'GET',
        headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
          return {message:response.statusText,status:response.status}
            // throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();


        return data
    } catch (error:any) {
        console.error('Error Requesting Withdrawal', error);
        return error
    }
}

export async function addAccount(accountDetails:any) {
    try {
        const response = await fetch('/api/user/add-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountDetails),
        });

        if (!response.ok) {
            // If response is not OK, throw an error
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add account');
        }

        // If response is OK, parse and return the data
        const data = await response.json();
        return data;
    } catch (error:any) {
        console.error('Error adding account:', error);
        throw error;
    }
}

export async function deleteAccount(accountId: string): Promise<void> {
    try {
        const response = await fetch('/api/user/delete-account', { // Replace '/api/your-endpoint' with your actual endpoint path
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accountId }), // Send the accountId in the request body
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete account');
        }

        const result = await response.json();
    } catch (error:any) {
        console.error('Error:', error.message);
    }
}

export async function fetchUserData(setUser?:any) {
    try {
        const response = await fetch('/api/user/get-user', { // Update this path to your actual API route
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (setUser){
            setUser(data)
        }

        if (data.success) {
            return data.data; // The user data
        } else {
            throw new Error(`Error: ${data.error}`);
        }
    } catch (error:any) {
        console.error('Failed to fetch user data:', error);
        throw error;
    }
}


export async function updateTaskComplete() {
    try {
        const links = await fetch(`/api/links`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!links.ok) {
            throw new Error(`HTTP error! status: ${links.status}`);
        }
        const data = await links.json();


        return data
    } catch (error:any) {
        console.error('Error fetching Links:', error);
        return error
    }
}
