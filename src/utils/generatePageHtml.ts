import { SONG_DETAILS } from '@src/common/constants';
import { page, songDetail } from '@src/common/types';

export const generatePageHtml = (title: string, page: page) => {
  const { lyrics, info } = page;

  const renderInfo = () => {
    const infoToDisplay = SONG_DETAILS.map(
      ({ label, key }: songDetail) => !!info[key] && `${label}: ${info[key]}`,
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

  return `
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
};
