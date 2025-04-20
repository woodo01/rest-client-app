import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import EmptyResponseField from './EmptyResponseField';

jest.mock('next/image', () => {
  function MockedImage({
    src,
    alt,
    width,
    height,
  }: {
    alt: string;
    height: string;
    src: string;
    width: string;
  }): JSX.Element {
    return (
      <div
        data-testid="mock-image"
        data-src={src}
        data-alt={alt}
        data-width={width}
        data-height={height}
        style={{
          width: typeof width === 'string' ? width : `${width}px`,
          height: typeof height === 'string' ? height : `${height}px`,
        }}
      >
        {alt}
      </div>
    );
  }
  MockedImage.displayName = 'Image';

  return MockedImage;
});

jest.mock('next-intl', () => ({
  useTranslations:
    () =>
    (key: string): string => {
      const translations: { [key: string]: string } = {
        'empty-placeholder': 'Enter the URL and click Send to get a response',
      };

      return translations[key];
    },
}));

describe('EmptyResponseField component', () => {
  it('renders the image with correct src, alt, width, and height', () => {
    render(<EmptyResponseField />);

    const image = screen.getByTestId('mock-image');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('data-src', '/rest-img.png');
    expect(image).toHaveAttribute('data-alt', 'Empty URL field');
    expect(image).toHaveAttribute('data-width', '100');
    expect(image).toHaveAttribute('data-height', '100');
  });

  it('renders the text message correctly', () => {
    render(<EmptyResponseField />);

    const textElement = screen.getByText(
      'Enter the URL and click Send to get a response'
    );

    expect(textElement).toBeInTheDocument();
  });
});
