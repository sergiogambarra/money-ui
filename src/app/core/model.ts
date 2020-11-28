export class Person {
  id: number;
  name: string;
  active = false;
  address = new Address();
}

export class Address {
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  zip: string;
  city: string;
  state: string;
}

export class State {
  id: number;
  name: string;
}

export class City {
  id: number;
  name: string;
}

export class Category {
  id: number;
}

export class Entry {
  id: number;
  type = 'RECEITA';
  description: string;
  dueDate: Date;
  payDate: Date;
  value: number;
  note: string;
  category = new Category();
  person = new Person();

}

