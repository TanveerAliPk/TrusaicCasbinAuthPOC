import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  casbin: router({
    /**
     * Get all policies
     */
    getPolicies: publicProcedure.query(async () => {
      const { getAllPoliciesFromEnforcer } = await import("./casbin");
      const policies = await getAllPoliciesFromEnforcer();
      const { getAllGroupingPolicies } = await import("./casbin");
      const roles = await getAllGroupingPolicies();
      return { policies, roles };
    }),

    /**
     * Add a policy
     */
    addPolicy: protectedProcedure
      .input(
        z.object({
          subject: z.string(),
          object: z.string(),
          action: z.string(),
          effect: z.string().default("allow"),
        })
      )
      .mutation(async ({ input }) => {
        const { addPolicy } = await import("./db");
        const { resetEnforcer } = await import("./casbin");
        await addPolicy({
          policyType: "p",
          subject: input.subject,
          object: input.object,
          action: input.action,
          effect: input.effect,
        });
        resetEnforcer();
        return { success: true };
      }),

    /**
     * Delete a policy
     */
    deletePolicy: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { deletePolicy } = await import("./db");
        const { resetEnforcer } = await import("./casbin");
        await deletePolicy(input.id);
        resetEnforcer();
        return { success: true };
      }),

    /**
     * Check access
     */
    checkAccess: publicProcedure
      .input(
        z.object({
          subject: z.string(),
          object: z.string(),
          action: z.string(),
        })
      )
      .query(async ({ input }) => {
        const { checkAccess } = await import("./casbin");
        const allowed = await checkAccess(
          input.subject,
          input.object,
          input.action
        );
        return { allowed };
      }),

    /**
     * Get all resources
     */
    getResources: publicProcedure.query(async () => {
      const { getAllResources } = await import("./db");
      return await getAllResources();
    }),

    /**
     * Create a resource
     */
    createResource: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          resourceType: z.string(),
          department: z.string().optional(),
          classification: z.string().default("public"),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { createResource } = await import("./db");
        return await createResource({
          name: input.name,
          resourceType: input.resourceType,
          ownerId: ctx.user.id,
          department: input.department,
          classification: input.classification,
        });
      }),

    /**
     * Set user attribute
     */
    setUserAttribute: protectedProcedure
      .input(
        z.object({
          userId: z.number(),
          attributeKey: z.string(),
          attributeValue: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const { setUserAttribute } = await import("./db");
        return await setUserAttribute(
          input.userId,
          input.attributeKey,
          input.attributeValue
        );
      }),

    /**
     * Get user attributes
     */
    getUserAttributes: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        const { getUserAttributes } = await import("./db");
        return await getUserAttributes(input.userId);
      }),

    /**
     * Get all users
     */
    getUsers: publicProcedure.query(async () => {
      const { getDb } = await import("./db");
      const db = await getDb();
      if (!db) return [];
      const { users } = await import("../drizzle/schema");
      return db.select().from(users);
    }),
  }),
});

export type AppRouter = typeof appRouter;
