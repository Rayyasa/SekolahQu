import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Mapel } from '../mapel/mapel.entity';
import { Jadwal } from '../jadwal/jadwal.entity';
// import { MataPelajaran } from '../mata-pelajaran/mata-pelajaran.entity';

export enum JenisKelamin {
  L = 'Laki-laki',
  P = 'Perempuan',
}

@Entity()
export class Guru {
  @PrimaryGeneratedColumn()
  id_guru: number;

  @Column()
  nip: string;
  
  @Column()
  photo: string;

  @Column()
  nama_guru: string;

  @Column({ type: 'enum', enum: JenisKelamin })
  @IsEnum(JenisKelamin)
  jenisKelamin: JenisKelamin;

  @Column()
  alamat: string;

  @Column()
  noTelp: string;

  @OneToMany(() => Mapel, mapel => mapel.guru) // Define one-to-many relationship
  mapel: Mapel[];
  @OneToMany(() => Jadwal, jadwal => jadwal.guru)
  jadwal: Jadwal[];
}
