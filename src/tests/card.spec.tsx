import { Card, CardProps } from "@/app/components/card"
import { CartProvider } from "@/app/context/cart-context"
import { render, fireEvent } from "@testing-library/react"

const CardComponent = ({ id, name, description, price, photo, handleBuy }: CardProps) => (
  <CartProvider>
    <Card
      id={id}
      name={name}
      description={description}
      price={price}
      photo={photo}
      handleBuy={handleBuy}
    />
  </CartProvider>
)

describe('Card', () => {
  const mockProduct = {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: '10',
    photo: 'https://mks-sistemas.nyc3.digitaloceanspaces.com/products/macbookair.webp',
    handleBuy: jest.fn(),
  };

  it('should render card with correct information', () => {
    const { getByText } = render(
      <CardComponent
        name={mockProduct.name}
        description={mockProduct.description}
        price={mockProduct.price}
        photo={mockProduct.photo}
        handleBuy={mockProduct.handleBuy}
      />
    );

    expect(getByText(mockProduct.name)).toBeInTheDocument();
    expect(getByText(`R$ ${mockProduct.price}`)).toBeInTheDocument();
    expect(getByText(mockProduct.description)).toBeInTheDocument();
  });

  it('should add product to cart when clicking the buy button', () => {
    const { getByText } = render(
      <CardComponent
        id={mockProduct.id}
        name={mockProduct.name}
        description={mockProduct.description}
        price={mockProduct.price}
        photo={mockProduct.photo}
        handleBuy={mockProduct.handleBuy}
      />
    );

    const buyButton = getByText('Comprar');
    fireEvent.click(buyButton);

    expect(mockProduct.handleBuy).toHaveBeenCalledWith(mockProduct);
  });
})