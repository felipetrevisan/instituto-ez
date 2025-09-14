'use client'

import { useCompanyService } from '@ez/web/hooks/use-company-service'
import { CompanyServiceCard as Card } from './card'
import { Skeleton } from './skeleton'

export function CompanyService() {
  const { data, isLoading } = useCompanyService()

  return (
    <div className="flex flex-col">
      {isLoading && (
        <>
          <Skeleton className="lg:absolute lg:left-0" />
          <Skeleton className="lg:absolute lg:right-0" />
        </>
      )}
      {data?.map((item, index) => (
        <Card index={index} item={item} key={item.id} />
      ))}
    </div>
  )
}
