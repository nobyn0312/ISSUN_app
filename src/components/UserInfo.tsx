import { auth } from '@/firebase'
import Image from 'next/image'
import React from 'react'

const UserInfo = () => {
  return (
    <div>
      <Image src={auth.currentUser?.photoURL} width={100} height={100} alt="ユーザーアイコン"/>
      <p>{auth.currentUser?.displayName}</p>
    </div>
  )
}

export default UserInfo