import { SONG_DETAILS } from '@src/common/constants';
import { page, songDetail } from '@src/common/types';

export const generatePageHtml = (title: string, page: page) => {
  const { lyrics, info } = page;

  const renderInfo = () => {
    const infoToDisplay = SONG_DETAILS.map(
      ({ label, key }: songDetail) => !!info[key] && `${label}: ${info[key]}`,
    ).filter((value: string | boolean) => value !== false);

    console.log('infoToDiplay:', infoToDisplay);

    if (infoToDisplay.length) {
      return `<p style="text-align: center;">${infoToDisplay.join(' &nbsp; &nbsp; ')}</p><hr />`;
    }

    return '<hr />';
  };

  const renderAbout = () => {
    if (info.about) {
      return `<p>&nbsp;</p><hr />
    <p>&nbsp;</p>
    <p style="text-align: center;">${info.about}</p>`;
    }

    return '<p>&nbsp;</p>';
  };

  return `
    <div style="background-color: #fdc883; padding: 10px;">
      <p style="text-align: center;"><strong>${title}</strong></p>
      ${renderInfo()}
    </div>
    <p>&nbsp;</p>
    <p style="padding-left: 60px;">${lyrics}</p>
    ${renderAbout()}
  `;
};
