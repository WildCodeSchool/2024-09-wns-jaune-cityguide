import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueNameAndZipcodeConstraint1754373603297 implements MigrationInterface {
    name = 'AddUniqueNameAndZipcodeConstraint1754373603297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "UQ_c703f17eb8b1e8f37cff2c266ee" UNIQUE ("name", "postalCode")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "UQ_c703f17eb8b1e8f37cff2c266ee"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    }

}
