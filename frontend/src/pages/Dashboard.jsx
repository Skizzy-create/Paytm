import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useEffect, useState } from "react";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);

    const fetchBalance = async () => {
        try {
            const response = await axios.get('https://your-api-endpoint.com/api/v1/user/balance', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance.toLocaleString()} />
                <button
                    onClick={fetchBalance}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Refresh Balance
                </button>
                <Users />
            </div>
        </div>
    );
};
