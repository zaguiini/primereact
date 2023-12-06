import React from 'react'

const TemplateFeaturesType2 = ({ featuresData }) => {
    return (
        <div className='template-features2-outer'>
            <div className='template-features2'>
                {featuresData.map((data, i) => (
                    <div key={i} className={`template-features2-card ${i === 1 && "template-features2-card-withMargin"} ${(i != 0 && (i % 2 === 0)) && "template-features2-card-withoutMargin"}`}>
                        <img className='template-features2-card-img' src={data.src} alt={data.title} />
                        <h2>{data.title}</h2>
                        <p>{data.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TemplateFeaturesType2