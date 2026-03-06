// job.entity.ts
import {Entity, PrimaryGeneratedColumn, Column,ManyToOne, OneToMany, JoinColumn, DeleteDateColumn,} from 'typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';

@Entity('jobs')
export class Job {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ default: true })
    isRecurring: boolean;

    @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
    expectedAmount: number | null;

    @Column()
    userId: string;

    @ManyToOne(() => User, (user) => user.jobs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => Transaction, (transaction) => transaction.job)
    transactions: Transaction[];

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null;
}