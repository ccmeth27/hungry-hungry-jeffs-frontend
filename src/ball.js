class Ball {
    constructor(x, y, speed) {
      this.color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
      this.direction = Math.random() * Math.PI * 2;
      this.radius = 10;
      this.speed = speed;
      this.x = x;
      this.y = y;
    }
    updatePosition(width, height){
      this.x += Math.cos(this.direction) * this.speed;
      this.y += Math.sin(this.direction) * this.speed;
      if(this.x - this.radius < 0) {
        this.x = this.radius;
        this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);
      } else if (this.x + this.radius > width) {
        this.x = width - this.radius;
        this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);
      }
      if(this.y - this.radius < 0) {
        this.y = this.radius;
        this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
      } else if (this.y + this.radius > height) {
        this.y = height - this.radius;
        this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
      }
    }
}