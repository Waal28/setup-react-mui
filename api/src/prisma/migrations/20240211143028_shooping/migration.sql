-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(16) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "address" VARCHAR(100) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(16) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "address" VARCHAR(100) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "unit" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders_item" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "unit" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "orders_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- AddForeignKey
ALTER TABLE "orders_item" ADD CONSTRAINT "orders_item_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_item" ADD CONSTRAINT "orders_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
