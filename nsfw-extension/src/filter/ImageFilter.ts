import { ICounter } from "../counter/Counter"
import { PredictionQueue as Queue } from "../queue/queue"

export class ImageFilter {
    private readonly MIN_IMAGE_SIZE: number
    private readonly queue: Queue
    private readonly counter: ICounter
    private readonly canvas = document.createElement("canvas")
    private readonly canvasCtx = this.canvas.getContext("2d", { willReadFrequently: true })

    constructor(queue: Queue, counter: ICounter) {
        this.MIN_IMAGE_SIZE = 41
        this.queue = queue
        this.counter = counter
        
        this.canvas.height = 224
        this.canvas.width = 224
    }

    private toDataURL(image: HTMLImageElement): string {
        this.canvasCtx?.drawImage(image, 0, 0, 224, 224);
        return this.canvas.toDataURL().split(',')[1];
    }
    
    public analyzeImage(image: HTMLImageElement, srcAttribute: boolean): void {
        if (
            (srcAttribute || image.dataset.nsfwFilterStatus === undefined) &&
            image.src.length > 0 &&
            (
              (image.width > this.MIN_IMAGE_SIZE && image.height > this.MIN_IMAGE_SIZE) ||
              image.height === 0 ||
              image.width === 0
            )
        ) {
            image.dataset.nsfwFilterStatus = 'processing'
            if (image.complete || srcAttribute){
                this._analyzeImage(image)
            } else {
                image.onload = () => {
                    this._analyzeImage(image)
                }
	        }
        }
    }

    private _analyzeImage(image: HTMLImageElement): void {
	    image.crossOrigin='anonymous'
        let base64Img = this.toDataURL(image);
        this.queue.predict(base64Img, (result: boolean) => {
            image.style.transform = ""
            if (result){
                this.counter.addImageCount()
                image.style.filter = 'blur(25px)'
            } else {
                image.style.filter = ""
            }
            image.crossOrigin = ""
        }, (error)=>{
            // image.style.filter = "grayscale(1)"
            // image.crossOrigin = ""
        })
    }
}
