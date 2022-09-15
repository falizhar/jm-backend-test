import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

import { tokenUtil } from '../../utils';

export enum PropertyStatus {
  BUY = 'buy',
  RENT = 'rent',
  AUCTION = 'auction',
}

export enum CertificationType {
  AJB = 'ajb',
  SHGB = 'shgb',
  SHM = 'shm',
  GIRIK = 'girik',
  SHSRS = 'shsrs',
}

export enum Unit {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

export enum Currency {
  IDR = 'idr',
  USD = 'usd',
}

@Entity({ name: 'property' })
export class Property extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'property_id' })
  propertyId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  lat: number;

  @Column({ nullable: true })
  lng: number;

  @Column({ default: true })
  active: boolean;

  @Column()
  type: number;

  @Column()
  user: number;

  @Column()
  city: number;

  @Column()
  slug: string;

  @Column({
    type: 'enum',
    enum: CertificationType,
  })
  certification: CertificationType;

  @Column({
    type: 'enum',
    enum: PropertyStatus,
  })
  status: PropertyStatus;

  @Column({
    type: 'enum',
    enum: Unit,
    nullable: true,
  })
  unit: Unit;

  @Column({ nullable: true })
  bedroom: number;

  @Column({ nullable: true })
  bathroom: number;

  @Column({ name: 'square_meter', nullable: true })
  squareMeter: string;

  @Column({ nullable: true })
  garage: boolean;

  @Column({ nullable: true })
  carport: boolean;

  @Column({ nullable: true })
  fullFurnished: boolean;

  @Column({
    type: 'enum',
    enum: Currency,
    nullable: true,
  })
  currency: Currency;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  setSlug(): void {
    this.slug = `${this.title.replace(/ +/g, '')}${tokenUtil.slugGenerator(
      12,
    )}`;
  }
}
