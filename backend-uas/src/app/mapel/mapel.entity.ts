import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Guru } from '../guru/guru.entity';
import { Jadwal } from '../jadwal/jadwal.entity';
import { Nilai } from '../nilai/nilai.entity';

@Entity()
export class Mapel {
  @PrimaryGeneratedColumn()
  id_mapel: number;

  @Column({ length: 80 })
  nama_mapel: string;


  // @Column()
  // id_pengajar: number;

  @ManyToOne(() => Guru, guru => guru.mapel, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  guru: Guru;

  @OneToMany(() => Jadwal, jadwal => jadwal.mapel)
  jadwal: Jadwal[];

  @OneToMany(() => Nilai, nilai => nilai.mapel)
  nilai: Nilai[];
}
