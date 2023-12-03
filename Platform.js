platformImg= new Image();
platformImg.src="assets/images/platform.png"

class Platform{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.img=platformImg;
    }
    draw(context){
        context.drawImage(this.img,this.x,this.y,this.width,this.height);
    }
}