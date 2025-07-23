import * as Print from 'expo-print';

import { SONG_DETAILS } from '@src/components/common/constants';
import { Page } from '@src/components/common/types';
import { SongDetailKey } from '@src/components/common/enums';
import { convertToHtml } from './convertToHtml';
import { Platform } from 'react-native';

export const generatePagePdf = async (
  title: string,
  page: Page,
  artist: string
) => {
  const { lyrics, info } = page;

  const htmlLyrics = convertToHtml(lyrics);

  const renderInfo = () => {
    const infoToDisplay = Object.entries(SONG_DETAILS)
      .map(([key, label]: [SongDetailKey, string]) => {
        return !!info[key] && `${label}: ${info[key]}`;
      })
      .filter((value: string | boolean) => value !== false);

    if (infoToDisplay.length) {
      return `
      <div class="info-container">
        ${infoToDisplay.map((item: string) => `<span class="info-item">${item}</span>`).join('')}
      </div>
    `;
    }

    return '';
  };

  const renderFooter = () => {
    return `
      <div class="footer">
        <hr />
        ${info.about ? `<div><strong>About: </strong>${info.about}</div> <p>&nbsp;</p>` : ''}
        <div class="generated-footer">Created with Song Journal</div>
      </div>
    `;
  };

  const isIOS = Platform.OS === 'ios';

  const html = `
    <html>
      <head>
        <style>
          @page {
            margin: 10px;
          }
          body {
            font-family: monospace;
            font-size: 12px;
            ${isIOS ? 'margin: 10px;' : 'margin: 0;'}
            padding: 0;
          }
        .container {
          ${
            isIOS
              ? ''
              : 'display: flex; flex-direction: column; min-height: calc(100vh - 20px);'
          }
        }
          .header {
            background-color: #ffb07a;
            text-align: center;
            padding: 15px 20px 10px 20px;
            print-color-adjust: exact;
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
          }
          .title {
            font-size: 28px;
            font-weight: bold;
            margin: 0;
          }
          .artist{
            font-size: 18px;
            font-weight: bold;
            margin: 10px 0;
          }
          .info {
            font-weight: bold;
            text-align: center;
            font-size: 16px;
          }
        .content {
          ${
            isIOS
              ? 'padding: 0 30px 10px 50px; white-space: pre; position: relative;'
              : 'flex-grow: 1; padding: 0 30px 10px 50px; white-space: pre; position: relative;'
          }
        }
        .footer {
          ${
            isIOS
              ? 'padding: 20px 50px; text-align: center; page-break-inside: avoid;'
              : 'margin-top: auto; padding: 20px 50px; text-align: center;'
          }
        }
          hr {
            margin: 20px 0;
          }
          .chord {
            color: teal;
            font-weight: bold;
            position: relative;
            display: inline-block;
          }
          .chord-line {
            margin-top: 4px;
            display: block;
            position: relative;
          }
          .lyric-line {
            margin-bottom: 4px;
          }
          .first-section {
            margin: 0 0 10px 0;
          }
          .section {
            margin: 20px 0 10px 0;
          }
          .info-container {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            margin: 0 0 10px 0;
          }
          .gap-line {
            margin: 0;
            padding-vertical: 10;
          }
          .info-item {
            white-space: nowrap;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <p class="title">${title}</p>
            ${artist && `<p class="artist">${artist}</p>`}
            ${renderInfo()}
          </div>
          <div class="content">
            ${htmlLyrics}
          </div>
          ${renderFooter()}
        </div>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });

  return uri;
};
