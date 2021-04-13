import React from 'react'
import preloader from './../../../assets/images/Spinner-1s-200px.svg'

let Preloader = (props) => {
    return <div style={ {backgroundColor: 'white'} }>
        <img src={preloader} alt='' />
    </div>
}

export default Preloader;