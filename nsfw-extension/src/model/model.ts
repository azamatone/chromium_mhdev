export type ModelSettings = {
  filterStrictness: number
}

export type IModel = {
  classifyImage: (base64Img: string) => boolean
}

export class NoopModel implements IModel {
  public classifyImage(base64Img: string):boolean {return false}
}