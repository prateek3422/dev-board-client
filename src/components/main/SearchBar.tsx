"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { FaSearch } from 'react-icons/fa'

export const SearchBar = () => {
  const [Search, setSearch] = useState('')

  return (
   
    <form className="form relative">
      
    <input
      className="input rounded-full px-8 py-3 border-2 w-[40vw] border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 bg-[#4e4e4f] shadow-md"
      placeholder="Search..."
      required={false}
      type="text"
    />
        <Button className="absolute right-3 -translate-y-1/2 top-1/2 p-1 w-[40px] rounded-full bg-blue-600 hover:bg-blue-700 text-white">
        <FaSearch />
    </Button>


  </form>
  )
}
