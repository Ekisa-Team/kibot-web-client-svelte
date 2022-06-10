export type ReplyToken<Token> = Token;

export type QuironReplyToken =
  | 'Transaction.Confirmed'
  | 'Transaction.Canceled'
  | 'Transaction.Reassigned'
  | 'Transaction.Unknown'
  | 'Rule.AlreadyConfirmed'
  | 'Rule.AlreadyCanceled'
  | 'Rule.AlreadyReassigned'
  | 'Rule.TimeOverflow'
  | 'Rule.CancelationTimeFrame';
