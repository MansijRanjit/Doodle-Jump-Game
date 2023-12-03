let right_image=new Image();
right_image.src="assets/images/doodler-right.png";

let left_image=new Image();
left_image.src="assets/images/doodler-left.png";

class Doodler{
    constructor(x,y,width,height){
        this.img=right_image;
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.velocityX=0;
        this.velocityY=0;
    }

    draw(context){
        context.drawImage(this.img,this.x,this.y,this.width,this.height);
    }
}