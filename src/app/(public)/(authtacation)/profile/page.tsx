import { useGetMe } from '@/hooks/auth/auth.hooks';
import { getMe } from '@/service/getme'
import React from 'react'
import MainProfile from './Component/MainProfile';

const page = async() => {

  

    // console.log(user)

  return (
    <div>
      <MainProfile ></MainProfile>
    </div>
  )
}

export default page
