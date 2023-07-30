import { pdfjs } from 'react-pdf';
import './App.css';
import { FC } from 'react';
import { EmbedPdf } from './lib';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function Loading() {
  return <div className="box">Carregando ...</div>;
}

function MeuBotao({ children, ...rest }: any) {
  return (
    <button className="box" {...rest}>
      {children}
    </button>
  );
}

export default function App() {
  const onHandle = ({ name, meta }: any) => {
    console.log(name, meta);
  };

  const handleOnPageChange = ({ page, count }: any) => {
    console.log('App->handleOnPageChange: ', page, count);
  };

  const handleOnRotateChange = ({ degree }: any) => {
    console.log('App->handleOnRotateChange: ', degree);
  };

  const handleOnScaleChange = ({ scale }: any) => {
    console.log('App->handleOnScaleChange: ', scale);
  };

  return (
    <EmbedPdf.Document
      src="test.pdf"
      eventListener={onHandle}
      LoadingRenderer={Loading}
    >
      <EmbedPdf.Toolbar as="fieldset">
        <EmbedPdf.ToolbarItem>
          <EmbedPdf.FullScreen containerId="PageList__id">
            FullScreen
          </EmbedPdf.FullScreen>
        </EmbedPdf.ToolbarItem>
        <EmbedPdf.ToolbarItem>
          <EmbedPdf.Print src="test.pdf">Imprimir</EmbedPdf.Print>
        </EmbedPdf.ToolbarItem>
        <EmbedPdf.ToolbarItem>
          <EmbedPdf.Download src="test.pdf">Download</EmbedPdf.Download>
        </EmbedPdf.ToolbarItem>
        <EmbedPdf.ToolbarItem>
          <EmbedPdf.Scale onChange={handleOnScaleChange} label="Zoom: " />
        </EmbedPdf.ToolbarItem>
        <EmbedPdf.ToolbarItem>
          <EmbedPdf.Rotate onChange={handleOnRotateChange} label="Girar: " />
        </EmbedPdf.ToolbarItem>
        <EmbedPdf.ToolbarItem>
          <EmbedPdf.Pagination onChange={handleOnPageChange} />
          <EmbedPdf.PaginationInput
            slots={{ labelLeft: 'Página', labelRight: 'de' }}
            onChange={handleOnPageChange}
          />
        </EmbedPdf.ToolbarItem>
      </EmbedPdf.Toolbar>
      <EmbedPdf.PageList id="PageList__id" />
    </EmbedPdf.Document>
  );
}
