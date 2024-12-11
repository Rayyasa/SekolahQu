import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn, BaseEntity, JoinColumn } from 'typeorm';
import { Kelas } from '../kelas/kelas.entity'; import { Nilai } from '../nilai/nilai.entity';
import { Absensi } from '../absensi/absensi.entity';
import { WaliMurid } from '../wali-murid/wali-murid.entity';
// import { Absensi } from '../absensi/absensi.entity';
// import { Nilai } from '../nilai/nilai.entity';
// import { WaliMurid } from '../wali_murid/wali_murid.entity';

export enum jenis_kelamin {
  L = 'Laki-laki',
  P = 'Perempuan',
}
enum Jurusan {
  RPL = 'RPL',
  TKJ = 'TKJ',
}

@Entity()
export class Siswa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_siswa: number;

  @Column()
  nisn: string;

  @Column()
  nama_siswa: string;

  @Column()
  photo: string;

  @Column({
    type: 'enum',
    enum: jenis_kelamin,
    default: jenis_kelamin.L
  })
  jenis_kelamin: jenis_kelamin;

  @Column()
  tempat_lahir: string;

  @Column('date')
  tanggal_lahir: string;

  @Column('text')
  alamat: string;

  // @Column()
  // id_kelas: number;

  @ManyToOne(() => Kelas, kelas => kelas.siswa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  kelas: Kelas;

  // @ManyToOne(() => User, user => user.siswa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // user: User;

  @OneToMany(() => Absensi, absensi => absensi.siswa)
  absensi: Absensi[];

  @OneToMany(() => Nilai, nilai => nilai.siswa)
  nilai: Nilai[];

  @OneToMany(() => WaliMurid, waliMurid => waliMurid.siswa)
  waliMurid: WaliMurid[];
}
