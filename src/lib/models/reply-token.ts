export type ReplyToken<Token> = Token;

export type QuironReplyToken =
  | 'Transaction.Assigned'
  | 'Transaction.Confirmed'
  | 'Transaction.Canceled'
  | 'Transaction.Reassigned'
  | 'Transaction.Unknown'
  | 'Rule.AlreadyConfirmed'
  | 'Rule.AlreadyCanceled'
  | 'Rule.AlreadyReassigned'
  | 'Rule.TimeOverflow'
  | 'Rule.CancelationTimeFrame';
