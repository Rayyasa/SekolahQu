import { Entity, PrimaryColumn, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Kelas } from '../kelas/kelas.entity';
import { Mapel } from '../mapel/mapel.entity';
import { Guru } from '../guru/guru.entity';

export enum Hari {
  SENIN = 'SENIN',
  SELASA = 'SELASA',
  RABU = 'RABU',
  KAMIS = 'KAMIS',
  JUMAT = 'JUMAT',
  SABTU = 'SABTU',
}

@Entity()
export class Jadwal {
  @PrimaryGeneratedColumn()
  id_jadwal: number;

  @Column({
    type: 'enum',
    enum: Hari,
  })
  hari: Hari;

  @Column('time')
  jam_mulai: string;

  @Column('time')
  jam_selesai: string;

  @ManyToOne(() => Kelas, kelas => kelas.jadwal, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  kelas: Kelas;

  @ManyToOne(() => Mapel, mapel => mapel.jadwal, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  mapel: Mapel;

  @ManyToOne(() => Guru, guru => guru.jadwal, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  guru: Guru;
}
