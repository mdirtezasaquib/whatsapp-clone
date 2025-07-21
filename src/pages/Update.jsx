import React from 'react'
import BottomNavbar from '../components/BottomNavbar'
import { FaPlusCircle, FaExclamationTriangle } from 'react-icons/fa'
import { FiMoreHorizontal } from 'react-icons/fi'

const statuses = [
  {
    id: 1,
    name: 'Amit Sharma',
    time: '10 minutes ago',
    img: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 2,
    name: 'Priya Singh',
    time: 'Today, 9:30 AM',
    img: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 3,
    name: 'Rahul Verma',
    time: 'Yesterday, 8:00 PM',
    img: 'https://i.pravatar.cc/150?img=7',
  },
]

const Update = () => {
  return (
    <>
      <div className="pt-16 pb-24 px-4 min-h-screen bg-gradient-to-br from-green-100 to-teal-50 text-gray-800 mt-2">

    
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=1"
                alt="My Status"
                className="w-16 h-16 rounded-full border-2 border-green-500 shadow-md"
              />
              <FaPlusCircle className="absolute bottom-0 right-0 text-green-600 bg-white rounded-full text-2xl shadow-sm" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">My Status</h2>
              <p className="text-sm text-gray-500">Tap to add status update</p>
            </div>
          </div>
          <FiMoreHorizontal className="text-2xl text-gray-600" />
        </div>

        <hr className="border-t border-gray-300 mb-4" />

        
        <h3 className="text-sm text-gray-600 font-medium mb-3">Recent Updates</h3>
        <div className="space-y-5">
          {statuses.map((status) => (
            <div
              key={status.id}
              className="flex items-center space-x-4 p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition"
            >
              <img
                src={status.img}
                alt={status.name}
                className="w-14 h-14 rounded-full border-2 border-green-400"
              />
              <div>
                <h4 className="text-md font-semibold">{status.name}</h4>
                <p className="text-sm text-gray-500">{status.time}</p>
              </div>
            </div>
          ))}
        </div>

        
        <div className="mt-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-3">
          <FaExclamationTriangle className="text-xl mt-1" />
          <div>
            <p className="font-semibold">Note:</p>
            <p className="text-sm">
              This status section is currently static. Real-time updates and status uploads will be added soon.
            </p>
          </div>
        </div>
      </div>

      <BottomNavbar />
    </>
  )
}

export default Update
