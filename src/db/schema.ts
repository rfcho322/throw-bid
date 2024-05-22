import { pgTable, serial } from "drizzle-orm/pg-core";

export const bids = pgTable('tb_bids',{
    id: serial("id").primaryKey(),

});