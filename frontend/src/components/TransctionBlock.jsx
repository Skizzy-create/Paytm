import React from 'react';

export function TransactionBlock({ id, name, status, amount }) {
    const isSuccess = status === 200;
    const color = isSuccess ? 'text-green-500' : 'text-red-500';
    const message = isSuccess ? 'Transaction Successful' : 'Transaction Failed';
    const description = isSuccess 
        ? `You have successfully sent ₹${amount} to ${name}.`
        : `There was an error sending ₹${amount} to ${name}.`;

    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative p-4 bg-gray-100">
                <div className="absolute top-0 left-0 mt-2 ml-2">
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
                        <span className="text-white text-lg">{isSuccess ? '✓' : '✕'}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center ml-12">
                    <span className={`text-2xl font-bold ${color}`}>{message}</span>
                    <span className="text-gray-500">ID: {id}</span>
                </div>
                <div className="mt-2 ml-12">
                    <p className="text-lg text-gray-700">{description}</p>
                </div>
            </div>
        </div>
    );
}
