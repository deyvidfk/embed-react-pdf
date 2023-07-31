import { PageList } from './Pages/PageList';
import { DocumentRoot } from './Document';
import { PageInputControl, PaginationControl } from './Controls/Pagination';
import { RotateControl } from './Controls/Rotation';
import { AutoScale, ManualScale } from './Controls/Scale';
import { DownloadControl } from './Controls/Download';
import { PrintControl } from './Controls/Print';
import { FullScreenControl } from './Controls/Fullscrenn';
import { Toolbar, ToolbarItem } from './Controls/Toolbar';

export const EmbedPdf = {
  FullScreen: FullScreenControl,
  Document: DocumentRoot,
  Print: PrintControl,
  PageList,
  Download: DownloadControl,
  AutoScale,
  ManualScale,
  Rotate: RotateControl,
  Pagination: PaginationControl,
  PaginationInput: PageInputControl,
  Toolbar,
  ToolbarItem,
};
