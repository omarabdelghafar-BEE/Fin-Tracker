// category.entity.ts
import {Entity, PrimaryGeneratedColumn, Column,ManyToOne, OneToMany, JoinColumn,Index, Unique, DeleteDateColumn,} from 'typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';

@Entity('categories')
@Index(['userId'])                          // @@index([userId])
@Unique(['userId', 'name'])                 // @@unique([userId, name])
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    // ── Self-referencing (parent/children) ────────────────────
    @Column({ nullable: true })
    parentId: string | null;

    @ManyToOne(() => Category, (category) => category.children, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'parentId' })
    parent: Category | null;

    @OneToMany(() => Category, (category) => category.parent)
    children: Category[];

    // ── User relation ──────────────────────────────────────────
    @Column()
    userId: string;

    @ManyToOne(() => User, (user) => user.categories, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions: Transaction[];

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null;
}