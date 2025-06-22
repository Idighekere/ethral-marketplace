interface Props {
  pow: string
}
export const POWCard = ({ pow }: Props) => {
  return (
    <div className=''>
      <div className='relative'>
        {/* <iframe src={pow}/> */}
        <img
          src={pow}
          alt='POW Asset'
          className='w-full h-auto rounded-lg shadow-lg'
        />

        <button className='absolute bottom-4 left-4 z-40'>
          <img src='/play.svg' alt='Play Icon' />
        </button>
      </div>
    </div>
  )
}
