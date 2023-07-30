import fs from 'node:fs'

function b64toBlob(dataURI:any) {
    
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: 'application/pdf' });
}

export async function waitForAsync() {
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  }

export function loadPDF(path: string) {
    const raw = fs.readFileSync(path);
    const arrayBuffer = raw.buffer;
  
    return {
      raw,
      get arrayBuffer() {
        return new Uint8Array(raw).buffer;
      },
      get blob() {
        return new Blob([arrayBuffer], { type: 'application/pdf' });
      },
      get data() {
        return new Uint8Array(raw);
      },
      get dataURI() {
        return `data:application/pdf;base64,${raw.toString('base64')}`;
      },
      get file() {
        return new File([arrayBuffer], 'test.pdf', { type: 'application/pdf' });
      },
    };
  }
