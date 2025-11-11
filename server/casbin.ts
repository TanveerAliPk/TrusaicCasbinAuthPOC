import { Enforcer, newEnforcer, Model } from "casbin";
import { getAllPolicies } from "./db";
import { StringAdapter } from "casbin";

let enforcer: Enforcer | null = null;

/**
 * Initialize Casbin enforcer with RBAC + ABAC model
 */
export async function initializeCasbin(): Promise<Enforcer> {
  if (enforcer) return enforcer;

  // RBAC + ABAC model definition
  const modelText = `
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act, eft

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act || r.sub == p.sub && r.obj == p.obj && r.act == p.act
`;

  // Build policy string from database
  const policies = await getAllPolicies();
  let policyText = "";
  for (const policy of policies) {
    if (policy.policyType === "p") {
      policyText += `p, ${policy.subject}, ${policy.object}, ${policy.action}, ${policy.effect || "allow"}\n`;
    } else if (policy.policyType === "g") {
      policyText += `g, ${policy.subject}, ${policy.object}\n`;
    }
  }

  // Create enforcer with model and policy
  enforcer = await newEnforcer(modelText, policyText);

  return enforcer;
}

/**
 * Check if a subject can perform an action on an object
 */
export async function checkAccess(
  subject: string,
  object: string,
  action: string
): Promise<boolean> {
  const e = await initializeCasbin();
  const result = await e.enforce(subject, object, action);
  return result;
}

/**
 * Add a role inheritance rule
 */
export async function addRoleInheritance(
  user: string,
  role: string
): Promise<void> {
  const e = await initializeCasbin();
  await e.addGroupingPolicy(user, role);
}

/**
 * Add a policy rule
 */
export async function addPolicyRule(
  subject: string,
  object: string,
  action: string,
  effect: string = "allow"
): Promise<void> {
  const e = await initializeCasbin();
  await e.addPolicy(subject, object, action, effect);
}

/**
 * Remove a policy rule
 */
export async function removePolicyRule(
  subject: string,
  object: string,
  action: string
): Promise<void> {
  const e = await initializeCasbin();
  await e.removePolicy(subject, object, action);
}

/**
 * Get all policies
 */
export async function getAllPoliciesFromEnforcer(): Promise<string[][]> {
  const e = await initializeCasbin();
  return e.getPolicy();
}

/**
 * Get all grouping policies (roles)
 */
export async function getAllGroupingPolicies(): Promise<string[][]> {
  const e = await initializeCasbin();
  return e.getGroupingPolicy();
}

/**
 * Reset enforcer to reload policies
 */
export function resetEnforcer(): void {
  enforcer = null;
}
