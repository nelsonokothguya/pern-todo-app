-- AlterTable
CREATE SEQUENCE deletedtodo_id_seq;
ALTER TABLE "DeletedTodo" ALTER COLUMN "id" SET DEFAULT nextval('deletedtodo_id_seq');
ALTER SEQUENCE deletedtodo_id_seq OWNED BY "DeletedTodo"."id";
