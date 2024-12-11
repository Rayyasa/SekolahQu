import { Entity, PrimaryColumn, Column, OneToMany, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Siswa } from '../siswa/siswa.entity';
import { Jadwal } from '../jadwal/jadwal.entity';
// import { Siswa } from '../siswa/siswa.entity';


export enum Jurusan {
  RPL = 'RPL',
  TKJ = 'TKJ',
}
export enum NamaKelas {
  X = 'X',
  XI = 'XI',
  XII = 'XII'
}
@Entity()
export class Kelas extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_kelas: number;

  @Column({
    type: 'enum',
    enum: NamaKelas,
  })
  nama_kelas: NamaKelas;

  @Column({
    type: 'enum',
    enum: Jurusan,
  })
  Jurusan: Jurusan;

  @OneToMany(() => Siswa, siswa => siswa.kelas)
  siswa: Siswa[];
  @OneToMany(() => Jadwal, jadwal => jadwal.kelas)
  jadwal: Jadwal[];
}
