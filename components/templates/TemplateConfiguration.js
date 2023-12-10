import React from 'react'

const TemplateConfiguration = ({
    title = "",
    description = "",
}) => {
    return (
        <div className='template-configuration-outer'>
            <div className='template-configuration'>
                <div className='template-configuration-screen'>
                    <div className='template-configuration-screen-top'>
                        <div className='template-configuration-screen-top-close template-configuration-screen-top-circle'></div>
                        <div className='template-configuration-screen-top-minimize template-configuration-screen-top-circle'></div>
                        <div className='template-configuration-screen-top-zoom template-configuration-screen-top-circle'></div>
                    </div>
                    <div className='template-configuration-screen-bottom'>
                        <p>&gt; npm install -g angular-cli</p>
                        <p>&gt; ng new my-apollo-app</p>
                        <p>&gt; cd my-apollo-app</p>
                        <p>&gt; ng serve</p>
                        <img className='template-configuration-screen-bottom-logo' src={'/images/templates/react-3d-logo.png'} alt='Angular 3D Logo' />
                    </div>
                </div>
                <h3 className='template-configuration-title'>{title}</h3>
                <p className='template-configuration-description'>{description}</p>
            </div>
        </div>
    )
}

export default TemplateConfiguration