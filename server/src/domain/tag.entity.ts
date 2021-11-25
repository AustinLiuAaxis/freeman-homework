import { Column, Entity, Index } from "typeorm";

@Index("tag_pkey", ["id"], { unique: true })
@Entity("tag", { schema: "public" })
export class Tag {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;
}
