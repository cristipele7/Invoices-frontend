import { useState } from 'react';
import type { InvoiceModel } from '../models';
import './Invoices.css'
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import ModalInvoice from './ModalInvoice';

function TableInvoices(props: {invoices: InvoiceModel[]}) {
  const { invoices } = props

  const [selectedInvoiceID, setSelectedInvoiceID] = useState<number | null>(null)

  const columns = [
    { field: 'created_at', headerName: 'Date', width: 200 },
    { field: 'vendor_name', headerName: 'Payee', width: 300 },
    { field: 'description', headerName: 'Description', flex: 1, minWidth: 300 },
    { field: 'due_date', headerName: 'Due Date', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'paid', headerName: 'Status', width: 150 },
  ];

  return (
    <>
      <DataGrid
        rows={invoices.map(invoice => { 
          return {
            ...invoice,
            created_at: moment(invoice.created_at).format('MM/DD/YYYY'),
            due_date: moment(invoice.due_date).format('MM/DD/YYYY'),
            amount: invoice.paid ? '' : invoice.amount,
            paid: invoice.paid ? 'Paid' : 'Open',
          }
        })}
        columns={columns}
        style={{ width: '100%' }}
        disableRowSelectionOnClick
        onRowClick={(params) => setSelectedInvoiceID(params.row.id)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      {!!selectedInvoiceID && <ModalInvoice invoiceID={selectedInvoiceID} closeModal={() => setSelectedInvoiceID(null)} />}
    </>
  )
}

export default TableInvoices
