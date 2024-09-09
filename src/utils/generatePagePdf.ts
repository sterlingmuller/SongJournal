import * as Print from 'expo-print';

import { SONG_DETAILS } from '@src/components/common/constants';
import { Page } from '@src/components/common/types';
import { SongDetailKey } from '@src/components/common/enums';

export const generatePagePdf = async (
  title: string,
  page: Page,
  artist: string,
) => {
  const { lyrics, info } = page;

  const renderInfo = () => {
    const infoToDisplay = Object.entries(SONG_DETAILS)
      .map(([key, label]: [SongDetailKey, string]) => {
        return !!info[key] && `${label}: ${info[key]}`;
      })
      .filter((value: string | boolean) => value !== false);

    if (infoToDisplay.length) {
      return `<p style="text-align: center;"><strong>${infoToDisplay.join(' &nbsp; &nbsp; ')}</strong></p>`;
    }

    return '</>';
  };

  const renderAbout = () => {
    if (info.about) {
      return `
        <div class="about-section">
          <hr />
          <p>&nbsp;</p>
          <p style="text-align: center;"><strong>About: </strong>${info.about}</p>
        </div>
      `;
    }

    return '';
  };

  const html = `
    <html>
      <head>
        <style>
          @page {
            margin: 10px;
          }
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            min-height: calc(100vh - 40px);
          }
          .container {
            display: flex;
            flex-direction: column;
            min-height: calc(100vh - 20px);
          }
          .header {
            background-color: #fdc883;
            text-align: center;
            padding: 20px;
          }
          .content {
            flex-grow: 1;
            padding: 20px 50px;
          }
          .about-section {
            margin-top: auto;
            padding: 30px 50px;
          }
          hr {
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <p style="font-size: 24px; margin: 0;"><strong>${title}</strong></p>
            ${artist ? `<p style="font-size: 18px; margin: 10px 0 0 0;"><strong>${artist}</strong></p>` : ''}
            ${renderInfo()}
          </div>
          <div class="content">
            ${lyrics}
          </div>
          ${renderAbout()}
        </div>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });

  return uri;
};
