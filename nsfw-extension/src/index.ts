import { load as loadModel} from 'nsfwjs'
import { DomObserver } from './observer/observer';
import { Model } from './model/model';
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
loadModel('https://raw.githubusercontent.com/elb3k/nsfw-chromium/main/models/mobilenet_v2/').then(nsfwModel => {
    domReady(()=>{
        let model = new Model(nsfwModel, {filterStrictness: 80});
        let queue = new Queue(model);
        // @ts-ignore
        let observer = new DomObserver(queue, _counter);
        observer.watch();
    })
}).catch((error) => {
    console.log("failed to load model: ", error)
});
