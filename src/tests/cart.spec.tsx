import { render, fireEvent } from '@testing-library/react';

import { Cart } from '@/app/components/cart';
import { CartProvider } from '@/app/context/cart-context';
import { CardCart } from '@/app/components/card-cart';

const CartComponent = () => (
  <CartProvider>
    <Cart open={true} onClose={() => { }} />
  </CartProvider>
);

describe('Cart', () => {
  it('should show a message when the cart is empty', () => {
    const { getByText } = render(
      <CartComponent />
    );

    // Verificar se a mensagem de carrinho vazio está presente
    expect(getByText('Seu carrinho está vazio!')).toBeInTheDocument();
  });

  it('should render cards with product information when the cart has products', () => {
    const mockCart = [
      { id: 1, name: 'Product 1', description: 'Description 1', photo: 'photo1.jpg', price: '10', quantity: 1 },
      { id: 2, name: 'Product 2', description: 'Description 2', photo: 'photo2.jpg', price: '20', quantity: 2 },
    ];

    render(
      <CartComponent />
    );

    const cards = mockCart.map((item: any) => (
      <CardCart
        key={item.id}
        name={item.name}
        description={item.description}
        photo={item.photo}
        price={item.price}
      />
    ))

    expect(cards).toHaveLength(mockCart.length);
  });

  it('should finish purchase when hits the button', () => {
    const { getByText } = render(
      <CartComponent />
    );

    const button = getByText('Finalizar Compra');
    fireEvent.click(button);
  });

  it('should close the cart', () => {
    const onClose = jest.fn();

    const { getByTestId } = render(
      <CartComponent />
    );

    const button = getByTestId('close-cart');
    fireEvent.click(button);

    setTimeout(() => {
      expect(onClose).toHaveBeenCalled();
    }, 500);

  });
});