# EmbedPdf

### Declaracao padrao
```tsx
import { EmbedPdf } from "@maas-components/embed-pdf";

export default function App() {
  return <EmbedPdf.Document src="test.pdf" />;
}

```
### Declaracao com manipulador de eventos
```tsx
import { EmbedPdf } from "@maas-components/embed-pdf";

export default function App() {

  const onHandle = ({ name, meta }: any) => {
    console.log(name, meta);
  };

 return   <EmbedPdf.Document src="test.pdf" onPdfAbstractEvents={onHandle} />
}

```
### Declaracao com slots

```tsx
import { EmbedPdf } from "@maas-components/embed-pdf";

export default function App() {

 return   <EmbedPdf.Document src="test.pdf"
            slots={{
              Error: CustomErrorComponent,
              Loading: CustomLoadingComponent,
            }}
    />    
}

```

### Declaracao com barra de controles

```tsx
import { EmbedPdf } from "@maas-components/embed-pdf";

export default function App() {

   return <EmbedPdf.Document src="test.pdf">
            <EmbedPdf.Toolbar as="fieldset">
              <EmbedPdf.ToolbarItem>
                <EmbedPdf.AutoScale>Ajustar à largura</EmbedPdf.AutoScale>
              </EmbedPdf.ToolbarItem>         
            </EmbedPdf.Toolbar>
          </EmbedPdf.Document>   
}

```

## Instalacao

Pre requisito: Permissao de instalacao de pacotes hospedados no Nexus da Magalu

`npm install @maas-components/embed-pdf`

`yarn add @maas-components/embed-pdf`

## Motivacao

A plataforma Seller atualmente disponibiliza a visualização de arquivos PDF utilizando algumas estratégias conhecidas como HTML Embed e HTML Iframes. No entanto, esses recursos estão cada vez mais limitados pelos navegadores modernos.

Os problemas com a solução atual incluem:

* Problemas de segurança relacionados à tag HTML iframe
* Problemas de segurança relacionados à tag HTML embed
* Falta de suporte à leitura de arquivos PDF em navegadores nos dispositivos móveis

**Alternativas**

Outras bibliotecas JavaScript disponibilizadas por terceiros também procuram resolver os mesmos problemas, como é o caso da Adobe com PDF View SDK.

O custo é um fator importante, e utilizar uma lib com contrato de uso por usuário não é viável, pois a intenção é que nossa base de sellers cresça a cada dia, e isso pode impactar esse projeto negativamente.

Outras bibliotecas alternativas tambem sao disponibilizadas pela comunidade open source (@react-pdf/renderer)

**Iniciativa**

Essa iniciativa não procura reescrever a roda, e por isso resolvemos utilizar uma base, a biblioteca open source criada pela Mozilla chamada de PDF.js. Essa biblioteca é utilizada globalmente em seu navegador e com benefícios que incluem:

* Segurança: A biblioteca PDF.js é segura e não apresenta os mesmos problemas de segurança que as tags HTML iframe e embed.
* Suporte a dispositivos móveis: A biblioteca PDF.js é suportada por navegadores em dispositivos móveis, o que permite que os usuários visualizem arquivos PDF em seus smartphones e tablets.
* Custo: A biblioteca PDF.js é open source e gratuita para uso, o que economiza custos para nossa empresa.

**Planejamento**

Ao planejar esse desenvolvimento, tínhamos que entender como seria a interface da nossa biblioteca, e com isso alguns questionamentos:

* Expor todos os recursos da biblioteca MozillaPDF, ou abstrair tudo?

Ao pensar nas premissas, lembramos que essa nova biblioteca tem como requisito a experiência do desenvolvedor, tem que ser simples e padronizado. A ideia geral é não permitir um uso personalize o uso e sim trazer um padrão, nas que em algunas exceções, a customizacao seja possivel.

**Conclusão**

