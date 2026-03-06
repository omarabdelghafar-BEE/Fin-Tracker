// session.entity.ts
import {Entity, PrimaryGeneratedColumn, Column,ManyToOne, JoinColumn, Index, CreateDateColumn,} from 'typeorm';
import { User } from './user.entity';

@Entity('sessions')
@Index(['userId'])                       // @@index([userId])
export class Session {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: true })
    ip?: string;

    @Column({ nullable: true })
    userAgent?: string ;

    @Column({ type: 'timestamp' })
    expiresAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}