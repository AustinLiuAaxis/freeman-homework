import { Column, Entity, Index } from "typeorm";

@Index("order_pkey", ["id"], { unique: true })
@Entity("order", { schema: "public" })
export class Order {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("integer", { name: "pet_id", nullable: true })
  petId: number | null;

  @Column("smallint", { name: "quantity", nullable: true })
  quantity: number | null;

  @Column("date", { name: "ship_date", nullable: true })
  shipDate: string | null;

  @Column("character varying", { name: "status", nullable: true, length: 255 })
  status: string | null;

  @Column("inet", { name: "complete", nullable: true })
  complete: string | null;
}
