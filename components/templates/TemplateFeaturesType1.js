import React from 'react'

const TemplateFeaturesType1 = ({ featuresData }) => {
    return (
        <div className='template-features1-outer'>
            <div className='template-features1'>
                {featuresData.map((data, i) => (
                    <div key={i} className='template-features1-card'>
                        <div className='template-features1-card-top'>
                            <img src={data.src} alt={data.title}></img>
                        </div>
                        <div className='template-features1-card-bottom'>
                            <h5 className='template-features1-card-bottom-title'>
                                {data.title}
                            </h5>
                            <p className='template-features1-card-bottom-description'>
                                {data.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TemplateFeaturesType1