export interface AuthModel {
  email: string;
  password: string;
}

export interface UserModel {
  id: string,
  name: string;
  email: string;
  accessToken: string;
}

export interface ErrorModel {
  response: {
    data: {
      message: string;
    }
  }
}

export interface InvoiceModel {
  id: number;
  created_at: Date;
  vendor_name: string;
  amount: number;
  due_date: Date;
  description: string;
  paid: boolean;
  user_id: number;
}
