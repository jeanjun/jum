'use client'

import dynamic from 'next/dynamic'

export const Jum = dynamic(() =>
  import('jum-react').then((res) => res.Jum)
)