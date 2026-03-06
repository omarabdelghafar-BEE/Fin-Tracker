// budget.entity.ts
import {Entity, PrimaryGeneratedColumn, Column,OneToOne, JoinColumn, DeleteDateColumn,} from 'typeorm';
import { BudgetPeriod } from './enums/budget-period.enum';
import { Currency } from './enums/currency.enum';
import { User } from './user.entity';

@Entity('budgets')
export class Budget {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amount: number;

    @Column({ type: 'enum', enum: BudgetPeriod })
    period: BudgetPeriod;

    @Column({ type: 'enum', enum: Currency })
    currency: Currency;

    @Column({ type: 'timestamp' })
    startDate: Date;

    @Column({ unique: true })           // @unique — one budget per user
    userId: string;

    @OneToOne(() => User, (user) => user.budget, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null;
}