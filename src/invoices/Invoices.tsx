import './Invoices.css'
import { useAppSelector } from '../app/hooks'
import { selectUser } from '../app/slices/userSlice'
import { Navigate } from 'react-router-dom'
import Header from '../header/Header'
import TableInvoices from './TableInvoices'
import { useQuery } from '@tanstack/react-query'
import { invoices } from '../service'

function Invoices() {
  const user = useAppSelector(selectUser)

  const invoicesData = useQuery({ queryKey: ['invoices'], queryFn: invoices })

  if (!user) {
    return <Navigate to={'/'} />
  }

  return (
    <div className='invoices_container'>
      <Header />

      {invoicesData.error ? 
        <p className='error_message'>{invoicesData.error.message}</p>
      :
        <div className='table_container'>
          {invoicesData.isLoading ?
            <p>Loading...</p>
          :
            <TableInvoices invoices={invoicesData?.data?.data} />
          }
        </div>
      }
    </div>
  )
}

export default Invoices
