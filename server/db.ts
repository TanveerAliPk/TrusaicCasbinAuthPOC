import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  roles,
  InsertRole,
  userAttributes,
  casbinPolicies,
  InsertCasbinPolicy,
  resources,
  InsertResource,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get user with all attributes
 */
export async function getUserWithAttributes(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (user.length === 0) return undefined;

  const attrs = await db
    .select()
    .from(userAttributes)
    .where(eq(userAttributes.userId, userId));

  return {
    ...user[0],
    attributes: attrs.reduce(
      (acc, attr) => {
        acc[attr.attributeKey] = attr.attributeValue;
        return acc;
      },
      {} as Record<string, string>
    ),
  };
}

/**
 * Get all policies
 */
export async function getAllPolicies() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(casbinPolicies);
}

/**
 * Add a policy
 */
export async function addPolicy(policy: InsertCasbinPolicy) {
  const db = await getDb();
  if (!db) return null;
  await db.insert(casbinPolicies).values(policy);
  return policy;
}

/**
 * Delete a policy
 */
export async function deletePolicy(id: number) {
  const db = await getDb();
  if (!db) return false;
  const result = await db
    .delete(casbinPolicies)
    .where(eq(casbinPolicies.id, id));
  return true;
}

/**
 * Get all roles
 */
export async function getAllRoles() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(roles);
}

/**
 * Create a role
 */
export async function createRole(role: InsertRole) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(roles).values(role);
  return role;
}

/**
 * Get all resources
 */
export async function getAllResources() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(resources);
}

/**
 * Get resource by ID
 */
export async function getResourceById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(resources)
    .where(eq(resources.id, id))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create a resource
 */
export async function createResource(resource: InsertResource) {
  const db = await getDb();
  if (!db) return null;
  await db.insert(resources).values(resource);
  return resource;
}

/**
 * Set user attribute
 */
export async function setUserAttribute(
  userId: number,
  attributeKey: string,
  attributeValue: string
) {
  const db = await getDb();
  if (!db) return null;

  const existing = await db
    .select()
    .from(userAttributes)
    .where(
      and(
        eq(userAttributes.userId, userId),
        eq(userAttributes.attributeKey, attributeKey)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(userAttributes)
      .set({ attributeValue })
      .where(eq(userAttributes.id, existing[0].id));
  } else {
    await db.insert(userAttributes).values({
      userId,
      attributeKey,
      attributeValue,
    });
  }

  return { userId, attributeKey, attributeValue };
}

/**
 * Get user attributes
 */
export async function getUserAttributes(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(userAttributes)
    .where(eq(userAttributes.userId, userId));
}

// TODO: add feature queries here as your schema grows.
