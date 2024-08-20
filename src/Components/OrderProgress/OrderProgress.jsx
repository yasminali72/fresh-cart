import React from 'react'

export default function OrderProgress({order}) {
    const progress = (order.isDelivered ? 50 : 0) + (order.isPaid ? 50 : 0);

  return (
   <>
   
   <div className="flex flex-col space-y-4">
      <p className="font-bold">
        Delivered: {order.isDelivered ? 'Yes' : 'No'}
      </p>
      <p className="font-bold">
        Paid: {order.isPaid ? 'Yes' : 'No'}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="h-4 bg-green-500 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="font-bold text-right">{progress}% Complete</p>
    </div>
   </>
  )
}
