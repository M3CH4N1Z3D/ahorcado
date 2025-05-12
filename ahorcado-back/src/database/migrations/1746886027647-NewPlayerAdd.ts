import { MigrationInterface, QueryRunner } from "typeorm";

export class NewPlayerAdd1746886027647 implements MigrationInterface {
    name = 'NewPlayerAdd1746886027647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "players" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "player_name" character varying(50) NOT NULL, "score" numeric(10,2) NOT NULL, CONSTRAINT "UQ_17781b6553e9e684e27ec90817c" UNIQUE ("player_name"), CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "players"`);
    }

}
