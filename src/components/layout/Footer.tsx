import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-[#0d3d2a] py-10">
      <div className="max-w-[1176px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Image
            src="/assets/images/Logo_NORGESTION-blanco_.png"
            alt="NORGESTION"
            width={160}
            height={32}
            className="h-4 w-auto opacity-80"
            unoptimized
          />
          <p className="text-[14px] text-white/70">
            Documento confidencial © 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
