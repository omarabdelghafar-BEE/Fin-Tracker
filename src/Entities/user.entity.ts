import {Entity,PrimaryGeneratedColumn,Column,OneToMany,OneToOne,DeleteDateColumn, UpdateDateColumn, CreateDateColumn,
} from 'typeorm';
import { Role } from './enums/Roles.enum';
import { Transaction } from './transaction.entity';
import { Job } from './job.entity';
import { Budget } from './budget.entity';
import { Category } from './category.entity';
import { Session } from './session.entity';
import { AuthToken } from './authToken.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar", {length: 30, nullable: false})
    firstName: string;

    @Column("varchar", {length: 30, nullable: false})
    lastName: string;

    @Column({ type: 'timestamp', nullable: true })
    dateOfBirth: Date | null;

    @Column({ unique: true})
    email: string;

    @Column({ unique: true })
    username: string;

    @Column({ type: 'enum', enum: Role, default: 'USER' })
    role: Role;

    @OneToMany(() => Transaction, (transaction) => transaction.user)
    transactions: Transaction[];

    @OneToMany(() => Job, (job) => job.user)
    jobs: Job[];

    @OneToOne(() => Budget, (budget) => budget.user)
    budget: Budget;

    @OneToMany(() => Category, (category) => category.user)
    categories: Category[];

    @OneToMany(() => Session, (session) => session.user)
    sessions: Session[];

    @OneToMany(() => AuthToken, (token) => token.user)
    tokens: AuthToken[];

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn({ nullable: true })   // 
    deletedAt: Date | null;

    @UpdateDateColumn({ nullable: true })   // will strore the date of the updating
    updatedAt: Date | null;
}
