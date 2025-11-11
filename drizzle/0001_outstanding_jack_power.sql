CREATE TABLE `casbinPolicies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`policyType` varchar(64) NOT NULL,
	`subject` varchar(255) NOT NULL,
	`object` varchar(255) NOT NULL,
	`action` varchar(64) NOT NULL,
	`effect` varchar(16) NOT NULL DEFAULT 'allow',
	`conditions` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `casbinPolicies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`resourceType` varchar(64) NOT NULL,
	`ownerId` int NOT NULL,
	`department` varchar(64),
	`classification` varchar(64) NOT NULL DEFAULT 'public',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `resources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `userAttributes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`attributeKey` varchar(64) NOT NULL,
	`attributeValue` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userAttributes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `resources` ADD CONSTRAINT `resources_ownerId_users_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userAttributes` ADD CONSTRAINT `userAttributes_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;