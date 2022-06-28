import type { QuironReplyToken } from '$lib/models/reply-token';

export const getReplyTokenSuggestions = (token: QuironReplyToken): string[] => {
  const replyTokens: Record<QuironReplyToken, string[]> = {
    'Transaction.Assigned': ['✅ Su cita ha sido *asignada* correctamente.', '¡Cita asignada exitosamente!'],
    'Transaction.Confirmed': [
      '✅ Su cita ha sido *confirmada* correctamente.',
      '¡Cita confirmada exitosamente!',
      'Su cita ha sido confirmada. ⌛ Recuerde llegar con 15 minutos de anticipación.',
      '✔️ Hemos procesado su respuesta satisfactoriamente. Su cita ha sido *confirmada* 🎉🎉🎉'
    ],
    'Transaction.Canceled': [
      '❌ Su cita ha sido *cancelada* correctamente.',
      '¡Cita cancelada exitosamente!',
      'Su cita ha sido *cancelada* 😿😿😿'
    ],
    'Transaction.Reassigned': [
      '🔁 Nos comunicaremos con usted para reasignar la cita.',
      'Su cita entró en proceso de reasignación.',
      'Su solicitud ingresó en nuestro sistema. Nos pondremos en contacto con usted para continuar con el proceso de reasignación.'
    ],
    'Transaction.Unknown': [
      '⚠️ Respuesta incorrecta. \n\n📌 _Responda solo el número de la opción de su interés (1,2 o 3)_',
      'No pudimos reconocer su respuesta. Por favor ingrese una opción válida.'
    ],
    'Rule.AlreadyConfirmed': [
      'ℹ️ Su cita ya se encuentra confirmada.',
      'ℹ️ No puede confirmar su cita porque ya se encuentra en estado de confirmación.'
    ],
    'Rule.AlreadyCanceled': [
      'ℹ️ Su cita ya se encuentra cancelada.',
      'ℹ️ No puede cancelar su cita porque ya se encuentra en estado de cancelación.'
    ],
    'Rule.AlreadyReassigned': [
      'ℹ️ Su cita ya se encuentra en estado de reasignación',
      'ℹ️ No puede reasignar su cita porque ya se encuentra en estado de reasignación.'
    ],
    'Rule.TimeOverflow': [
      '⛔ Su respuesta no puede ser procesada porque se ha superado la hora de la cita.',
      '❌ Respuesta inválida porque la hora actual es mayor a la hora de la cita.'
    ],
    'Rule.CancelationTimeFrame': [
      '⚠️ No puede cancelar su cita porque ya superó el tiempo límite de cancelación.',
      '⚠️ Su cita no puede ser cancelada porque el umbral de cancelación ha sido superado.'
    ]
  };

  return replyTokens[token];
};
