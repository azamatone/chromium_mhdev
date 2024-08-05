import { IModel } from '../model/model'
import Queue from "queue-promise";

export class PredictionQueue{
  private model: IModel
  private queue: Queue
  constructor (model: IModel) {
    this.model = model
    this.queue = new Queue({
      concurrent: 1,
      interval: 0
    })
  }
  public predict(img: string, resolve: (result: boolean) => void, reject: (error: Error) => void): void{
    let model = this.model;
    this.queue.add(async() =>{
      try {
        resolve(model.classifyImage(img))
      } catch (err){
        reject(new Error("" + err))
      }
    });
  }
}
