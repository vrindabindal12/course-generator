import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image className="absolute inset-0 h-full w-full object-cover opacity-80" src={'/login.png'} width={500} height={2500} alt="Auth Background" />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Prisma 📖💡💻
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Unlock your potential with our AI-powered course generator. Tailor your
              learning path to your goals and interests.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden mb-8">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Prisma 📖💡💻
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Unlock your potential with our AI-powered course generator. Tailor your
                learning path to your goals and interests.
              </p>
            </div>

            <SignUp />
          </div>
        </main>
      </div>
    </section>
  )
}
