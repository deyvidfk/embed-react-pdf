import './App.css';
import { FC } from 'react';
import { EmbedPdf } from './lib';

function Loading() {
  return <div className="box">Carregando ...</div>;
}

const MeuErrorHandler: FC = (pros: any) => <div className="box">Houve um erro ao processar o pdf</div>;

function MeuBotao({ children, ...rest }: any) {
  return (
    <div className="box" {...rest}>
      {children}
    </div>
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
      onPdfAbstractEvents={onHandle}
      slots={{
        Error: MeuErrorHandler,
        Loading,
      }}
    >
      <div style={{ display: 'flex', flex: '1', overflow: 'auto' }}>
        <EmbedPdf.Toolbar as="fieldset">
          <EmbedPdf.ToolbarItem>
            <EmbedPdf.Download src="test.pdf">Download</EmbedPdf.Download>
          </EmbedPdf.ToolbarItem>
          <EmbedPdf.ToolbarItem>
            <EmbedPdf.FullScreen containerId="#PageList__id">
              FullScreen
            </EmbedPdf.FullScreen>
          </EmbedPdf.ToolbarItem>

          <EmbedPdf.ToolbarItem>
            <EmbedPdf.Print src="test.pdf">Imprimir</EmbedPdf.Print>
          </EmbedPdf.ToolbarItem>
          <EmbedPdf.ToolbarItem>
            <EmbedPdf.AutoScale>Ajustar à largura</EmbedPdf.AutoScale>
          </EmbedPdf.ToolbarItem>
          <EmbedPdf.ToolbarItem>
            <EmbedPdf.ManualScale
              onChange={handleOnScaleChange}
              label="Zoom: "
            />
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
      </div>
      <EmbedPdf.PageList id="PageList__id" pageFit />
    </EmbedPdf.Document>
  );
}
