-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeletedTodo" (
    "id" SERIAL NOT NULL,
    "originalId" INTEGER,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DeletedTodo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeletedTodo" ADD CONSTRAINT "DeletedTodo_originalId_fkey" FOREIGN KEY ("originalId") REFERENCES "Todo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
