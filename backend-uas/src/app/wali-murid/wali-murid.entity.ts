import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Siswa } from '../siswa/siswa.entity';

@Entity()
export class WaliMurid {
  @PrimaryGeneratedColumn()
  id_wali_murid: number;

  @Column()
  nama: string;

  @Column()
  alamat: string;

  @Column()
  no_telp: string;

  @ManyToOne(() => Siswa, siswa => siswa.waliMurid)
  siswa: Siswa;
}