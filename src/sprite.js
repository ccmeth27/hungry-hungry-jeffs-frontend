class Sprite{
    constructor(context, width, height, image, ticksPerFrame, numberOfFrames){
        this.context = context
        this.width = width
        this.height = height
        this.x = 0
        this.y = 0
        this.image = image
        this.scaleRatio = 0.4
        this.frameIndex = 0
        this.tickCount = 0
        this.ticksPerFrame = ticksPerFrame 
        this.numberOfFrames = numberOfFrames
    }
    update(){
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            // If the current frame index is in range
            if (this.frameIndex < this.numberOfFrames - 1) {	
                // Go to the next frame
                this.frameIndex += 1;
            } else {
                setTimeout(() => {
                    this.frameIndex = 0
                }, 250);
            }
        }
    }

    render(player = "bottom"){
        // Draw the animation
        // let angle
        // if(player === "bottom")angle = 0.0
        // if(player === "top")angle = Math.PI
        // this.context.translate(300, 300)
        // this.context.rotate(angle)
        this.context.drawImage(
        this.image,
        this.frameIndex * this.width / this.numberOfFrames,
        0,
        this.width / this.numberOfFrames,
        this.height,
        250, 
        330,
        this.width / this.numberOfFrames * this.scaleRatio,
        this.height * this.scaleRatio)
        // this.context.rotate(-angle)
        // this.context.translate(-300, -300)
    }

    multiRender(player){
        let angle
        if(player === "left")angle = Math.PI / 2
        if(player === "right")angle = (3 * Math.PI) / 2
        this.context.translate(300, 300)
        this.context.rotate(angle)
        // Draw the animation
        this.context.drawImage(
        this.image,
        this.frameIndex * this.width / this.numberOfFrames,
        0,
        this.width / this.numberOfFrames,
        this.height,
        -50, 
        20,
        this.width / this.numberOfFrames * this.scaleRatio,
        this.height * this.scaleRatio)
        this.context.rotate(-angle)
        this.context.translate(-300, -300)
    }
}