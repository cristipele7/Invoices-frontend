import type { InvoiceModel } from '../models';
import './Invoices.css'
import { DataGrid } from '@mui/x-data-grid';

function TableInvoices(props: {invoices: InvoiceModel[]}) {
  const { invoices } = props
  const columns = [
    { field: 'created_at', headerName: 'Date', width: 70 },
    { field: 'vendor_name', headerName: 'Payee', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'due_date', headerName: 'Due Date', width: 70 },
    { field: 'amount', headerName: 'Amount', width: 100 },
    { field: 'paid', headerName: 'Status', width: 70 },
  ];

  return (
    <DataGrid
      rows={invoices}
      columns={columns}
      style={{ width: '100%' }}
      disableRowSelectionOnClick
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
  )
}

export default TableInvoices
