import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUniquePlayer1746996315209 implements MigrationInterface {
    name = 'ChangeUniquePlayer1746996315209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "UQ_17781b6553e9e684e27ec90817c"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "UQ_17781b6553e9e684e27ec90817c" UNIQUE ("player_name")`);
    }

}
