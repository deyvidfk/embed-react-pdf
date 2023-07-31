import { render, fireEvent, screen } from '@testing-library/react';
import { DownloadControl } from '..';

it('should download the file', async () => {
  const src = 'https://example.com/file.pdf';
  // renderizar o componente
  render(<DownloadControl src={src}>Download</DownloadControl>);

  // obter o elemento do link
  const link = screen.getByText('Download');

  // simular um clique no link
  expect(fireEvent.click(link)).toBeTruthy();
  // verificar se o atributo href do link é igual ao src esperado
  expect(link).toHaveAttribute('href', src);
  expect(link).toHaveAttribute('download', '');
});
