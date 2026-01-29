import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1769726952133 implements MigrationInterface {
    name = 'InitialSetup1769726952133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."reservations_status_enum" RENAME TO "reservations_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."reservations_status_enum" AS ENUM('PENDING', 'ACTIVE', 'REJECTED', 'EXPIRED', 'CANECELLED')`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "status" TYPE "public"."reservations_status_enum" USING "status"::"text"::"public"."reservations_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."reservations_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reservations_status_enum_old" AS ENUM('ACTIVE', 'EXPIRED', 'CANCELED')`);
        await queryRunner.query(`ALTER TABLE "reservations" ALTER COLUMN "status" TYPE "public"."reservations_status_enum_old" USING "status"::"text"::"public"."reservations_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."reservations_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."reservations_status_enum_old" RENAME TO "reservations_status_enum"`);
    }

}
