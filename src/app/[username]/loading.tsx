export default function Loading () {
  return (
    <div className='w-full flex flex-col gap-6 animate-pulse'>
      <div className='w-full h-[200px] bg-gray-300 rounded-xl:px-36'></div>
      <div className='flex items-center gap-4'>
        <div className='w-24 h-24 rounded-full bg-gray-300'></div>
        <div className='flex flex-col gap-2'>
          <div className='h-8 w-48 bg-gray-300 rounded'></div>
          <div className='h-4 w-32 bg-gray-300 rounded'></div>
        </div>
      </div>
      <div className='w-full h-32 bg-gray-300 rounded-lg'></div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='h-40 bg-gray-300 rounded-lg'></div>
        <div className='h-40 bg-gray-300 rounded-lg'></div>
      </div>
    </div>
  )
}
