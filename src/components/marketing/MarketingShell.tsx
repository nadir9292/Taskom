import SiteHeader from '@/src/components/marketing/SiteHeader'
import SiteFooter from '@/src/components/marketing/SiteFooter'

const MarketingShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}

export default MarketingShell
