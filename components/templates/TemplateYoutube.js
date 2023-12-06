import React, { useState } from 'react'
import { Dialog } from '../lib/primereact.all'

const TemplateYoutube = ({
    playIcon,
    imgSrc,
    title = ["Integration with", "Existing Vite Applications"],
    description = "Only the folders that are related to the layout needs to move in to your project. We‘ve already created a short tutorial with details for Sakai Vue. The both templates have the same implementation.",
    youtubeLink = "https://www.youtube.com/embed/Y07edRJd5QM"
}) => {
    const [youtubeVideoVisible, setYoutubeVideoVisible] = useState(false);

    return (
        <div className='template-youtube-outer'>
            <div className='template-youtube'>
                <div className='template-youtube-title'>
                    {title.map((data, i) => (
                        <h2 key={i}>{data}</h2>
                    ))}
                </div>
                <div className='template-youtube-description'>
                    {description}
                </div>
                <div className='template-youtube-screen' onClick={() => setYoutubeVideoVisible(true)}>
                    <div className='template-youtube-screen-blur'>
                        <div className='template-youtube-screen-play'>
                            {playIcon}
                        </div>
                    </div>
                    <img src={imgSrc} alt="Template Youtube Screen" />
                </div>
                <Dialog header="Video Content" visible={youtubeVideoVisible} style={{ width: '70vw' }} onHide={() => setYoutubeVideoVisible(false)}>
                    <div className='template-youtube-video'>
                        <iframe src={youtubeLink} title="PrimeNG 2023 Roadmap" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default TemplateYoutube