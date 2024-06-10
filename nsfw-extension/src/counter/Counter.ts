export type ICounter = {
    addImageCount: () => void
    addVideoDuration: (duration: number) => void
}

export class NoopCounter implements ICounter{
    public addImageCount(){}
    public addVideoDuration(duration: number){}
} 