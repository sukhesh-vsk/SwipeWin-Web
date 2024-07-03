'use client'
 
export function Navbar() {
  const data = {
    walletBal: 20
  }

  return (
    <header className="px-8 py-6 flex items-center justify-between">
      <div className="text-xl font-semibold text-text tracking-wide text-base">Swipe Win</div>
      
      <button className='flex bg-text px-2 py-1 tracking-wide rounded-full text-sm font-noto font-semibold'>
        <div className='text-gradient'>
          My Wallet : 
        </div>
        <span className='ms-1 text-gradient font-semibold'>{data.walletBal}</span>
      </button>
    </header>
  )
}