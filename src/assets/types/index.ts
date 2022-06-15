export interface MainAppRowArray {
  RowName: string;
  Cards: MainAppRowArrayCard[];
}

export interface MainAppRowArrayCard {
  CardName: string;
  CardDescription: string;
  CardComments: string[];
}
