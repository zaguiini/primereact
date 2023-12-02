import React, { useRef } from 'react'
import useAnimatedFeatures from './useAnimatedFeatures ';
import ApolloFeaturesInline from './ApolloFeaturesInline';

const ApolloFeaturesSection = ({ featuresData }) => {
    const animationRef = useRef(null)
    const { selectedID, handleClick } = useAnimatedFeatures(animationRef, featuresData.length);
    
    return (
        <div className='apollo-features-animation' ref={animationRef}>
            <div className='template-features-animation' >
                <div className='template-features-animation-left'>
                    {featuresData.map((data, i) => (
                        <div key={i} className={`template-features-animation-left-card ${!!(selectedID === data.id) && "template-features-animation-left-card-active"}`} onClick={() => handleClick(data.id)}>
                            <div className='template-features-animation-left-card-order'>{i + 1}</div>
                            <div>
                                <h5>{data.title}</h5>
                                <p>{data.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='template-features-animation-right'>
                    {featuresData[selectedID - 1]?.type === "inline-animation" ?
                        <ApolloFeaturesInline inlineFeaturesData={featuresData[selectedID - 1]?.inlineFeaturesData} parentHandleClick={handleClick} parentID={selectedID}/>
                        : <img src={featuresData[selectedID - 1]?.src} alt='Animation Feature Image' />}
                </div>
            </div>
        </div>
    )
}

export default ApolloFeaturesSection