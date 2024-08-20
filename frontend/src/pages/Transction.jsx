import { useSearchParams } from "react-router-dom";
import { TransactionBlock } from "../components/TransctionBlock";

export const Transaction = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const status = parseInt(searchParams.get('status'), 10);
    const amount = parseInt(searchParams.get('amount'), 10);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <TransactionBlock 
                id={id}
                name={name}
                status={status}
                amount={amount}
            />
        </div>
    );
};
