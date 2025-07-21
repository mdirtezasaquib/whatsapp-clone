import React from 'react'
import BottomNavbar from '../components/BottomNavbar'
import { FiSearch } from 'react-icons/fi'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'

const communities = [
  {
    id: 1,
    name: "Tech Enthusiasts",
    members: "256 Members",
    logo: "https://cdn-icons-png.flaticon.com/512/733/733553.png",
  },
  {
    id: 2,
    name: "Fitness & Health",
    members: "187 Members",
    logo: "https://cdn-icons-png.flaticon.com/512/1161/1161676.png",
  },
  {
    id: 3,
    name: "Photography Lovers",
    members: "98 Members",
    logo: "https://cdn-icons-png.flaticon.com/512/2920/2920261.png",
  },
  {
    id: 4,
    name: "Movie Buffs",
    members: "312 Members",
    logo: "https://cdn-icons-png.flaticon.com/512/2099/2099070.png",
  },
]

const Community = () => {
  return (
    <>
      <div className="pt-16 pb-24 px-4 bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen text-gray-800 mt-2">

      
        <h1 className="text-2xl font-bold mb-4">Communities</h1>

        
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search Communities"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-500 text-lg" />
        </div>

      
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-start gap-2 mb-6 shadow-sm">
          <HiOutlineExclamationTriangle className="text-xl mt-1 text-red-600" />
          <div>
            <p className="text-sm font-semibold">Notice:</p>
            <p className="text-sm">Currently this community section is static. Dynamic features will be updated soon.</p>
          </div>
        </div>

    
        <div className="space-y-4">
          {communities.map((community) => (
            <div
              key={community.id}
              className="flex items-center p-3 bg-white rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <img
                src={community.logo}
                alt={community.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{community.name}</h3>
                <p className="text-sm text-gray-500">{community.members}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavbar />
    </>
  )
}

export default Community
