import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ResetPassword } from './../mail/reset_password.entity';
import { Nilai } from '../nilai/nilai.entity';

export enum Role {
  ADMIN = 'admin',
  GURU = 'guru',
  SISWA = 'siswa',
  WALIMURID = 'waliMurid'
}
@Entity()
export class user extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nama: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ type: "enum", enum: Role, default: Role.SISWA })
  role: string;

  @Column({ nullable: true })
  id_token: string;

  @OneToMany(() => ResetPassword, (reset) => reset.user) // buat relasi one to many dengan tabel reset password
  reset_password: ResetPassword;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
  @OneToMany(() => Nilai, nilai => nilai.user)
  nilai: Nilai[];
}

