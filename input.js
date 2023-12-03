const keys={
    A:false,
    D:false,
    ArrowRight:false,
    ArrowLeft:false,
};

window.onkeydown =(e) =>{
    switch(e.code){
        case 'KeyA':
            keys.A=true;
            break;
        case 'KeyD':
            keys.D=true;
            break;
        case 'ArrowRight':
            keys.ArrowRight=true;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft=true;
            break;
    }
}

window.onkeyup =(e) =>{
    switch(e.code){
        case 'KeyA':
            keys.A=false;
            break;
        case 'KeyD':
            keys.D=false;
            break;
        case 'ArrowRight':
            keys.ArrowRight=false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft=false;
            break;
    }
}