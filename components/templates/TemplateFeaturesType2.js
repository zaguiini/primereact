import React from 'react'

const TemplateFeaturesType2 = ({ featuresData }) => {
    const firstColumnData = featuresData.slice(0, Math.ceil(featuresData.length / 2));
    const secondColumnData = featuresData.slice(Math.ceil(featuresData.length / 2));

    return (
        <div className='template-features2-outer'>
            <div className='template-features2'>
                {
                    Array(2).fill(null).map((_, i) => (
                        <div key={i} className='template-features2-col'>
                            {(i === 0 ? firstColumnData : secondColumnData).map((data, j) => (
                                <div key={j} className={`template-features2-card `}>
                                    <div className='template-features2-card-image'>
                                        <img src={data.src} alt={data.title} />
                                    </div>
                                    <h2>{data.title}</h2>
                                    <p>{data.description}</p>
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TemplateFeaturesType2