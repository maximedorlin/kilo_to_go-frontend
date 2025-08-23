"use client"
import { IMAGES } from '@/constants/images'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Empty = () => {
  const { t } = useTranslation()
  return (
    <div className='flex justify-center items-center flex-col w-full'>
      <Image alt='empty' src={IMAGES.empty} width={400} />
      <p className='font-bold text-2xl'>{t('no_data_to_display')}</p>
    </div>
  )
}

export default Empty