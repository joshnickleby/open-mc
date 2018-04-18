import {Performer} from "../domain/firebase-entities";


export function makePerformers(response: any[]) {
  const performers = [];
  response.forEach(item => performers.push(new Performer(item.name)));
  return performers;
}
