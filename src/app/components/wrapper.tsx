import { Footer } from "./footer"
import { Header } from "./header"

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col gap-8 text-default sm:h-fit xl:h-full">
      <Header />
      <div className="pt-20 md:pt-24 pb-10">
        {children}
      </div>
      <Footer />
    </div>
  )
}