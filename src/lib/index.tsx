import { FC } from 'react';
import { PageList } from './Pages/PageList';
import { DocumentRoot } from './Document';
import { ControlPanel } from './Controls';
import { PageInputControl, PaginationControl } from './Controls/Pagination';
import { RotateControl } from './Controls/Rotation';
import { ScaleControl } from './Controls/Scale';
import { DownloadControl } from './Controls/Download';
import { PrintControl } from './Controls/Print';
import { FullScreenControl } from './Controls/Fullscrenn';

export const ToolbarItem: FC = ({ children }) => <div className="mrc-embed-pdf__toolbar-item">{children}</div>;

export const EmbedPdf = {
  FullScreen: FullScreenControl,
  Document: DocumentRoot,
  Print: PrintControl,
  PageList,
  Download: DownloadControl,
  Scale: ScaleControl,
  Rotate: RotateControl,
  Pagination: PaginationControl,
  PaginationInput: PageInputControl,
  Toolbar: ControlPanel,
  ToolbarItem,
};
