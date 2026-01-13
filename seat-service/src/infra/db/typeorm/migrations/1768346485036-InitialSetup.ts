import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1768346485036 implements MigrationInterface {
    name = 'InitialSetup1768346485036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."seats_status_enum" AS ENUM('FREE', 'RESERVED', 'OCCUPIED')`);
        await queryRunner.query(`CREATE TABLE "seats" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "status" "public"."seats_status_enum" NOT NULL DEFAULT 'FREE', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f36e592b815bd4be010ea8c398d" UNIQUE ("code"), CONSTRAINT "PK_3fbc74bb4638600c506dcb777a7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "seats"`);
        await queryRunner.query(`DROP TYPE "public"."seats_status_enum"`);
    }

}
