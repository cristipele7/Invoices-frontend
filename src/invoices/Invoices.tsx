import './Invoices.css'
import { useAppSelector } from '../app/hooks'
import { selectUser } from '../app/slices/userSlice'
import { Navigate } from 'react-router-dom'
import Header from '../header/Header'
import TableInvoices from './TableInvoices'
import { useQuery } from '@tanstack/react-query'
import type { ErrorModel } from '../models'
import { getInvoices, totalAmount } from '../service'

function Invoices() {
  const user = useAppSelector(selectUser)

  const invoicesData = useQuery({ queryKey: ['invoices'], queryFn: getInvoices })
  const myError = invoicesData.error as any as ErrorModel
  
  const totalAmountData = useQuery({ queryKey: ['total amount'], queryFn: totalAmount })

  if (!user) {
    return <Navigate to={'/'} />
  }

  return (
    <div className='invoices_container'>
      <Header />

      {invoicesData.error ? 
        <p className='error_message'>{myError.response.data.message}</p>
      :
        <>
          <div className='table_container'>
            {invoicesData.isLoading ?
              <p>Loading...</p>
            :
              <TableInvoices invoices={invoicesData?.data?.data} />
            }
          </div>
          <p>Total amount: {totalAmountData.data?.data?.total ?? 0}</p>
        </>
      }
    </div>
  )
}

export default Invoices
