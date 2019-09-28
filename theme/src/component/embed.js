import React from 'react';
import Iframe from "react-iframe";
import { isUrlValid } from '../utils'

function Embed({ title, id, height = 320, url, size, color = '#ff5500', autoplay = false }) {

  if (url && !isUrlValid(url)) {
    console.error("Not a valid url. Please check the url for errors.");
    return null;
  }

  const safeColor = encodeURI(color);

  return (
    <Iframe
      scrolling="no"
      title={title}
      url={`https://w.soundcloud.com/player/?url=https%3A${url}&color=${safeColor}&auto_play=${autoplay ? 'true' : 'false'}&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=${size === 'l' ? 'true' : 'false'}`}
      allowFullScreen={true}
      frameBorder={0}
      width="100%"
      height={height}
      allow="autoplay"
      loading="lazy"
    />
  );
}

export default Embed;
