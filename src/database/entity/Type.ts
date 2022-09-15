import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Type extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'type_id' })
  typeId: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
