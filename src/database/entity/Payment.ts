import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Currency {
  IDR = 'idr',
  USD = 'usd',
}

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'payment_id' })
  paymentId: number;

  @Column()
  amount: string;

  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.IDR,
  })
  currency: Currency;

  @Column()
  user: number;

  @Column({ name: 'expiry_date' })
  expiryDate: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
