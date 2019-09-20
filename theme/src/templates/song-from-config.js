import React, { useState } from "react"
import '../styles.css'
import Embed from '../component/embed';
import { soundCloudRegEx } from '../utils'
// Little Debuggers
const showAlbumArt = true;
const showEmbed = true;
const preferEmbedComponent = true;

const sampleConfig = {
  artist: 'Lord Rolex',
  songTitle: 'Downtown. Portland',
  soundcloudUrl: 'https://soundcloud.com/req-1/downtown-portland'
}

const SongPageTemplate = props => {
  console.log('the props on the song page', props);
  const md = props.data.markdownRemark
  const { artist, songTitle } = md.frontmatter
  const [isPlaying, setPlay] = useState(false);

  // grabs soundcloud url from html
  const matched = md.html.match(soundCloudRegEx);

  return (
    <div className="app--wrapper">
      <div className="avatar--lockup">
        <figure className="avatar--wrapper">
          <img src="https://images.unsplash.com/photo-1521587765099-8835e7201186?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt="Face" className="avatar" />
        </figure>
        <h1>{artist ? artist : 'Artist'}</h1>
      </div>
      <div className="section-break" />
      <h2>{songTitle ? songTitle : 'Song Title'}</h2>

      {showAlbumArt &&
        /* Album artwork */
        <>
          <img src="https://picsum.photos/200" alt="Face" className="album-art" />
          <button onClick={() => setPlay(!isPlaying)}>
            <h2>{isPlaying ? 'Pause' : 'Play'}</h2>
          </button>
        </>
      }

      {/* New embed awesomeness */}
      {showEmbed && preferEmbedComponent &&
        <Embed url={matched[0]} size='l' />
      }

      {/* Soundcloud remark */}
      {showEmbed && !preferEmbedComponent &&
        <pre>
          <section dangerouslySetInnerHTML={{ __html: md.html }} />
        </pre>
      }

    </div>
  )
}

export const pageQuery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        author
        description
        siteUrl
        title
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        artist
        songTitle
        title
      }
    }
  }
`

export default SongPageTemplate