A biblioteca PDF.js é uma ótima opção para a plataforma Seller, pois oferece segurança, suporte a dispositivos móveis e custo zero. A interface da biblioteca foi planejada para ser simples e padronizada, o que facilita o uso pelos desenvolvedores.

#### Api Components:

* <Document\/>
* <DocumentPages\/>
* <Toolbar\/>
* <ToolbarItem\/>

#### Document

Esse componente permite definir os parametros necessarios para renderizacao do documento PDF.


| Prop                | Required | default value | type                           |
| --------------------- | ---------- | --------------- | -------------------------------- |
| src                 | true     | undefined     | string,URL,Base64,Blob         |
| children            | false    | DocumentPages | React.ReactNode                |
| onPdfAbstractEvents | false    | undefined     | Function:THandlerEventPdf |
| slots               | false    | undefined     | Object:DocumentSlots           |
| useLazyLoad         | false    | true | bool                |

#### DocumentPages

Esse componente e responsavel por anexar as paginas ao DOM, por padrao e injetado ao Document,porem,caso deseje parametrizar a rendrizacao
da pagina, declare como elemento filho do Document.


| Prop       | Required | default value | type   |
| ------------ | ---------- | --------------- | -------- |
| id         | false    | undefined     | string |
| usePageFit | false    | undefined     | bool   |

#### Toolbar

Esse componente renderiza uma barra de controles do PDF. Utileze ToolbarItem para gerenciar espacamentos os controles.

| Prop     | Required | default value | type            |
| ---------- | ---------- | --------------- | ----------------- |
| children | true     | undefined     | React.ReactNode |

#### ToolbarItem
Esse componente renderizar um elemento de controle do PDF.

| Prop     | Required | default value | type            |
| ---------- | ---------- | --------------- | ----------------- |
| children | true     | undefined     | React.ReactNode |

#### ScaleControl
Esse componente permite gerenciar a escala de redimensionamento a pagina do documento

| Prop     | Required | default value | type            |
| ---------- | ---------- | --------------- | ----------------- |
| children | true     | undefined     | React.ReactNode |

#### ScaleFitControl
Esse componente permite gerenciar a escala de redimensionamento a pagina do documento

| Prop     | Required | default value | type            |
| ---------- | ---------- | --------------- | ----------------- |
| children | true     | undefined     | React.ReactNode |

#### ScaleAutoFitControl
Esse componente permite gerenciar a escala de redimensionamento de forma automatica para que a pagina se ajuste a tela

| Prop     | Required | default value | type            |
| ---------- | ---------- | --------------- | ----------------- |
| children | true     | undefined     | React.ReactNode |


#### DownloadControl
Esse componente permite realizar o download do documento PDF para o sistema de arquivos do dispositivo do usuario

| Prop     | Required | default value | type            |
| ---------- | ---------- | --------------- | ----------------- |
| children | true     | undefined     | React.ReactNode |


#### FullscreenControl
Esse componente permite o usuario visualizar o documento em modo FullScreen do navegador

| Prop     | Required | default value | type            |
| ---------- | ---------- | --------------- | ----------------- |
| children | true     | undefined     | React.ReactNode |


#### PrintControl
Esse componente permite o usuario enviar o documento para o sistema de impressao do sistema operacional do dispositivo do usuario

| Prop     | Required | default value | type            |
| ---------- | ---------- | --------------- | ----------------- |
| children | true     | undefined     | React.ReactNode |

#### RotationControl
Esse componente permite o usuario rotacinar a pagina. Esse recurso pode ser util em dispositivos mobile onde a rotacao e frequente.

| Prop     | Required | default value | type            |Desc|
| ---------- | ---------- | --------------- | ----------------- |--|
| inputAs | false     | 'input'     | React.ElementType |Essa propriedade permite a substituicao do elemento padrao por outro elemento |
| label | false     | undefined     | TSlot |Essa propriedade permite a substituicao do elemento padrao por outro elemento |
| onChange | false     | undefined     | TChangeEvent |Funcao de callback |