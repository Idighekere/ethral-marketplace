import Image from "next/image"
import { Play } from "../icons"

interface Props {
  pow: string
}
export const POWCard = ({ pow }: Props) => {
  return (
    <div className=''>
      <div className='relative aspect-9/16  rounded-lg '>
        {/* <iframe src={pow}/> */}
        <Image
          src={pow}
          alt='POW Asset'
          fill
          className='
          rounded-lg shadow-lg object-cover'
        />

        <button className='absolute bottom-4 left-4 z-40'>
          <Play />
        </button>
      </div>
    </div>
  )
}
