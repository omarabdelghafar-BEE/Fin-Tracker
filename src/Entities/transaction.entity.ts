// transaction.entity.ts
import {Entity, PrimaryGeneratedColumn, Column,ManyToOne, JoinColumn, Index, Unique,CreateDateColumn, DeleteDateColumn,} from 'typeorm';
import { TransactionType } from './enums/transaction-type.enum';
import { Currency } from './enums/currency.enum';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Job } from './job.entity';

@Entity('transactions')
@Unique(['jobId', 'periodKey'])           // @@unique([jobId, periodKey])
@Index(['userId'])                        // @@index([userId])
@Index(['createdAt'])                     // @@index([createdAt])
@Index(['userId', 'createdAt'])           // @@index([userId, createdAt])
@Index(['userId', 'type'])                // @@index([userId, type])
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amount: number;

    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType;

    @Column({ type: 'enum', enum: Currency })
    currency: Currency;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @CreateDateColumn()
    createdAt: Date;

    // ── User relation ──────────────────────────────────────────
    @Column()
    userId: string;

    @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    // ── Category relation ──────────────────────────────────────
    @Column({ nullable: true })
    categoryId: string | null;

    @ManyToOne(() => Category, (category) => category.transactions, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'categoryId' })
    category: Category | null;

    // ── Job relation ───────────────────────────────────────────
    @Column({ nullable: true })
    jobId: string | null;

    @ManyToOne(() => Job, (job) => job.transactions, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'jobId' })
    job: Job | null;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null;

    @Column({ nullable: true })
    periodKey?: string;
}