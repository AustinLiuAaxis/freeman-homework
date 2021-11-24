import { Column, Entity } from "typeorm";

@Entity("api_response", { schema: "public" })
export class ApiResponseEntity {

  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("smallint", { name: "code", nullable: true })
  code: number | null;

  @Column("character varying", { name: "type", nullable: true, length: 255 })
  type: string | null;

  @Column("character varying", { name: "message", nullable: true, length: 255 })
  message: string | null;
}
