import { useNavigate, useSearchParams } from "react-router-dom";
import { TransactionBlock } from "../components/TransactionBlock";
import { Button } from "../components/Button";

export const Transaction = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const status = parseInt(searchParams.get('status'), 10);
    const amount = parseInt(searchParams.get('amount'), 10);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <TransactionBlock 
                id={id}
                name={name}
                status={status}
                amount={amount}
            />
            <div className="mt-4">
                <Button 
                    label="DASHBOARD" 
                    onClick={() => navigate('/dashboard')}
                />
            </div>
        </div>
    );
};
