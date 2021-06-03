export interface IUsernameTransaction {
  id: number;
  senderName: string;
  receiverName: string;
  amount: number;
  description: string;
  type: string;
  status: number;
  date: string;
}
