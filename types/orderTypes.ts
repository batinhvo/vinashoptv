export interface OrderHistory {
    id: number,
    createdByStaff: string,
    createdByUser: number,
    ip: string,
    createdAt: number,
    orderMethod: string,
    paymentMethod: string,
    payOnSystem: string,
    transactionId: string,
    shipAddress: string,
    shipCountry: 'US',
    shipState: string,
    shipCity: string,
    shipPhone: string,
    shipEmail: string,
    shipFirstName: string,
    shipLastName: string,
    shipZipCode: string,
    billingAddress: string,
    billingCountry: 'US',
    billingState: string,
    billingCity: string,
    billingPhone: string,
    billingEmail: string,
    billingFirstName: string,
    billingLastName: string,
    billingZipCode: string,
    shippingGroupId: number,
    tax: number,
    taxFee: number,
    shippingFee: number,
    subTotal: number,
    grandTotal: number,
    promoCode: string,
    discount: number,
    surcharge: number,
    status: string,
    note: string,
    userNote: string,
    shippingFeeCalculatedBy: string,
}

export interface CartItem {
    skuId: number,
    title: string,
    type?: string,
    price: number,
    quantity: number,
    weight: number,
    tax: number,
    media: string,
    productId: number,
    salePrice: number,
}

export type Weight = {
    id: number,
    name: string,
    zoneFrom: number,
    zoneTo: number,
    fee: number,
}

export type Discount = {
    id: number,
    name: string,
    status: string,
    startAt: Date,
    endAt: Date,
    discountBasedOn: string,
    discountValue: number,
    minSubtotal: number,
}

export type QuantityGift = {
    skuId: number,
    quantity: number,
}

export type Coupon = {
    code: string,
    codeValue: number,
    discountBasedOn: string,
    endAt: Date,
    id: number,
    name: string,
    quantity: number,
    startAt: Date,
    status: string,
    type: string,
}

export interface Gift {
  name: string;
  quantity: number;
  skuId: number;
  weight: number;
}

export interface Promotion {
    id: string,
    name: string,
    skuIdIn: number,
    skuNameIn: string,
    skuIdOut: number,
    skuNameOut: string,
    skuWeightOut: number,
    status: string,
    quantityIn: number,
    quantityOutMax: number,
    startAt: Date,
    endArt: Date,      
}

export interface ProductSubmit {
  gift: Gift[];
  media: string;
  name: string;
  price: number;
  productId: number;
  promotion: Promotion[];
  quantity: number;
  salePrice: number;
  skuId: number;
  tax: number;
  weight: number;
}