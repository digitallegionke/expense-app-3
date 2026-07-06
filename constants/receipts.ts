export type MismatchField = {
  label: string;
  receiptValue: string;
  kraValue: string;
  /** "amount" = label + value share a row; "text" = value stacks under its own "as per X" line */
  layout: 'amount' | 'text';
};

export type ReceiptItem = {
  qty: number;
  name: string;
  unitPrice: string;
  total: string;
};

export type Receipt = {
  id: string;
  merchant: string;
  category: string;
  amount: string;
  date: string;
  time: string;
  needsReview: boolean;
  confirmedViaKra: boolean;
  mismatchNote?: string;
  mismatchFields?: MismatchField[];
  kraFields: {
    label: string;
    value: string;
    verified: boolean;
    bold?: boolean;
  }[];

  datePaid: { date: string; time: string };
  dateScanned: { date: string; time: string };
  vatRate: string;
  paymentMethod: string;
  source: string;
  items: ReceiptItem[];
  itemsSubtotal: string;
  savings: string;
  note?: string;
  scannedAt: string;
};

export const receipts: Receipt[] = [
  {
    id: 'astrol-petroleum',
    merchant: 'ASTROL PETROLEUM COMPANY LTD',
    category: 'Fuel',
    amount: 'KES 2,500',
    date: 'Apr.28th',
    time: '2:56pm',
    needsReview: true,
    confirmedViaKra: true,
    mismatchNote: 'The receipt and KRA records disagree. Both are shown as-is - please check.',
    mismatchFields: [
      { label: 'Seller Name', receiptValue: 'LUOMAN PETROLEUM LIMITED', kraValue: 'LUQMAN PETROLEUM LIMITED', layout: 'text' },
      { label: 'Taxable Amount', receiptValue: 'KES 2,000', kraValue: 'KES 1851.85', layout: 'amount' },
      { label: 'VAT Amount', receiptValue: 'KES 0', kraValue: 'KES 148', layout: 'amount' },
    ],
    kraFields: [
      { label: 'Supplier Name', value: 'LUOMAN PETROLEUM LIMITED', verified: true },
      { label: 'Control Unit Invoice No.', value: '0041460490000016880', verified: true },
      { label: 'Trader System Invoice No.', value: '16847', verified: true },
      { label: 'Invoice Date', value: '26 Jun 2026', verified: true },
      { label: 'Total Taxable Amount', value: 'KES 2,000.00', verified: true },
      { label: 'Total Tax Amount', value: 'KES 0.00', verified: true },
      { label: 'Total Invoice Amount', value: 'KES 2,000.00', verified: true, bold: true },
    ],
    datePaid: { date: '26 Jun 2026', time: '12:47' },
    dateScanned: { date: '29 Jun 2026', time: 'at 15:22' },
    vatRate: '16.00%',
    paymentMethod: 'CASH',
    source: 'eTIMS ✓',
    items: [{ qty: 2, name: 'FUEL', unitPrice: 'KES 1,000.00 each', total: 'KES 2,000.00' }],
    itemsSubtotal: 'KES 2,000.00',
    savings: 'KES 0.00',
    scannedAt: 'Scanned 29/06/2026, 15:22:18',
  },
  {
    id: 'luoman-petroleum',
    merchant: 'LUOMAN PETROLEUM LIMITED',
    category: 'Fuel',
    amount: 'KES 2,500',
    date: 'Apr.28th',
    time: '2:56pm',
    needsReview: false,
    confirmedViaKra: true,
    kraFields: [
      { label: 'Supplier Name', value: 'LUOMAN PETROLEUM LIMITED', verified: true },
      { label: 'Control Unit Invoice No.', value: '0041460490000016881', verified: true },
      { label: 'Trader System Invoice No.', value: '16848', verified: true },
      { label: 'Invoice Date', value: '28 Apr 2026', verified: true },
      { label: 'Total Taxable Amount', value: 'KES 2,500.00', verified: true },
      { label: 'Total Tax Amount', value: 'KES 0.00', verified: true },
      { label: 'Total Invoice Amount', value: 'KES 2,500.00', verified: true, bold: true },
    ],
    datePaid: { date: '28 Apr 2026', time: '14:56' },
    dateScanned: { date: '28 Apr 2026', time: 'at 15:10' },
    vatRate: '16.00%',
    paymentMethod: 'CASH',
    source: 'eTIMS ✓',
    items: [{ qty: 1, name: 'FUEL', unitPrice: 'KES 2,500.00 each', total: 'KES 2,500.00' }],
    itemsSubtotal: 'KES 2,500.00',
    savings: 'KES 0.00',
    scannedAt: 'Scanned 28/04/2026, 15:10:04',
  },
];
