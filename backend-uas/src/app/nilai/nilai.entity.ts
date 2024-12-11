import { Entity, PrimaryColumn, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Siswa } from '../siswa/siswa.entity';
import { Mapel } from '../mapel/mapel.entity';
import { user } from '../auth/auth.entity';

export enum semester {
  GANJIL = 'Satu',
  GENAP = 'Dua'
}

@Entity()
export class Nilai {
  @PrimaryGeneratedColumn()
  id_nilai: number;

  @Column({
    type: 'enum',
    enum: semester,
  })
  semester: semester;

  @Column()
  nilai_pengetahuan: number;

  @Column()
  nilai_keterampilan: number;

  @ManyToOne(() => Siswa, siswa => siswa.nilai, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  siswa: Siswa;

  @ManyToOne(() => Mapel, mapel => mapel.nilai, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  mapel: Mapel;

  @ManyToOne(() => user, user => user.nilai, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: user;
}
