export interface Order {
  product_id: string
  customer_id: string
  unit: number
  price: number
  discount?: number
}
