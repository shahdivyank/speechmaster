-- CreateTable
CREATE TABLE "videos" (
    "identifier" STRING NOT NULL,
    "user_id" UUID NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "score" INT4 NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("identifier")
);
