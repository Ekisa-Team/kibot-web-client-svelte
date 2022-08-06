type MaskOptions = {
  mask: string;
};

type Mask = Record<'phone', MaskOptions>;

export const masks: Mask = {
  phone: {
    mask: '+{57} (000) 000-0000'
  }
};
