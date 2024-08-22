import * as Print from 'expo-print';

import { SONG_DETAILS } from '@src/components/common/constants';
import { Page } from '@src/components/common/types';
import { SongDetailKey } from '@src/components/common/enums';

export const generatePagePdf = async (title: string, page: Page) => {
  const { lyrics, info } = page;

  const renderInfo = () => {
    const infoToDisplay = SONG_DETAILS.map(
      (detail: SongDetailKey) => !!info[detail] && `${detail}: ${info[detail]}`,
    ).filter((value: string | boolean) => value !== false);

    if (infoToDisplay.length) {
      return `<p style="text-align: center;">${infoToDisplay.join(' &nbsp; &nbsp; ')}</p>`;
    }

    return '</>';
  };

  const renderAbout = () => {
    if (info.about) {
      return `<p>&nbsp;</p><hr />
    <p>&nbsp;</p>
    <p style="text-align: center;">${info.about}</p>`;
    }

    return '</>';
  };

  const html = `
    <div style="background-color: #fdc883;">
    <p>&nbsp;</p>
      <p style="text-align: center;"><strong>${title}</strong></p>
      ${renderInfo()}
      <hr />
    </div>
    <p>&nbsp;</p>
    <div style="padding-left: 60px;">${lyrics}</div>
    ${renderAbout()}
  `;

  const { uri } = await Print.printToFileAsync({ html });

  return uri;
};
