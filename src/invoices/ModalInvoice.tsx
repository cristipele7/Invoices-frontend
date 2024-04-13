import { useQuery } from '@tanstack/react-query'
import './Invoices.css'
import type { ErrorModel, InvoiceModel } from '../models'
import Modal from 'react-modal';
import { getInvoice } from '../service';
import moment from 'moment';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '300px',
    height: '400px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function ModalInvoice(props: {invoiceID: number, closeModal: () => void}) {
  const { invoiceID, closeModal } = props

  const invoiceData = useQuery({ queryKey: [`invoice ${invoiceID}`], queryFn: () => getInvoice(invoiceID) })
  const myError = invoiceData.error as any as ErrorModel
  const invoice = invoiceData.data?.data as InvoiceModel

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {invoiceData.error ? 
        <p className='error_message'>{myError.response.data.message}</p>
      :
        <div className='table_container'>
          {invoiceData.isLoading ?
            <p style={{ textAlign: 'center' }}>Loading...</p>
          :
            <div>
              <h2>{invoice.vendor_name}</h2>
              <p>Date: {moment(invoice.created_at).format('MM/DD/YYYY')}</p>
              <p>Description: {invoice.description}</p>
              <p>Due Date: {moment(invoice.due_date).format('MM/DD/YYYY')}</p>
              <p>Amount: {invoice.paid ? '' : invoice.amount}</p>
              <p>Status: {invoice.paid ? 'Paid' : 'Open'}</p>
            </div>
          }
        </div>
      }
    </Modal>
  )
}

export default ModalInvoice
