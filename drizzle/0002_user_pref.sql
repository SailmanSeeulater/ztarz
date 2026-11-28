CREATE TABLE "user_pref" (
	"user_id" text PRIMARY KEY NOT NULL,
	"new_per_day" integer DEFAULT 5 NOT NULL,
	"focus" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_pref" ADD CONSTRAINT "user_pref_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;