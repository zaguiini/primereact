import React, { useRef } from 'react'
import useAnimatedFeatures from './useAnimatedFeatures ';

const ApolloFeaturesInline = ({ inlineFeaturesData, parentHandleClick, parentID }) => {
    const animationRef = useRef(null)
    const { selectedID, handleClick } = useAnimatedFeatures(animationRef, inlineFeaturesData.length,1000);

    const handleBtnClick=(id)=>{
        handleClick(id)
        parentHandleClick(parentID)
    }

    return (
        <div className='template-features-animation-right-inline' ref={animationRef}>
            <div className='template-features-animation-right-inline-tabs'>
                {inlineFeaturesData.map((data, i) => (
                    <button className={`${!!(data.id === selectedID) && "template-features-animation-right-inline-tabs-btnActive"}`} onClick={()=>handleBtnClick(data.id)} key={i}>{data.title}</button>
                ))}
            </div>
            <div className='template-features-animation-right-inline-image'>
                <img src={inlineFeaturesData[selectedID-1].src} alt='Animation Inline Feature Image' />
            </div>
        </div>
    )
}

export default ApolloFeaturesInline