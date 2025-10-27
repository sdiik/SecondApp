export interface ObjectData {
  year: number;
  price: number;
  'CPU model': string;
  'Hard disk size': string;
}

export interface ObjectResponse {
  id: string;
  name: string;
  data: ObjectData;
  createdAt: Date;
}
