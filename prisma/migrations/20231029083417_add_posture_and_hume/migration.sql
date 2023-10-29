-- CreateTable
CREATE TABLE "posture" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "videoId" STRING NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "message" STRING NOT NULL,
    "type" INT4 NOT NULL,

    CONSTRAINT "posture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hume" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "videoId" STRING NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "emotion" INT4 NOT NULL,

    CONSTRAINT "hume_pkey" PRIMARY KEY ("id")
);
