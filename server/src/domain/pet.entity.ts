import { Column, Entity, Index } from "typeorm";
import {options} from "tsconfig-paths/lib/options";

@Index("pet_pkey", ["id"], { unique: true })
@Entity("pet", { schema: "public" })
export class Pet {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("integer", { name: "category_id", nullable: true })
  categoryId: number | null;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("character varying", { name: "photoUrls", length: 255 })
  photoUrls: string;

  @Column("character varying", { name: "status", nullable: true, length: 255 })
  status: string | null;

  @Column("integer", { name: "tag_id", nullable: true })
  tagId: number | null;
}
