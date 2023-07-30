import { render, fireEvent, screen } from "@testing-library/react";

import { DownloadControl } from "..";
import "jest"

// it("should download the file", async () => {
//   // renderizar o componente
//   render(<DownloadControl src="https://example.com/file.pdf" />);

//   // obter o elemento do link
//   const link = screen.getByRole('link');

//   // simular um clique no link
//   fireEvent.click(link);

//   // verificar se o atributo href do link é igual ao src esperado
//   expect(link).toHaveAttribute('href', 'https://example.com/file.pdf');

//   // mockar o window.location.assign
//   window.location.assign = jest.fn();

//   // simular outro clique no link
//   fireEvent.click(link);

//   // verificar se o window.location.assign foi chamado com o src correto
//   expect(window.location.assign).toHaveBeenCalledWith('https://example.com/file.pdf');
// });