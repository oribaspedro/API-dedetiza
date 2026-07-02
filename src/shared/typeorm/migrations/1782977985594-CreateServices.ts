import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateServices1782977985594 implements MigrationInterface {
    name = 'CreateServices1782977985594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client" character varying NOT NULL, "address" character varying NOT NULL, "type" character varying NOT NULL, "price" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "employee_in_charge_id" uuid, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_b59aef4dc88d4166673e95dece3" FOREIGN KEY ("employee_in_charge_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_b59aef4dc88d4166673e95dece3"`);
        await queryRunner.query(`DROP TABLE "services"`);
    }

}
