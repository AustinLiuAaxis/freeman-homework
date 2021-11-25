import { Column, Entity, Index } from "typeorm";

@Index("category_pkey", ["id"], { unique: true })
@Entity("category", { schema: "public" })
export class Category {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;
}
