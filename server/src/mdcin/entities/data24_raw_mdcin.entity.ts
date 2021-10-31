import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Data24RawMdcin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ADM_DISPS_SEQ: number;

  @Column()
  ENTP_NAME: string;

  @Column({ default: null })
  ADDR: string;

  @Column()
  ENTP_NO: number;

  @Column()
  ITEM_NAME: string;

  @Column()
  BEF_APPLY_LAW: string;

  @Column()
  EXPOSE_CONT: string;

  @Column()
  ADM_DISPS_NAME: string;

  @Column()
  LAST_SETTLE_DATE: string;

  @Column({ default: null })
  DISPS_TERM_DATE: string;
}
