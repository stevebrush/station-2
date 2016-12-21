interface RoverOptions {
  id: Number;
  name: String;
  level: Number;
}

export class Rover {
  public id: Number;
  public name: String;
  public level: Number = 1;

  constructor(options: RoverOptions) {
    for (let k in options) {
      if (options.hasOwnProperty(k)) {
        this[k] = options[k];
      }
    }
  }
}
