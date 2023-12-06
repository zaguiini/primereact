import React from 'react'

const TemplateSeparator = ({ separatorLogo }) => {
    return (
        <div className='' style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span className='' style={{ flex: "1", height: "1px", backgroundColor: "var(--surface-border)" }}></span>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "3rem", width: "3rem",  }}>
                {separatorLogo}
            </span>
            <span className='' style={{ flex: "1", height: "1px", backgroundColor: "var(--surface-border)" }}></span>
        </div>
    )
}

export default TemplateSeparator