import { DomObserver } from './observer/observer';
import { NoopModel } from './model/model';
import { PredictionQueue as Queue } from './queue/queue'
import { NoopCounter } from './counter/Counter';

function domReady(cb: Function): void {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        cb();
    } else {
        document.addEventListener("DOMContentLoaded", (event: Event) => {
            cb();
        });
    }
}

// @ts-ignore
let _counter = typeof(counter) == 'undefined' ? new NoopCounter() : counter;
// @ts-ignore
let _model = typeof(nsfwModel) == 'undefined' ? new NoopModel() : nsfwModel; 
let queue = new Queue(_model);
// @ts-ignore
let observer = new DomObserver(queue, _counter);
observer.watch();
