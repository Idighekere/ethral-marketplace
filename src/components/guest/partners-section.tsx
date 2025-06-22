
interface Partner {
  name: string
  logo: string
}

interface Props {
  partners: Partner[]
}
export const PartnersSection = ({ partners }: Props) => {
  return (
    <section className='px-5 sm:px-10 lg:px-16'>
      <div className='md:flex items-center justify-center grid grid-cols-2'>
        {partners.map(partner => {
          return (
            <div
              key={partner.name}
              className='flex items-center justify-center p-4'
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className='/h-10 w-auto'
              />
            </div>
          )
        })}
      </div>

      <div className='flex items-center justify-center  text-sm flex-col  md:flex-row gap-1 md:gap-5 text-white'>
        {['For Web3 Newbies', 'For KOL & Web3 Natives', 'For Web3 Project'].map(
          (text, index) => (
            <p key={index} className='py-1 flex  gap-2'>
              <img src='/security-check.svg' alt='Security Checkmark' /> {text}
            </p>
          )
        )}
      </div>
    </section>
  )
}
