export type ICounter = {
    addCount: () => void
}

export class NoopCounter implements ICounter{
    public addCount(){}
} 