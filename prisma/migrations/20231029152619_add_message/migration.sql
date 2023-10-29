-- CreateTable
CREATE TABLE "messages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "videoId" STRING NOT NULL,
    "userImg" STRING,
    "message" STRING NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);
