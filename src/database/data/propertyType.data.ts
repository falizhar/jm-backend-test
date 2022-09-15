import { Type } from '../entity/Type';

export const propertyTypeData: Pick<Type, 'title' | 'description'>[] = [
  { title: 'House', description: 'Family house' },
  { title: 'Townhouse', description: 'Multi-floor home' },
  { title: 'Apartment', description: 'Unit in a building' },
  { title: 'Room', description: 'Single room only' },
];
