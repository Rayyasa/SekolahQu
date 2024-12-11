import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Siswa } from '../siswa/siswa.entity';

export enum status {
  HADIR = 'HADIR',
  SAKIT = 'SAKIT',
  IZIN = 'IZIN',
  ALPA = 'ALPA',
}

@Entity()
export class Absensi {
  @PrimaryGeneratedColumn()
  id_absensi: number;

  @Column({ type: 'date' })
  tanggal: string;

  @Column({
    type: 'enum',
    enum: status,
  })
  status: status;

  @ManyToOne(() => Siswa, siswa => siswa.absensi, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  siswa: Siswa;
}
