import Image from 'next/image';
import React from 'react'
import { FaUsers } from "react-icons/fa";

export default function PostComponent({
  name,
  title,
  dcription,
  image,
  userImg
}) {
  console.log(image, "hghjgghghj")
  return (
    <div className='w-full shadow-lg bg-white rounded-md  '>
      <div className='flex flex-grow items-center  px-4 py-3'>
        <Image className='w-20 h-20' src={userImg} alt="alternatetext"/>
        <h2 className='text-left px-2 text-black'>{name}</h2>

      </div>
      <Image className={'w-full h-56 object-contain'} src={image} alt="alternatetext"/>
      {/* <Image
      src={image||""}
      width={500}
      height={500}
      alt="Picture of the author"
    /> */}
      <h2 className='text-left text-black px-4 '>{title}</h2>
      <p className='text-left text-black px-4 pb-2'>{dcription}</p>
    </div>
  )
}
