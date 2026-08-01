export interface ProductCardProps {
  image: string;
  id: number;
  title: string;
  desc: string;
  price: number;
  param: string;
  needStock: boolean;
  stock: number;
  category: string;
  store: string;
  keys: string[];
  onClick?: () => void;
}

export interface CartItem extends Omit<ProductCardProps, 'onClick'> {
  quantity: number;
}
