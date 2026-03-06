// auth-token.entity.ts
import {Entity, PrimaryGeneratedColumn, Column,ManyToOne, JoinColumn, Index, CreateDateColumn,} from 'typeorm';
import { TokenType } from './enums/token-type.enum';
import { User } from './user.entity';

@Entity('auth_tokens')
@Index(['token'])                         // @@index([token])
export class AuthToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    token: string;

    @Column({ type: 'enum', enum: TokenType })
    type: TokenType;

    @Column()
    userId: string;

    @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ type: 'timestamp' })
    expiresAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    usedAt: Date | null;

    @CreateDateColumn()
    createdAt: Date;
}