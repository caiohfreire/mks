import { Header } from "@/app/components/header";
import { CartProvider } from "@/app/context/cart-context";
import { fireEvent, render } from "@testing-library/react";

const HeaderComponent = () => {
  return (
    <CartProvider>
      <Header />
    </CartProvider>
  )
};

describe('Header', () => {
  it('should open cart when it hits', async () => {
    const { getByTestId } = render(
      <HeaderComponent />
    );

    const cartButton = getByTestId('cart-button');
    fireEvent.click(cartButton);

    expect(cartButton).toBeInTheDocument();
  });
});