export function welcome(setStart) {
    return (
        <div>
            {/*<div className='video'>*/}
            <video className='back-video' width='100%' autoPlay muted playsInline loop>
                <source src='/video/alien-bg1.mp4' type="video/mp4"/>
            </video>
            <img src='/picture/ufo.gif' alt='ufo' width='300px'></img>
            <img src='/picture/barbette.png' alt='barbette' width='300px'/>
            {/*<iframe*/}
            {/*    title="Spline Design"*/}
            {/*    src="https://my.spline.design/chips-d872624de47329e97a094e417fc62285/"*/}
            {/*    width="10%"*/}
            {/*    height="auto"*/}
            {/*    allowFullScreen*/}
            {/*></iframe>*/}

            {/*<div style={{width:100%} {height:0} paddingBottom:100%, position:relative}}>*/}
            {/*    <iframe src="https://giphy.com/embed/l5JbspfwZ0yjHjlJ0K" width="100%" height="100%"*/}
            {/*            style={{position:absolute}} frameBorder="0" className="giphy-embed" allowFullScreen></iframe>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*<div className='wel-page'>*/}
            {/*    <h1 className='wel-heading'>Welcome To Wheel Of Fortune</h1>*/}
            {/*    <button className='wel-btn' onClick*/}
            {/*        ={event => setStart(true)}>Start!!!*/}
            {/*    </button>*/}
            {/*</div>*/}
            <div className='wel-content'>
                <h1>Alien Invader</h1>
                <button className='wel-btn' onClick
                    ={event => setStart(true)}>Start Fight
                </button>
            </div>
        </div>
    )
}