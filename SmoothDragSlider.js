export class SmoothDragSlider{
    constructor($slider){
        this.$slider = $slider;

        this.mouseDownAt = 0;
        this.mouseDelta = 0;
        this.maxDelta = window.innerWidth / 2;
        this.percentage = 0;
        this.lastPercentage = 0;
        this.init();
    }//constructor

    init(){
        this.add_mouse_down();
    }//init
    
    add_mouse_down(){
        window.addEventListener('mousedown',this.on_mouse_down,{once:true});
    }//add_mouse_down

    on_mouse_down = e =>{
        const {clientX} = e;
        this.mouseDownAt = clientX;

        window.addEventListener('mousemove', this.on_mouse_move);
        window.addEventListener('mouseup',this.clear);
    }//on_mouse_down

    on_mouse_move = e =>{
        const {clientX} = e;
        this.maxDelta = this.$slider.offsetWidth;
        this.mouseDelta = this.mouseDownAt - clientX;
        this.percentage = (this.mouseDelta / this.maxDelta) * -100 + this.lastPercentage;
        if(this.percentage > 0){ 
            this.percentage = 0;
        }else if(this.percentage < -100){
            this.percentage = -100;
        }
        // this.$slider.style.transform = `translate(${this.percentage}%, -50%)`;
        this.$slider.animate({
            transform : `translate(${this.percentage}%, -50%)`
        },{
            duration : 1200, 
            fill : "forwards"
        });

        const $$img = this.$slider.querySelectorAll('IMG');
        $$img.forEach($img =>{
            // $img.style.objectPosition = `${100 + this.percentage}% 50%`;
            $img.animate({
                objectPosition : `${100 + this.percentage}% 50%`
            },{
                duration : 1200, 
                fill : "forwards"
            });
        });
    }//on_mouse_move

    clear = (e) =>{
        this.lastPercentage = this.percentage;
        window.removeEventListener('mousemove',this.on_mouse_move);
        this.add_mouse_down();
    }//clear
}//class-SmoothDragSlider