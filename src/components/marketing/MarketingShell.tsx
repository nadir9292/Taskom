import SiteFooter from '@/src/components/marketing/SiteFooter'

const MarketingShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  )
}

export default MarketingShell
